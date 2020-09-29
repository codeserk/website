<template>
  <div class="page main overflow-hidden content">
    <div class="container mx-auto">
      <h1 class="title">¯\_(ツ)_/¯</h1>

      <p v-if="error.code === 404" v-text="errors[404]" class="text-center mt-20"/>
      <p v-else v-text="errors.default" class="text-center mt-20"/>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default: () => ({})
    }
  },

  data: () => ({
    errors: {
      404: 'The page you are looking for doesn\'t exist or an error ocurrred.',
      default: 'The page you are looking for doesn\'t exist or an error ocurrred.'
    }
  })
}
</script>

<style lang="scss" scoped>
.page {
  display: flex;
  align-items: center;
  min-height: 100vh;
  padding-top: 3em;
  padding-bottom: 4em;
}
.title {
  margin-bottom: 0.5em;
  font-size: 4em;
  text-align: center;
}
</style>
