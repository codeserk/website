<template>
  <div class="container mx-auto">
    <time-block v-for="item in items" :key="item.id" v-bind="item" class="item" with-padding-right>
      <template #left-block>
        <router-link :to="`/career/${item.slug}`">
          <h3 v-text="item.title" class="title" />
        </router-link>

        <section>
          <div :class="{ 'no-position': !item.position }" class="item-header">
            <span v-text="item.period" class="period-text" />
            <span v-text="item.position" class="position" />
          </div>

          <terms-map :item="item" />
        </section>
      </template>

      <template #right-block>
        <dom-content v-bind="item.dom" class="mx-auto" aos="appear" />
      </template>
    </time-block>
  </div>
</template>

<script>
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

.position {
  display: block;
  font-size: 1.1em;
}
</style>