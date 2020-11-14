<template>
  <div class="page-wrapper color full">
    <div class="container mx-auto">
      <h2 v-text="database.name" class="title" />

      <div class="block small skew">
        <dom-content v-bind="database.dom" class="mx-auto" aos="fade-up" />
      </div>
    </div>
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
            query database($slug: String!) {
                database: termBySlug(slug: $slug, taxonomy: "database") {
                    id name description dom
                }
            }
        `,
        { slug },
      ),
    )

    if (!data.database) {
      return error({ statusCode: 404, message: 'Página no encontrada' })
    }

    return data
  },

  head() {
    return generateSeoMeta({
      path: this.$route.path,
      title: this.database.name,
      description: this.database.description,
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
  color: white;
}
.title {
  margin-bottom: 0.5em;
  font-size: 4em;
  text-align: center;
}
</style>