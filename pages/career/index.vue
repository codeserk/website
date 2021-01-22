<template>
  <page-wrapper class="color full" title="Career 📱">
    <div class="container mx-auto">
      <career :career="career" />
    </div>
  </page-wrapper>
</template>

<script>
import { generateSeoMeta } from '../../utils/seo'
export default {
  components: {
    Career: () => import('~/components/home/career'),
  },

  async asyncData({ route, $source }) {
    return $source.resolve(route.path, ({ query }) =>
      query(
        `
          query career {
            career: posts(type: "career") {
              id slug title content dom
              startDate: extra(path: "startDate")
              endDate: extra(path: "endDate")
              position: extra(path: "position")
              website: extra(path: "website")
              areas: terms(taxonomy: "development-area") { id slug name order: extra(path: "order") }
              languages: terms(taxonomy: "language") { id slug name order: extra(path: "order") }
              frameworks: terms(taxonomy: "framework") { id slug name order: extra(path: "order") }
              databases: terms(taxonomy: "database") { id slug name order: extra(path: "order") }
              brokers: terms(taxonomy: "message-broker") { id slug name order: extra(path: "order") }
              technologies: terms(taxonomy: "technology") { id slug name order: extra(path: "order") }
              featuredImage {
                image(resolution: Small, format: png, transform: { resize: { width: 290, height: 290 }}) { src }
                placeholder: image(resolution: Placeholder, format: png, transform: { resize: { width: 16, height: 16 }}, output: Inline) { src }
              }
            }
          }
        `,
      ),
    )
  },

  head() {
    return generateSeoMeta({
      path: this.$route.path,
      title: 'Projects',
      description: 'Section with all the projects.',
    })
  },
}
</script>

<style lang="scss" scoped>
.page {
  padding-top: 3em;
  padding-bottom: 4em;
}
</style>
