<template>
  <page-wrapper
    :title="language.name"
    :breadcrumbs="[{ name: 'Languages', link: '/language' }]"
    :image="language.image"
    class="color full"
  >
    <div class="container mx-auto">
      <div class="block with-small-padding small skew with-shadow-left">
        <p v-text="language.summary" />

        <template v-if="language.description">
          <hr />
          <dom-content v-bind="language.dom" class="mx-auto" aos="fade-up" />
        </template>
      </div>

      <template v-if="language.posts.length > 0">
        <h2>Posts</h2>
        <article-grid :articles="language.posts" />
      </template>

      <template v-if="language.projects.length > 0">
        <h2>Projects</h2>
        <project-grid :projects="language.projects" />
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
    ArticleGrid: () => import('~/components/card/article-grid'),
  },

  async asyncData({ store, error, route, $source }) {
    const slug = route.path.split('/').pop()
    const data = await $source.resolve(route.path, ({ query }) =>
      query(
        `
          query language($slug: String!) {
            language: termBySlug(slug: $slug, taxonomy: "language") {
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

              posts: relatedPosts(type: "blog") {
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
      title: this.language.name,
      description: this.language.description,
      image: this.image?.image.src,
    })
  },

  mounted() {
    if (this.$analytics) {
      if (this.language) {
        this.$analytics.logEvent('view_page', {
          title: this.language.title,
          slug: this.language.slug,
          link: this.language.link,
        })
      }
    }
  },
}
</script>
