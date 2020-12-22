<template>
  <component :is="component" :project="post" :area="area" :post="post" />
</template>

<script>
import { generateSeoMeta } from '../../utils/seo'

export default {
  components: {
    ProjectsPage: () => import('~/components/page/project/projects-page'),
    ProjectPage: () => import('~/components/page/project/project-page'),
    ProjectSubpage: () => import('~/components/page/project/project-subpage'),
  },

  computed: {
    component() {
      if (this.area) {
        return 'projects-page'
      }

      if (this.post) {
        if (this.post.type?.id === 'project') {
          return 'project-page'
        }

        if (this.post.parent && this.post.type?.id === 'page') {
          return 'project-subpage'
        }
      }

      return ''
    },
  },

  async asyncData({ error, route, $source }) {
    const slug = route.path.split('/').pop()
    const data = await $source.resolve(route.path, ({ query }) =>
      query(
        `
          query project($slug: String!, $link: String!) {
            area: termBySlug(slug: $slug, taxonomy: "development-area") {
              id slug name link
              image: featuredImage {
                image(resolution: Small, format: png, transform: { resize: { width: 200, height: 200 }}) { src }
                header: image(resolution: Medium, format: png, transform: { resize: { width: 600, height: 600 }}) { src }
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

            post: postByLink(link: $link) {
              id title excerpt content dom link
              image: featuredImage {
                image(resolution: Small, format: png, transform: { resize: { width: 200, height: 200 }}) { src }
                header: image(resolution: Medium, format: png, transform: { resize: { width: 600, height: 600 }}) { src }
                placeholder: image(resolution: Placeholder, format: png, transform: { resize: { width: 16, height: 16 }}, output: Inline) { src }
              }

              type { id name link }
              parent { id breadcrumbs { name link } title mainTerm { name } }
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
              github: extra(path: "github")
              gallery: galleryImages {
                image(resolution: Medium, format: png) { src }
                placeholder: image(resolution: Placeholder, format: png, output: Inline) { src }
                large: image(resolution: Large, format: png) { src width height }
                thumbnail: image(resolution: Placeholder, format: png, transform: { resize: { width: 200, height: 200 }}, output: Inline) { src }
                thumbnailPlaceholder: image(resolution: Placeholder, format: png, transform: { resize: { width: 16, height: 16 }}, output: Inline) { src }
              }

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
        { slug, link: route.path },
      ),
    )

    if (!data.area && !data.post) {
      return error({ statusCode: 404, message: 'Project not found' })
    }

    return data
  },

  head() {
    if (this.area) {
      return generateSeoMeta({
        path: this.$route.path,
        title: `${this.area.name} · Project`,
        description: this.area.summary,
        image: this.area.image?.header.src,
      })
    }

    if (this.post) {
      if (this.post.parent) {
        return generateSeoMeta({
          path: this.$route.path,
          title: `${this.post.title} · ${this.post.parent.title} · ${this.post.parent.mainTerm?.name} · Project`,
          description: this.post.summary || this.post.excerpt,
          keywords: this.getKeywords(this.post),
          image: this.post.image?.header.src,
        })
      }

      return generateSeoMeta({
        path: this.$route.path,
        title: `${this.post.title} · ${this.post.mainTerm?.name} · Project`,
        description: this.post.summary || this.post.excerpt,
        keywords: this.getKeywords(this.post),
        image: this.post.image?.header.src,
      })
    }
  },

  mounted() {
    if (this.$analytics) {
      if (this.area) {
        this.$analytics.logEvent('view_page', {
          title: this.area.name,
          slug: this.area.slug,
          link: this.area.link,
        })
      }

      if (this.post) {
        this.$analytics.logEvent('view_page', {
          title: this.post.title,
          slug: this.post.slug,
          link: this.post.link,
        })
      }
    }
  },
}
</script>
