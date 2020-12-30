<template>
  <page-wrapper :title="project.title" :image="project.image" :breadcrumbs="breadcrumbs" class="color full">
    <div class="container mx-auto clearfix">
      <time-block :start-date="project.startDate" :end-date="project.endDate" with-padding-left with-padding-right>
        <template #left-block class="block-left">
          <progress-bar :progress="project.progress" :text="project.status" class="progress" />
          <hr />

          <terms-map :item="project" />

          <template v-if="project.website || project.github || project.android">
            <hr />

            <ul class="links">
              <li v-if="project.website">
                <a :href="project.website" v-text="beautifiedWebsite" rel="noreferrer noopener" target="__blank" />
              </li>
              <li v-if="project.github">
                <a :href="project.github" target="__blank" rel="noreferrer noopener">
                  <span class="sr-only">GitHub account</span>
                  <font-awesome-icon :icon="['fab', 'github']" size="lg" />
                </a>
              </li>
              <li v-if="project.android">
                <a :href="project.android" target="__blank" rel="noreferrer noopener">
                  <span class="sr-only">Android Application</span>
                  <font-awesome-icon :icon="['fab', 'android']" size="lg" />
                </a>
              </li>
            </ul>
          </template>
        </template>

        <template #right-block>
          <dom-content v-bind="project.dom" class="mx-auto" aos="appear" />
        </template>
      </time-block>

      <section v-if="logs.length > 0">
        <h2 class="heading">
          <router-link :to="`${project.link}/log`">Dev Log</router-link>
        </h2>

        <single-time-block v-for="log in logs" :key="log.id" :date="log.createdAt">
          <h3 class="title">
            <router-link :to="log.link" v-text="log.title" />
          </h3>
          <p v-text="log.excerpt" class="p-6" />
        </single-time-block>

        <div v-if="hasMoreLogs" class="more-container" data-aos="appear">
          <nuxt-link :to="`${project.link}/log`">More logs...</nuxt-link>
        </div>
      </section>

      <section v-if="gallery.length > 0">
        <h2 class="heading">Gallery</h2>
        <gallery :images="gallery" />
      </section>

      <section v-if="project.similar.length > 0">
        <h2 class="heading">Similar projects</h2>
        <project-grid :projects="project.similar" />
      </section>
    </div>
  </page-wrapper>
</template>

<script>
import { beautifyLink } from '~/utils/link'

export default {
  components: {
    ProgressBar: () => import('~/components/progress-bar'),
    TimeBlock: () => import('~/components/block/time-block'),
    SingleTimeBlock: () => import('~/components/block/single-time-block'),
    TermsMap: () => import('~/components/terms-map'),
    DomContent: () => import('~/components/dom/dom-content'),
    ProjectGrid: () => import('~/components/project/project-grid'),
    Gallery: () => import('~/components/gallery'),
  },

  props: {
    project: {
      type: Object,
      default: () => null,
    },
  },

  computed: {
    beautifiedWebsite() {
      if (!this.project.website) {
        return
      }

      return beautifyLink(this.project.website)
    },

    placeholder() {
      return this.project.icon?.placeholder.src
    },

    breadcrumbs() {
      const result = [this.project.type]
      if (this.project.mainTerm) {
        result.push({
          name: this.project.mainTerm.name,
          link: `${this.project.type.link}/${this.project.mainTerm.slug}`,
        })
      }

      return result
    },

    gallery() {
      return (
        this.project.gallery?.map(image => ({
          id: image.id,
          src: image.image?.src,
          placeholder: image.placeholder?.src,
          thumbnail: image.thumbnail?.src,
          thumbnailPlaceholder: image.thumbnailPlaceholder?.src,
          large: image.large?.src,
          width: image.large?.width,
          height: image.large?.height,
        })) ?? []
      )
    },

    hasMoreLogs() {
      return this.project?.logs?.length > 5
    },

    logs() {
      return this.project.logs?.slice(0, 5)
    },
  },
}
</script>

<style lang="scss" scoped>
.more-container {
  margin-top: 3em;
  text-align: center;
}

.links {
  li {
    margin-bottom: 1em;
  }
}
</style>
