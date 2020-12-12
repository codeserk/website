<template>
  <page-wrapper title="Message Brokers" header-class="centered" class="color full">
    <div class="container mx-auto">
      <card
        v-for="(broker, index) in brokersSorted"
        :key="broker.id"
        v-bind="broker"
        :index="index"
        :title="broker.name"
        :link="`/message-broker/${broker.slug}`"
        :progress="broker.knowledge"
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
    brokersSorted() {
      return this.brokers?.sort(sortByOrder)
    },
  },

  async asyncData({ store, error, route, params, $source }) {
    return $source.resolve(route.path, async ({ query }) => {
      const result = await query(
        `
            query brokers {
              brokers: terms(taxonomy: "message-broker") {
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
      title: 'Message Brokers',
      description: 'Section with all the message brokers.',
    })
  },

  mounted() {
    if (this.$analytics) {
      this.$analytics.logEvent('view_page', {
        title: 'Message Brokers',
        slug: '/message-broker',
        link: '/message-broker',
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
