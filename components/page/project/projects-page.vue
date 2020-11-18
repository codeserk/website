<template>
  <page-wrapper :title="title" :breadcrumbs="breadcrumbs" :image="image" header-class="centered" class="color full">
    <div class="container mx-auto">
      <projects-grid :projects="filteredProjects" />
    </div>
  </page-wrapper>
</template>

<script>
export default {
  components: {
    PageWrapper: () => import('~/components/page/wrapper'),
    ProjectsGrid: () => import('~/components/project/project-grid'),
  },

  props: {
    area: {
      type: Object,
      default: () => null,
    },

    projects: {
      type: Array,
      default: () => [],
    },
  },

  computed: {
    title() {
      return this.area?.name ?? 'Projects 🎵'
    },

    image() {
      return this.area?.image
    },

    breadcrumbs() {
      if (!this.area) {
        return []
      }

      return [{ name: 'Projects', link: '/project' }]
    },

    filteredProjects() {
      if (!this.area) {
        return this.projects
      }

      return this.area.projects
    },
  },
}
</script>

<style lang="scss" scoped>
.page {
  padding-top: 3em;
  padding-bottom: 4em;
}
</style>
