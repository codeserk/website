<template>
  <page-wrapper
    :title="framework.name"
    :breadcrumbs="[{ name: 'Frameworks', link: '/framework' }]"
    :image="framework.image"
    class="color full"
  >
    <div class="container mx-auto">
      <div class="block with-small-padding small skew with-shadow-left">
        <p v-text="framework.summary" />

        <template v-if="framework.description">
          <hr />
          <dom-content v-bind="framework.dom" class="mx-auto" aos="fade-up" />
        </template>
      </div>

      <template v-if="framework.projects.length > 0">
        <h2>Projects</h2>
        <project-grid :projects="framework.projects" />
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
          query framework($slug: String!) {
            framework: termBySlug(slug: $slug, taxonomy: "framework") {
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

    if (!data.framework) {
      return error({ statusCode: 404, message: 'Framework not found' })
    }

    return data
  },

  head() {
    return generateSeoMeta({
      path: this.$route.path,
      title: this.framework.name,
      description: this.framework.description,
      image: this.image?.image.src,
    })
  },

  mounted() {
    if (this.$analytics) {
      if (this.framework) {
        this.$analytics.logEvent('view_page', {
          title: this.framework.title,
          slug: this.framework.slug,
          link: this.framework.link,
        })
      }
    }
  },
}
</script>
