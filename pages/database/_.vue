<template>
  <page-wrapper
    :title="database.name"
    :breadcrumbs="[{ name: 'Databases', link: '/database' }]"
    :image="database.image"
    class="color full"
  >
    <div class="container mx-auto">
      <div class="block with-small-padding small skew with-shadow-left">
        <p v-text="database.summary" />

        <template v-if="database.description">
          <hr />
          <dom-content v-bind="database.dom" class="mx-auto" aos="fade-up" />
        </template>
      </div>

      <template v-if="database.projects.length > 0">
        <h2>Projects</h2>
        <project-grid :projects="database.projects" />
      </template>
    </div>
  </page-wrapper>
</template>

<script>
import { generateSeoMeta } from '../../utils/seo'

export default {
  components: {
    PageWrapper: () => import('~/components/page/wrapper'),
    DomContent: () => import('~/components/dom/dom-content'),
    ProjectGrid: () => import('~/components/project/project-grid'),
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
                placeholder: image(resolution: Placeholder, format: png, transform: { resize: { width: 16, height: 16 }}, output: Inline) { src }
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
      title: this.database.name,
      description: this.database.description,
      image: this.image?.image.src,
    })
  },

  mounted() {
    if (this.$analytics) {
      if (this.database) {
        this.$analytics.logEvent('view_page', {
          title: this.database.title,
          slug: this.database.slug,
          link: this.database.link,
        })
      }
    }
  },
}
</script>
