<template>
  <div class="page-wrapper color full">
    <div class="container mx-auto clearfix">
      <h1 v-text="project.title" class="title" />

      <div class="block clearfix left small with-padding with-shadow-left skew">
        <img v-lazy="project.icon" class="image" />
        <terms-map :item="project" />
      </div>

      <div class="block clearfix right small with-padding with-shadow-left skew content">
        <dom-content v-bind="project.dom" class="mx-auto" aos="fade-up" />
      </div>
    </div>
  </div>
</template>

<script>
import { generateSeoMeta } from '../../utils/seo'

export default {
  components: {
    DomContent: () => import('~/components/dom/dom-content'),
    TermsMap: () => import('~/components/terms-map'),
  },

  async asyncData({ error, route, $source }) {
    const slug = route.path.split('/').pop()
    const data = await $source.resolve(route.path, ({ query }) =>
      query(
        `
            query project($slug: String!) {
                project: postBySlug(slug: $slug, type: "project") {
                    id title content dom
                    areas: terms(taxonomy: "development-area") { id slug name order: extra(path: "order") }
                    languages: terms(taxonomy: "language") { id slug name order: extra(path: "order") }
                    frameworks: terms(taxonomy: "framework") { id slug name order: extra(path: "order") }
                    databases: terms(taxonomy: "database") { id slug name order: extra(path: "order") }
                    brokers: terms(taxonomy: "message-broker") { id slug name order: extra(path: "order") }
                    technologies: terms(taxonomy: "technology") { id slug name order: extra(path: "order") }

                    icon: featuredImage {
                      image(resolution: Small, format: png, transform: { resize: { width: 290, height: 290 }}) { src }
                      placeholder: image(resolution: Placeholder, format: png, transform: { resize: { width: 290, height: 290 }}, output: Inline) { src }
                    }
                }
            }
        `,
        { slug },
      ),
    )

    if (!data.project) {
      return error({ statusCode: 404, message: 'Project not found' })
    }

    data.project.icon = {
      src: data.project.icon?.image.src,
      loading: data.project.icon?.placeholder.src,
    }

    return data
  },

  head() {
    return generateSeoMeta({
      path: this.$route.path,
      title: this.project.title,
      description: this.project.content,
      image: this.project.featuredMedia ? this.project.featuredMedia.src : undefined,
    })
  },

  mounted() {
    if (this.$analytics) {
      if (this.project) {
        this.$analytics.logEvent('view_page', {
          title: this.project.title,
          slug: this.project.slug,
          link: this.project.link,
        })
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.page {
  padding-top: 3em;
  padding-bottom: 4em;
}
.title {
  margin-bottom: 0.5em;
  font-size: 4em;
  text-align: center;
}

.image {
  position: absolute;
  top: -25px;
  right: -25px;
  width: 100px;
  height: 100px;
  border: 5px solid white;
}

.block {
  position: relative;
  &.left {
    float: left;
    width: 40%;

    section {
      padding: 1em 1.5em 1em 1em;
    }
  }
  &.right {
    float: right;
    width: 55%;
  }
}

@media (max-width: theme('screens.lg')) {
  .block.left {
    float: none;
    width: 90%;
  }
  .block.right {
    width: 90%;
    margin-top: 2ch;
  }
}
</style>
