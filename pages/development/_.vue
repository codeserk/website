<template>
  <page-wrapper
    :title="area.name"
    :breadcrumbs="[{ name: 'Development', link: '/development' }]"
    :image="area.image"
    class="color full"
  >
    <div class="container mx-auto">
      <div class="block with-small-padding small with-shadow-left skew">
        <p v-text="area.summary" />

        <template v-if="area.description">
          <hr />
          <dom-content v-bind="area.dom" aos="fade-up" />
        </template>
      </div>

      <template v-if="area.articles.length > 0">
        <h2>Posts</h2>
        <article-grid :articles="area.articles" />
      </template>

      <template v-if="area.projects.length > 0">
        <h2>Projects</h2>
        <project-grid :projects="area.projects" />
      </template>
    </div>
  </page-wrapper>
</template>

<script>
import { generateSeoMeta } from '../../utils/seo'

export default {
  components: {
    PageWrapper: () => import('~/components/page/wrapper'),
    ProjectGrid: () => import('~/components/project/project-grid'),
    ArticleGrid: () => import('~/components/card/article-grid'),
    DomContent: () => import('~/components/dom/dom-content'),
  },

  async asyncData({ store, error, route, params, $source }) {
    const slug = route.path.split('/').pop()
    const data = await $source.resolve(route.path, ({ query }) =>
      query(
        `
          query development($slug: String!) {
            area: termBySlug(slug: $slug, taxonomy: "development-area") {
              id name description dom link
              summary: extra(path: "summary")

              image: featuredImage {
                image(resolution: Small, format: png, transform: { resize: { width: 200, height: 200 }}) { src }
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

              projects: relatedPosts(type: "project") {
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
          }
        `,
        { slug },
      ),
    )

    if (!data.area) {
      return error({ statusCode: 404, message: 'Development area not found' })
    }

    return data
  },

  head() {
    return generateSeoMeta({
      path: this.$route.path,
      title: this.area.name,
      description: this.area.description,
    })
  },

  mounted() {
    if (this.$analytics && this.area) {
      this.$analytics.logEvent('view_page', {
        title: this.area.name,
        slug: this.area.slug,
        link: this.area.link,
      })
    }
  },
}
</script>
