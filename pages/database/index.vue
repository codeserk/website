<template>
  <page-wrapper title="Databases" header-class="centered" class="color full">
    <div class="container mx-auto">
      <card
        v-for="(database, index) in databasesSorted"
        :key="database.id"
        v-bind="database"
        :index="index"
        :title="database.name"
        :link="`/database/${database.slug}`"
        :progress="database.knowledge"
      />
    </div>
  </page-wrapper>
</template>

<script>
import { generateSeoMeta } from '../../utils/seo'
import { sortByOrder } from '../../utils/sort'
export default {
  components: {
    PageWrapper: () => import('~/components/page/wrapper'),
    Card: () => import('~/components/card'),
  },

  computed: {
    databasesSorted() {
      return this.databases?.sort(sortByOrder)
    },
  },

  async asyncData({ store, error, route, params, $source }) {
    return $source.resolve(route.path, async ({ query }) => {
      const result = await query(
        `
            query databases {
              databases: terms(taxonomy: "database") {
                id slug name
                summary: extra(path: "summary")
                knowledge: extra(path: "knowledge")
                status: extra(path: "status")
                order: extra(path: "order")

                image: featuredImage {
                  image(resolution: Small, format: png, transform: { resize: { width: 200, height: 200 }}) { src }
                  placeholder: image(resolution: Placeholder, format: png, transform: { resize: { width: 16, height: 16 }}, output: Inline) { src }
                }
              }
            }
        `,
      )

      return result
    })
  },

  head() {
    return generateSeoMeta({
      path: this.$route.path,
      title: 'Databases',
      description: 'Section with all the databases.',
    })
  },

  mounted() {
    if (this.$analytics) {
      this.$analytics.logEvent('view_page', {
        title: 'Databases',
        slug: '/database',
        link: '/database',
      })
    }
  },
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
