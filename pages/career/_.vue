<template>
  <page-wrapper
    :image="image"
    :title="job.title"
    :breadcrumbs="[{ name: 'Career', link: '/career' }]"
    class="color full"
  >
    <div class="container mx-auto">
      <time-block v-bind="job" with-padding-right>
        <template #left-block>
          <section>
            <div :class="{ 'no-position': !job.position }" class="item-header">
              <span v-text="job.period" class="period-text" />
              <span v-text="job.position" class="position" />
            </div>

            <terms-map :item="job" />
          </section>
        </template>

        <template #right-block>
          <dom-content v-bind="job.dom" class="mx-auto" aos="appear" />
        </template>
      </time-block>
    </div>
  </page-wrapper>
</template>

<script>
import { generateSeoMeta } from '../../utils/seo'

export default {
  components: {
    PageWrapper: () => import('~/components/page/wrapper'),
    TimeBlock: () => import('~/components/block/time-block'),
    TermsMap: () => import('~/components/terms-map'),
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
            query page($slug: String!) {
                job: postBySlug(slug: $slug, type: "career") {
                    id title content dom
                    startDate: extra(path: "startDate")
                    endDate: extra(path: "endDate")
                    position: extra(path: "position")
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

    if (!data.job) {
      return error({ statusCode: 404, message: 'Job not found' })
    }

    return data
  },

  head() {
    return generateSeoMeta({
      path: this.$route.path,
      title: this.job.title,
      description: this.job.content,
      image: this.job.featuredMedia ? this.job.featuredMedia.src : undefined,
    })
  },

  mounted() {
    if (this.$analytics) {
      if (this.job) {
        this.$analytics.logEvent('view_page', {
          title: this.job.title,
          slug: this.job.slug,
          link: this.job.link,
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
</style>
