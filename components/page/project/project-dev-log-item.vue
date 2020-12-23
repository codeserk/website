<template>
  <page-wrapper :title="post.title" :breadcrumbs="breadcrumbs" :image="post.image" class="color full">
    <div class="container mx-auto">
      <div class="block-container">
        <span v-text="date" class="date" />
        <div class="block small with-padding with-shadow-left skew content">
          <dom-content v-bind="post.dom" class="mx-auto" aos="appear" />
        </div>
      </div>

      <single-time-block v-for="log in logs" :key="log.id" :date="log.createdAt">
        <h3 class="title">
          <router-link :to="log.link" v-text="log.title" />
        </h3>
        <p v-text="log.excerpt" class="p-6" />
      </single-time-block>
    </div>
  </page-wrapper>
</template>

<script>
import moment from 'moment'

export default {
  components: {
    DomContent: () => import('~/components/dom/dom-content'),
    SingleTimeBlock: () => import('~/components/block/single-time-block'),
  },

  props: {
    post: { type: Object, default: () => ({}) },
  },

  computed: {
    date() {
      if (!this.post.createdAt) {
        return
      }

      return moment(this.post.createdAt).format('DD/MM/YYYY')
    },

    breadcrumbs() {
      const logsLink = `${this.post.parent.breadcrumbs[this.post.parent.breadcrumbs.length - 1].link}/log`

      return [...this.post.parent.breadcrumbs, { name: 'Log', link: logsLink }]
    },

    logs() {
      return this.post.parent?.logs?.filter(log => log.id !== this.post.id)
    },
  },
}
</script>

<style lang="scss" scoped>
.block-container {
  position: relative;
  padding-top: 3em;

  .date {
    position: absolute;
    top: 0;
    left: calc(30% - 29px);
    padding: 0 1em;
    font-size: 1.5em;
  }

  &::before {
    content: '';
    position: absolute;
    top: -30px;
    bottom: -30px;
    left: 0;
    margin-left: calc(30% - 32px);
    border-right: 8px solid white;
  }
}
</style>
