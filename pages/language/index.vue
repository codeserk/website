<template>
  <page-wrapper class="color full" title="Languages 👓">
    <div class="container mx-auto">
      <languages :languages="languages" />
    </div>
  </page-wrapper>
</template>

<script>
export default {
  components: {
    PageWrapper: () => import('~/components/page/wrapper'),
    Languages: () => import('~/components/home/languages'),
  },

  async asyncData({ $source }) {
    return $source.resolve('/language', ({ query }) =>
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
}
</script>

<style lang="scss" scoped>
.page {
  padding-top: 3em;
  padding-bottom: 4em;
}
</style>
