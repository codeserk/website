<template>
  <component :is="component" :project="project" :area="area" />
</template>

<script>
import { generateSeoMeta } from '../../utils/seo'

export default {
  components: {
    ProjectPage: () => import('~/components/page/project/project-page'),
    ProjectsPage: () => import('~/components/page/project/projects-page'),
  },

  computed: {
    component() {
      return this.area ? 'projects-page' : 'project-page'
    },
  },

  async asyncData({ error, route, $source }) {
    const slug = route.path.split('/').pop()
    const data = await $source.resolve(route.path, ({ query }) =>
      query(
        `
          query project($slug: String!) {
            area: termBySlug(slug: $slug, taxonomy: "development-area") {
              id name
              image: featuredImage {
                image(resolution: Small, format: png, transform: { resize: { width: 200, height: 200 }}) { src }
                placeholder: image(resolution: Placeholder, format: png, transform: { resize: { width: 16, height: 16 }}, output: Inline) { src }
              }

              projects: posts(type: "project") {
                id slug title excerpt link
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
              }
            }

            project: postBySlug(slug: $slug, type: "project") {
              id title content dom
              image: featuredImage {
                image(resolution: Small, format: png, transform: { resize: { width: 200, height: 200 }}) { src }
                placeholder: image(resolution: Placeholder, format: png, transform: { resize: { width: 16, height: 16 }}, output: Inline) { src }
              }

              type { name link }
              mainTerm { name slug }
              status: extra(path: "status")
              progress: extra(path: "progress")

              startDate: extra(path: "startDate")
              endDate: extra(path: "endDate")

              areas: terms(taxonomy: "development-area") { id slug name order: extra(path: "order") }
              languages: terms(taxonomy: "language") { id slug name order: extra(path: "order") }
              frameworks: terms(taxonomy: "framework") { id slug name order: extra(path: "order") }
              databases: terms(taxonomy: "database") { id slug name order: extra(path: "order") }
              brokers: terms(taxonomy: "message-broker") { id slug name order: extra(path: "order") }
              technologies: terms(taxonomy: "technology") { id slug name order: extra(path: "order") }

              website: extra(path: "website")

              similar {
                id slug title excerpt link
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
              }
            }
          }
        `,
        { slug },
      ),
    )

    if (!data.area && !data.project) {
      return error({ statusCode: 404, message: 'Project not found' })
    }

    return data
  },

  head() {
    return generateSeoMeta({
      // path: this.$route.path,
      // title: this.project.title,
      // description: this.project.content,
      // image: this.project.icon ? this.project.icon.src : undefined,
    })
  },

  mounted() {
    if (this.$analytics) {
      if (this.project) {
        this.$analytics.logEvent('view_page', {
          // title: this.project.title,
          // slug: this.project.slug,
          // link: this.project.link,
        })
      }
    }
  },
}
</script>
