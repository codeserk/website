<template>
  <page-wrapper title="Development" header-class="centered" class="color full">
    <div class="container mx-auto">
      <card
        v-for="(area, index) in areasSorted"
        :key="area.id"
        :index="index"
        :title="area.name"
        :link="`/development/${area.slug}`"
        :progress="area.knowledge"
        :status="area.status"
        :image="area.image"
        :summary="area.summary"
      />
    </div>
  </page-wrapper>
</template>

<script>
import { generateSeoMeta } from '../../utils/seo'
import { sortByOrder } from '../../utils/sort'
export default {
  components: {
    Card: () => import('~/components/card'),
  },

  computed: {
    areasSorted() {
      return this.areas?.sort(sortByOrder)
    },
  },

  async asyncData({ store, error, route, params, $source }) {
    return $source.resolve(route.path, async ({ query }) => {
      const result = await query(
        `
            query development {
              areas: terms(taxonomy: "development-area") {
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
      title: 'Development',
      description: 'Section with all the development areas.',
    })
  },

  mounted() {
    if (this.$analytics) {
      this.$analytics.logEvent('view_page', {
        title: 'Development',
        slug: '/development',
        link: '/development',
      })
    }
  },
}
</script>

<style lang="scss" scoped>
.item {
  position: relative;
  margin-bottom: 1em;
  padding-bottom: 1em;

  .name {
    font-size: 1.2em;
  }
  .summary {
    margin-top: 4px;
    font-size: 0.8em;
  }

  &:last-child {
    margin: 0;
  }
}

.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
