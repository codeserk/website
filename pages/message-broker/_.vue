<template>
  <page-wrapper
    :title="broker.name"
    :breadcrumbs="[{ name: 'Message Brokers', link: '/message-broker' }]"
    :image="broker.image"
    class="color full"
  >
    <div class="container mx-auto">
      <div class="block with-small-padding small skew with-shadow-left">
        <p v-text="broker.summary" />

        <template v-if="broker.description">
          <hr />
          <dom-content v-bind="broker.dom" class="mx-auto" aos="fade-up" />
        </template>
      </div>

      <template v-if="broker.projects.length > 0">
        <h2>Projects</h2>
        <project-grid :projects="broker.projects" />
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
          query broker($slug: String!) {
            broker: termBySlug(slug: $slug, taxonomy: "message-broker") {
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

    if (!data.broker) {
      return error({ statusCode: 404, message: 'Message Broker not found' })
    }

    return data
  },

  head() {
    return generateSeoMeta({
      path: this.$route.path,
      title: this.broker.name,
      description: this.broker.description,
      image: this.image?.image.src,
    })
  },

  mounted() {
    if (this.$analytics) {
      if (this.broker) {
        this.$analytics.logEvent('view_page', {
          title: this.broker.title,
          slug: this.broker.slug,
          link: this.broker.link,
        })
      }
    }
  },
}
</script>
