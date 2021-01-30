<template>
  <page-wrapper :title="post.title" :breadcrumbs="breadcrumbs" class="color full">
    <div class="container mx-auto">
      <img v-if="post.image && post.image.header" :src="post.image.header.src" class="image" />
      <dual-blocks class="item" with-padding-left with-padding-right>
        <template #left-block>
          <terms-map :item="post" />
          <div v-text="date" class="date" />

          <ul class="links">
            <li v-if="post.sourceTwitter" class="links-source">
              <a :href="post.sourceTwitter" target="__blank" rel="noreferrer noopener">
                <font-awesome-icon :icon="['fab', 'twitter']" size="lg" />
                <span>Source</span>
              </a>
            </li>
            <li v-if="post.gist" class="links-gist">
              <a :href="post.gist" target="__blank" rel="noreferrer noopener">
                <font-awesome-icon :icon="['fab', 'github']" size="lg" />
                <span>Gist</span>
              </a>
            </li>
          </ul>
        </template>

        <template #left-bottom>
          <div
            v-for="(test, index) in post.tests"
            :key="index"
            class="test-block block skew with-small-padding with-shadow-left"
          >
            <span v-text="test.description" class="test-description" />
            <span
              :class="{ 'test-passed': test.valid, 'test-failed': !test.valid }"
              v-text="test.valid ? '✌︎' : '💢'"
              class="test-result"
            />
          </div>
        </template>

        <template #right-block>
          <dom-content v-bind="post.dom" />
        </template>
      </dual-blocks>
    </div>
  </page-wrapper>
</template>

<script>
import moment from 'moment'
import { generateSeoMeta } from '../../../utils/seo'

export default {
  components: {
    DualBlocks: () => import('~/components/block/dual-blocks'),
    TermsMap: () => import('~/components/terms-map'),
    DomContent: () => import('~/components/dom/dom-content'),
  },

  computed: {
    breadcrumbs() {
      const result = [{ name: 'Code Challenge', link: '/challenge' }]
      if (this.post.source) {
        result.push({ name: this.post.source.name, link: `/challenge${this.post.source.link}` })
      }

      return result
    },

    date() {
      return moment(this.post.createdAt).format('Do [of] MMMM [of] YYYY')
    },
  },

  async asyncData({ store, error, route, $source }) {
    const link = route.path
    const data = await $source.resolve(route.path, ({ query }) =>
      query(
        `
          query post($link: String!) {
            post: postByLink(link: $link) {
              id title excerpt dom createdAt
              breadcrumbs { name link }

              image: featuredImage {
                image(resolution: Small, format: png, transform: { resize: { width: 200, height: 200 }}) { src }
                header: image(resolution: Medium, format: png, transform: { resize: { width: 600, height: 600 }}) { src }
                placeholder: image(resolution: Placeholder, format: png, transform: { resize: { width: 16, height: 16 }}, output: Inline) { src }
              }

              languages: terms(taxonomy: "language") { id slug name order: extra(path: "order") }
              source: mainTerm { name link }

              sourceTwitter: extra(path: "sourceTwitter")
              gist: extra(path: "gist")
              tests: extra(path: "tests")
            }
          }
        `,
        { link },
      ),
    )

    if (!data.post) {
      return error({ statusCode: 404, message: 'Code challenge not found' })
    }

    return data
  },

  head() {
    return generateSeoMeta({
      path: this.$route.path,
      title: `${this.post.title} · ${this.post.source?.name} · Code Challenges`,
      description: this.post.excerpt,
      keywords: this.getKeywords(this.post),
      image: this.post.image?.header.src,
    })
  },
}
</script>

<style lang="scss" scoped>
@import '~/assets/css/colors.scss';

.image {
  display: none;
}

.test-block {
  padding: 10px;
  padding-right: 45px;

  &:first-child {
    margin-top: 4em;
  }

  .test-result {
    position: absolute;
    right: 0;
    bottom: 0;
    vertical-align: middle;
    padding: 5px 5px 0 5px;
    border-top: 4px solid white;
    border-left: 4px solid white;
    font-size: 20px;
    text-align: center;

    &.test-passed {
      background: green;
    }
    &.test-failed {
      background: $color-red;
    }
  }
}

.date {
  margin-top: 0.5em;
}

.links {
  li {
    margin-top: 1em;
    text-transform: uppercase;
  }
}
</style>
