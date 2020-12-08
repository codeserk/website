<template>
  <term-page :breadcrumbs="[{ name: 'Databases', link: '/database' }]" :term="database" />
</template>

<script>
import { generateSeoMeta } from '../../utils/seo'

export default {
  components: {
    TermPage: () => import('~/components/page/term/term-page'),
  },

  async asyncData({ store, error, route, $source }) {
    const slug = route.path.split('/').pop()
    const data = await $source.resolve(route.path, ({ query }) =>
      query(
        `
          query database($slug: String!) {
            database: termBySlug(slug: $slug, taxonomy: "database") {
              id name description dom
              summary: extra(path: "summary")

              image: featuredImage {
                image(resolution: Small, format: png, transform: { resize: { width: 200, height: 200 }}) { src }
                header: image(resolution: Medium, format: png, transform: { resize: { width: 600, height: 600 }}) { src }
                placeholder: image(resolution: Placeholder, format: png, transform: { resize: { width: 16, height: 16 }}, output: Inline) { src }
              }

              articles: relatedPosts(type: "blog") {
                id slug title excerpt link
                status: extra(path: "status")
                progress: extra(path: "progress")
                order: extra(path: "order")
                image: featuredImage {
                  image(resolution: Small, format: png, transform: { resize: { width: 290, height: 290 }}) { src }
                  placeholder: image(resolution: Placeholder, format: png, transform: { resize: { width: 16, height: 16 }}, output: Inline) { src }
                }
                areas: terms(taxonomy: "development-area") { id slug name order: extra(path: "order") }
              }

              career: relatedPosts(type: "career") {
                id slug title excerpt content dom link
                mainTerm { id }
                status: extra(path: "status")
                progress: extra(path: "progress")
                startDate: extra(path: "startDate")
                endDate: extra(path: "endDate")
                order: extra(path: "order")
                image: featuredImage {
                  image(resolution: Small, format: png, transform: { resize: { width: 290, height: 290 }}) { src }
                  placeholder: image(resolution: Placeholder, format: png, transform: { resize: { width: 16, height: 16 }}, output: Inline) { src }
                }
                areas: terms(taxonomy: "development-area") { id slug name order: extra(path: "order") }
                languages: terms(taxonomy: "language") { id slug name order: extra(path: "order") }
                frameworks: terms(taxonomy: "framework") { id slug name order: extra(path: "order") }
                databases: terms(taxonomy: "database") { id slug name order: extra(path: "order") }
                brokers: terms(taxonomy: "message-broker") { id slug name order: extra(path: "order") }
                technologies: terms(taxonomy: "technology") { id slug name order: extra(path: "order") }
              }

              projects: relatedPosts(type: "project") {
                id slug title excerpt link
                status: extra(path: "status")
                progress: extra(path: "progress")
                order: extra(path: "order")
                image: featuredImage {
                  image(resolution: Small, format: png, transform: { resize: { width: 290, height: 290 }}) { src }
                  placeholder: image(resolution: Placeholder, format: png, transform: { resize: { width: 16, height: 16 }}, output: Inline) { src }
                }
                areas: terms(taxonomy: "development-area") { id slug name order: extra(path: "order") }
              }
            }
          }
        `,
        { slug },
      ),
    )

    if (!data.database) {
      return error({ statusCode: 404, message: 'Database not found' })
    }

    return data
  },

  head() {
    return generateSeoMeta({
      path: this.$route.path,
      title: `${this.database.name} · Database`,
      description: this.database.summary,
      image: this.database.image?.header.src,
    })
  },

  mounted() {
    if (this.$analytics & this.database) {
      this.$analytics.logEvent('view_page', {
        title: this.database.title,
        slug: this.database.slug,
        link: this.database.link,
      })
    }
  },
}
</script>
