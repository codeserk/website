<template>
  <div class="container mx-auto">
    <time-block
      v-for="item in items"
      :key="item.id"
      :start-date="item.startDate"
      :end-date="item.endDate"
      class="item"
      with-padding-right
    >
      <template v-slot:left-block="{ period }">
        <router-link :to="`/career/${item.slug}`">
          <h3 v-text="item.title" class="title" />
        </router-link>

        <section>
          <div :class="{ 'no-position': !item.position }" class="item-header">
            <span v-text="period" class="period-text" />
            <span v-text="item.position" class="position" />
          </div>

          <terms-map :item="item" />

          <template v-if="item.website">
            <hr />

            <a :href="item.website" v-text="item.beautifiedWebsite" target="_blank" />
          </template>
        </section>
      </template>

      <template #right-block>
        <img v-if="item.featuredImage" v-lazy="item.image" class="image lazy" />
        <dom-content v-bind="item.dom" :max-paragraphs="1" class="mx-auto" aos="appear" />

        <hr />
        <p class="text-center" data-aos="appear">
          <router-link :to="`/career/${item.slug}`">Read more...</router-link>
        </p>
      </template>
    </time-block>
  </div>
</template>

<script>
import { beautifyLink } from '../../utils/link'
import { sortByDate, sortByOrder } from '../../utils/sort'

export default {
  components: {
    DomContent: () => import('~/components/dom/dom-content'),
    TermsMap: () => import('~/components/terms-map'),
    TimeBlock: () => import('~/components/block/time-block'),
  },

  props: {
    /** Career items (jobs / conferences) */
    career: {
      type: Array,
      default: () => [],
    },
  },

  computed: {
    items() {
      return [...this.career].sort(sortByDate('startDate')).map(item => {
        return {
          ...item,
          image: {
            src: item.featuredImage?.image.src,
            loading: item.featuredImage?.placeholder.src,
          },
          beautifiedWebsite: item.website ? beautifyLink(item.website) : undefined,
          areas: item.areas.sort(sortByOrder),
          languages: item.languages.sort(sortByOrder),
          frameworks: item.frameworks.sort(sortByOrder),
          databases: item.databases.sort(sortByOrder),
          brokers: item.brokers.sort(sortByOrder),
          technologies: item.technologies.sort(sortByOrder),
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.no-position {
  display: none;
}

.item {
  img.image {
    display: inline;
    width: 150px;
    height: 150px;
    margin-left: 1em;
    margin-bottom: 1em;
    float: right;
  }
}

.position {
  display: block;
  font-size: 1.1em;
}
</style>
