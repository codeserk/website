<template>
  <div class="page py-6 container mx-auto main overflow-hidden">
    <h2 class="title">{{ page.title }}</h2>

    <dom-content v-bind="page.dom" class="mx-auto" aos="fade-up" />
  </div>
</template>

<script>
import { generateSeoMeta } from '../../utils/seo'

export default {
  components: {
    DomContent: () => import('~/components/dom/dom-content'),
  },

  computed: {
    isHome() {
      return this.$route.path === '/' || this.$route.path === ''
    },
  },

  async asyncData({ store, error, route, params, $source }) {
    if (route.path === '/' || route.path === '') {
      return {
        page: {},
      }
    }

    const slug = route.path.split('/').pop()
    const data = await $source.resolve(route.path, ({ query }) =>
      query(
        `
            query project($slug: String!) {
                page: postBySlug(slug: $slug, type: "project") {
                    id title content dom
                }
            }
        `,
        { slug },
      ),
    )

    if (!data.page) {
      return error({ statusCode: 404, message: 'Página no encontrada' })
    }

    return data
  },

  head() {
    if (this.page.isHome) {
      return generateSeoMeta({})
    }

    return generateSeoMeta({
      path: this.$route.path,
      title: this.page.title,
      description: this.page.content,
      image: this.page.featuredMedia ? this.page.featuredMedia.src : undefined,
    })
  },

  mounted() {
    if (this.$analytics) {
      if (this.page) {
        this.$analytics.logEvent('view_page', {
          title: this.page.title,
          slug: this.page.slug,
          link: this.page.link,
        })
      } else {
        this.$analytics.logEvent('view_page', {
          title: 'Home',
          slug: 'home',
          link: '/',
        })
      }
    }
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
