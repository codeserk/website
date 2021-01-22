<template>
  <page-wrapper :title="page.title" :image="page.image" class="color full">
    <div class="container mx-auto">
      <div class="block small with-padding with-shadow-left skew content">
        <dom-content v-bind="page.dom" class="mx-auto" aos="appear" />
      </div>
    </div>
  </page-wrapper>
</template>

<script>
import { generateSeoMeta } from '../utils/seo'

export default {
  components: {
    DomContent: () => import('~/components/dom/dom-content'),
  },

  async asyncData({ store, error, route, params, $source }) {
    const slug = route.path.split('/').pop()
    const data = await $source.resolve(route.path, ({ query }) =>
      query(
        `
          query page($slug: String!) {
            page: postBySlug(slug: $slug, type: "page") {
              id title excerpt content dom link

              image: featuredImage {
                image(resolution: Small, format: png, transform: { resize: { width: 200, height: 200 }}) { src }
                header: image(resolution: Medium, format: png, transform: { resize: { width: 600, height: 600 }}) { src }
                placeholder: image(resolution: Placeholder, format: png, transform: { resize: { width: 16, height: 16 }}, output: Inline) { src }
              }
            }
        }
        `,
        { slug },
      ),
    )

    if (!data.page) {
      return error({ statusCode: 404, message: 'Page not found' })
    }

    return data
  },

  head() {
    return generateSeoMeta({
      path: this.$route.path,
      title: this.page.title,
      description: this.page.excerpt,
      keywords: this.getKeywords(this.page),
      image: this.page.image?.header.src,
    })
  },
}
</script>

<style lang="scss" scoped>
.page {
  padding-top: 3em;
  padding-bottom: 4em;
}
.title {
  margin-bottom: 0.5em;
  font-size: 4em;
  text-align: center;
}
</style>
