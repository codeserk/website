<template>
  <page-wrapper title="Framework" header-class="centered" class="color full">
    <div class="container mx-auto">
      <card
        v-for="(framework, index) in frameworksSorted"
        :key="framework.id"
        v-bind="framework"
        :index="index"
        :title="framework.name"
        :link="`/framework/${framework.slug}`"
        :progress="framework.knowledge"
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
    frameworksSorted() {
      return this.frameworks?.sort(sortByOrder)
    },
  },

  async asyncData({ store, error, route, params, $source }) {
    return $source.resolve(route.path, async ({ query }) => {
      const result = await query(
        `
            query frameworks {
              frameworks: terms(taxonomy: "framework") {
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
      title: 'Frameworks',
      description: 'Section with all the frameworks.',
    })
  },

  mounted() {
    if (this.$analytics) {
      this.$analytics.logEvent('view_page', {
        title: 'Frameworks',
        slug: '/framework',
        link: '/framework',
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
