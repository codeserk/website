<template>
  <div class="challenge-grid clearfix">
    <challenge-card
      v-for="(challenge, index) in sortedChallenges"
      :key="challenge.id"
      v-bind="challenge"
      :index="index"
      :link="challenge.link"
      :summary="challenge.excerpt"
    />
  </div>
</template>

<script>
import { sortByOrder } from '../../utils/sort'

export default {
  components: {
    ChallengeCard: () => import('~/components/card/challenge'),
  },

  props: {
    challenges: {
      type: Array,
      default: () => [],
    },

    limit: {
      type: Number,
      default: 0,
    },
  },

  computed: {
    sortedChallenges() {
      const result = [...this.challenges].sort(sortByOrder)

      if (this.limit > 0) {
        return result.slice(0, this.limit)
      }

      return result
    },
  },
}
</script>

<style lang="scss" scoped>
.challenge-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
