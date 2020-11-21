<template>
  <div class="home-articles container mx-auto">
    <article-grid :articles="articles" :limit="2" />

    <div class="more-container" data-aos="fade-up">
      <nuxt-link to="/blog">More articles...</nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    ArticleGrid: () => import('~/components/card/article-grid'),
  },

  props: {
    articles: {
      type: Array,
      default: () => [],
    },
  },
}
</script>

<style lang="scss" scoped>
.home-articles {
  .more-container {
    margin-top: 3em;
    text-align: center;
  }
}
</style>
