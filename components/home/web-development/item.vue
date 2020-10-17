<template>
  <div class="home-web-development-item">
    <router-link :to="link">
      <h5 v-text="name" class="name" />
    </router-link>
    <progress-bar :progress="knowledge" :text="status" />
    <p v-text="summary" class="summary" />
  </div>
</template>

<script>
export default {
  components: {
    ProgressBar: () => import('../../progress-bar.vue'),
  },

  props: {
    link: {
      type: String,
      default: '',
    },

    name: {
      type: String,
      default: '',
    },

    knowledge: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      default: '',
    },

    summary: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="scss" scoped>
.home-web-development-item {
  .name {
    display: inline-block;
    margin-bottom: -5px;
    padding: 0 1em;
    padding-bottom: 0;
    border: 2px solid white;
    border-bottom: none;
    border-radius: 4px 4px 0 0;
  }

  .summary {
    margin-top: 4px;
    font-size: 0.8em;
  }

  .ProgressBar {
    border-radius: 0 4px 4px 4px;
  }
}
</style>
