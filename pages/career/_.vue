<template>
  <page-wrapper
    :image="job.image"
    :title="job.title"
    :breadcrumbs="[{ name: 'Career', link: '/career' }]"
    class="color full"
  >
    <div class="container mx-auto">
      <time-block :start-date="job.startDate" :end-date="job.endDate" with-padding-right>
        <template #left-block>
          <section>
            <div :class="{ 'no-position': !job.position }" class="item-header">
              <span v-text="job.period" class="period-text" />
              <span v-text="job.position" class="position" />
            </div>

            <terms-map :item="job" />

            <template v-if="job.website">
              <hr />

              <a :href="job.website" v-text="beautifiedWebsite" target="__blank" rel="noreferrer noopener" />
            </template>
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
import { beautifyLink } from '../../utils/link'
import { generateSeoMeta } from '../../utils/seo'

export default {
  components: {
    TimeBlock: () => import('~/components/block/time-block'),
    TermsMap: () => import('~/components/terms-map'),
    DomContent: () => import('~/components/dom/dom-content'),
  },

  computed: {
    beautifiedWebsite() {
      if (!this.job.website) {
        return
      }

      return beautifyLink(this.job.website)
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
              website: extra(path: "website")
              areas: terms(taxonomy: "development-area") { id slug name order: extra(path: "order") }
              languages: terms(taxonomy: "language") { id slug name order: extra(path: "order") }
              frameworks: terms(taxonomy: "framework") { id slug name order: extra(path: "order") }
              databases: terms(taxonomy: "database") { id slug name order: extra(path: "order") }
              brokers: terms(taxonomy: "message-broker") { id slug name order: extra(path: "order") }
              technologies: terms(taxonomy: "technology") { id slug name order: extra(path: "order") }
              image: featuredImage {
                image(resolution: Small, format: png, transform: { resize: { width: 290, height: 290 }}) { src }
                placeholder: image(resolution: Placeholder, format: png, transform: { resize: { width: 16, height: 16 }}, output: Inline) { src }
              }
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
      image: this.image?.image.src,
    })
  },
}
</script>

<style lang="scss" scoped>
.page {
  padding-top: 3em;
  padding-bottom: 4em;
}
</style>
