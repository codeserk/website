<template>
  <div class="projects clearfix">
    <card
      v-for="(project, index) in sortedProjects"
      :key="project.id"
      v-bind="project"
      :index="index"
      :link="project.link"
      :summary="project.excerpt"
    >
      <div class="areas chip-container">
        <chip v-for="area in project.areas" :key="area.id" :slug="area.slug" :text="area.name" type="development" />
      </div>
    </card>
  </div>
</template>

<script>
import { sortByOrder } from '../../utils/sort'

export default {
  components: {
    Card: () => import('~/components/card'),
    Chip: () => import('~/components/chip'),
  },

  props: {
    projects: {
      type: Array,
      default: () => [],
    },

    limit: {
      type: Number,
      default: 0,
    },
  },

  computed: {
    sortedProjects() {
      const result = [...this.projects].sort(sortByOrder)

      if (this.limit > 0) {
        return result.slice(0, this.limit)
      }

      return result
    },
  },
}
</script>

<style lang="scss" scoped>
.projects {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
