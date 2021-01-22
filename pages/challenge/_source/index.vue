<template>
  <page-wrapper
    :title="source.name"
    :breadcrumbs="[{ name: 'Code challenges', link: '/challenge' }]"
    class="color full"
  >
    <div class="container mx-auto">
      <div class="block small with-padding with-shadow-left">
        <dom-content v-bind="source.dom" />
      </div>

      <challenge-grid :challenges="source.challenges" />
    </div>
  </page-wrapper>
</template>

<script>
import { generateSeoMeta } from '../../../utils/seo'
export default {
  components: {
    DomContent: () => import('~/components/dom/dom-content'),
    ChallengeGrid: () => import('~/components/card/challenge-grid'),
  },

  async asyncData({ error, route, $source }) {
    const slug = route.path.split('/').pop()
    const data = await $source.resolve(route.path, ({ query }) =>
      query(
        `
          query challengeSource($slug: String!) {
            source: termBySlug(taxonomy: "challenge-source", slug: $slug) {
              slug name description dom

              challenges: posts {
                id slug title link
                order: extra(path: "order")
              }
            }
          }
        `,
        { slug },
      ),
    )
    if (!data.source) {
      return error({ statusCode: 404, message: 'Challenge source not found' })
    }

    return data
  },

  head() {
    return generateSeoMeta({
      path: this.$route.path,
      title: `${this.source.name} · Code Challenges`,
      description: this.source.description,
    })
  },
}
</script>
