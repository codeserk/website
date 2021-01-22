<template>
  <term-page :breadcrumbs="[{ name: 'Languages', link: '/language' }]" :term="language" />
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
          query language($slug: String!) {
            language: termBySlug(slug: $slug, taxonomy: "language") {
              id name description dom link
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

    if (!data.language) {
      return error({ statusCode: 404, message: 'Language not found' })
    }

    return data
  },

  head() {
    return generateSeoMeta({
      path: this.$route.path,
      title: `${this.language.name} · Language`,
      description: this.language.summary,
      image: this.language.image?.header.src,
    })
  },
}
</script>
