<template>
  <page-wrapper class="color full" title="Languages 👓">
    <div class="container mx-auto">
      <languages :languages="languages" />
    </div>
  </page-wrapper>
</template>

<script>
import { generateSeoMeta } from '../../utils/seo'
export default {
  components: {
    PageWrapper: () => import('~/components/page/wrapper'),
    Languages: () => import('~/components/home/languages'),
  },

  async asyncData({ route, $source }) {
    return $source.resolve(route.path, ({ query }) =>
      query(
        `
          query languages {
            languages: terms(taxonomy: "language") {
              id slug name
              order: extra(path: "order")
              status: extra(path: "status")
              knowledge: extra(path: "knowledge")
              scopes: extra(path: "scopes")
              summary: extra(path: "summary")
            }
          }
        `,
      ),
    )
  },

  head() {
    return generateSeoMeta({
      path: this.$route.path,
      title: 'Languages',
      description: 'Section with all the languages.',
    })
  },

  mounted() {
    if (this.$analytics) {
      this.$analytics.logEvent('view_page', {
        title: 'Languages',
        slug: '/language',
        link: '/language',
      })
    }
  },
}
</script>

<style lang="scss" scoped>
.page {
  padding-top: 3em;
  padding-bottom: 4em;
}
</style>
