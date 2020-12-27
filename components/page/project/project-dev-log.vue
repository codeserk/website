<template>
  <page-wrapper :breadcrumbs="breadcrumbs" :image="post.image" title="Dev Log" class="color full">
    <div class="container mx-auto">
      <single-time-block v-for="log in post.logs" :key="log.id" :date="log.createdAt">
        <h3 class="title">
          <router-link :to="log.link" v-text="log.title" />
        </h3>
        <p v-text="log.excerpt" class="p-6" />
      </single-time-block>
    </div>
  </page-wrapper>
</template>

<script>
export default {
  components: {
    SingleTimeBlock: () => import('~/components/block/single-time-block'),
  },

  props: {
    post: { type: Object, default: () => ({}) },
  },

  computed: {
    breadcrumbs() {
      return this.post.breadcrumbs
    },
  },
}
</script>
