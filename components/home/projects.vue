<template>
  <div class="home-projects container mx-auto">
    <projects-grid :projects="projects" :limit="90" />

    <div class="more-container" data-aos="fade-up">
      <nuxt-link to="/project">More projects...</nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    ProjectsGrid: () => import('~/components/project/project-grid'),
  },

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
  .projects {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  .more-container {
    margin-top: 3em;
    text-align: center;
  }
}
</style>
