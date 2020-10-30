<template>
  <div class="home-projects container mx-auto">
    <div v-for="project in projects" :key="project.id" class="block with-shadow-left">
      <h3 v-text="project.title" class="title" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    projects: {
      type: Array,
      default: () => [],
    },
  },
}
</script>

<style lang="scss" scoped>
.home-projects {
  text-align: center;

  &::-webkit-scrollbar {
    display: none;
  }

  .block {
    display: inline-block;
    width: 300px;
    height: 300px;
    margin: 1em;
  }
}
</style>
