<template>
  <div class="page-wrapper color main full content">
    <div class="container mx-auto">
      <h1 class="title">(╯°□°)╯︵ ┻━┻</h1>

      <div class="content">
        <p v-if="error.code === 404" v-text="errors[404]" class="text-center mt-20" />
        <p v-else v-text="errors.default" class="text-center mt-20" />

        <p class="text-right"><router-link to="/">...come back Home</router-link></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default: () => ({}),
    },
  },

  data: () => ({
    errors: {
      404: "The page you are looking for doesn't exist or an error ocurred.",
      default: "The page you are looking for doesn't exist or an error ocurred.",
    },
  }),
}
</script>

<style lang="scss" scoped>
.page-wrapper {
  display: flex;
  align-items: center;
  min-height: 100vh;
}
.title {
  margin-bottom: 0.5em;
  font-size: 5em;
  text-align: center;
}

.content {
  p {
    font-size: 2em;
  }
}
</style>
