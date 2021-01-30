<template>
  <div class="render render-challenge">
    <challenge-card :title="post.title" :link="post.link" :summary="post.excerpt" :aos="false" />
  </div>
</template>

<script>
import { generateSeoMeta } from '../../../utils/seo'

export default {
  layout: 'render',

  components: {
    ChallengeCard: () => import('~/components/card/challenge'),
  },

  async asyncData({ error, route, $source }) {
    const slug = route.path.split('/').pop()
    const data = await $source.resolve(route.path, ({ query }) =>
      query(
        `
          query post($slug: String!) {
            post: postBySlug(type: "challenge", slug: $slug) {
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
        { slug },
      ),
    )

    if (!data.post) {
      return error({ statusCode: 404, message: 'Code challenge not found' })
    }

    return data
  },

  head() {
    return generateSeoMeta({})
  },
}
</script>

<style lang="scss" scoped>
@import '~/assets/css/colors.scss';

.render {
  position: absolute;
  width: 500px;
  height: 500px;
  top: calc(50% - 250px);
  left: calc(50% - 250px);
  display: flex;
  align-items: center;
  justify-content: center;

  .challenge {
    margin: 0;
  }
}
</style>
