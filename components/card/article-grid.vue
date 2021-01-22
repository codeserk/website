<template>
  <div class="article-grid clearfix">
    <article-card
      v-for="(article, index) in sortedArticles"
      :key="article.id"
      v-bind="article"
      :index="index"
      :link="article.link"
      :summary="article.excerpt"
    />
  </div>
</template>

<script>
import { sortByDate, sortByOrder } from '../../utils/sort'

export default {
  components: {
    ArticleCard: () => import('~/components/card/article'),
  },

  props: {
    articles: {
      type: Array,
      default: () => [],
    },

    limit: {
      type: Number,
      default: 0,
    },
  },

  computed: {
    sortedArticles() {
      const result = [...this.articles].sort(sortByDate('createdAt'))

      if (this.limit > 0) {
        return result.slice(0, this.limit)
      }

      return result
    },
  },
}
</script>

<style lang="scss" scoped>
.article-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
