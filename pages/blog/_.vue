<template>
  <page-wrapper
    :title="post.title"
    :breadcrumbs="[{ name: 'Blog', link: '/blog' }]"
    :image="post.image"
    class="color full"
  >
    <div class="container mx-auto">
      <dual-blocks class="item" with-padding-left with-padding-right>
        <template #left-block>
          <terms-map :item="post" />
        </template>

        <template #right-block>
          <dom-content v-bind="post.dom" />
        </template>
      </dual-blocks>
    </div>
  </page-wrapper>
</template>

<script>
import { generateSeoMeta } from '../../utils/seo'

export default {
  components: {
    PageWrapper: () => import('~/components/page/wrapper'),
    DualBlocks: () => import('~/components/block/dual-blocks'),
    TermsMap: () => import('~/components/terms-map'),
    DomContent: () => import('~/components/dom/dom-content'),
  },

  async asyncData({ store, error, route, $source }) {
    const slug = route.path.split('/').pop()
    const data = await $source.resolve(route.path, ({ query }) =>
      query(
        `
          query post($slug: String!) {
            post: postBySlug(slug: $slug, type: "blog") {
              id title content dom

              image: featuredImage {
                image(resolution: Small, format: png, transform: { resize: { width: 200, height: 200 }}) { src }
                placeholder: image(resolution: Placeholder, format: png, transform: { resize: { width: 16, height: 16 }}, output: Inline) { src }
              }

              areas: terms(taxonomy: "development-area") { id slug name order: extra(path: "order") }
              languages: terms(taxonomy: "language") { id slug name order: extra(path: "order") }
              frameworks: terms(taxonomy: "framework") { id slug name order: extra(path: "order") }
              databases: terms(taxonomy: "database") { id slug name order: extra(path: "order") }
              brokers: terms(taxonomy: "message-broker") { id slug name order: extra(path: "order") }
              technologies: terms(taxonomy: "technology") { id slug name order: extra(path: "order") }
            }
          }
        `,
        { slug },
      ),
    )

    if (!data.post) {
      return error({ statusCode: 404, message: 'post not found' })
    }

    return data
  },

  head() {
    return generateSeoMeta({
      path: this.$route.path,
      title: this.post.name,
      description: this.post.description,
      image: this.image?.image.src,
    })
  },

  mounted() {
    if (this.$analytics) {
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
