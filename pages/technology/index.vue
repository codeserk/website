<template>
  <page-wrapper title="Technologies" header-class="centered" class="color full">
    <div class="container mx-auto">
      <card
        v-for="(technology, index) in technologiesSorted"
        :key="technology.id"
        v-bind="technology"
        :index="index"
        :title="technology.name"
        :link="`/technology/${technology.slug}`"
        :progress="technology.knowledge"
      />
    </div>
  </page-wrapper>
</template>

<script>
import { sortByOrder } from '../../utils/sort'
export default {
  components: {
    PageWrapper: () => import('~/components/page/wrapper'),
    Card: () => import('~/components/card'),
  },

  computed: {
    technologiesSorted() {
      return this.technologies?.sort(sortByOrder)
    },
  },

  async asyncData({ store, error, route, params, $source }) {
    return $source.resolve(route.path, async ({ query }) => {
      const result = await query(
        `
            query technologies {
              technologies: terms(taxonomy: "technology") {
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
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
