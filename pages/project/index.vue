<template>
  <div class="page-wrapper color full">
    <div class="container mx-auto">
      <h1 class="title">Projects 🎵</h1>

      <div class="container mx-auto">
        <projects-grid :projects="projects" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    ProjectsGrid: () => import('~/components/project/project-grid'),
  },

  async asyncData({ $source }) {
    return $source.resolve('/project', ({ query }) =>
      query(
        `
          query projects {
            projects: posts(type: "project") {
              id slug title excerpt link
              status: extra(path: "status")
              progress: extra(path: "progress")
              startDate: extra(path: "startDate")
              endDate: extra(path: "endDate")
              order: extra(path: "order")
              image: featuredImage {
                image(resolution: Small, format: png, transform: { resize: { width: 290, height: 290 }}) { src }
                placeholder: image(resolution: Placeholder, format: png, transform: { resize: { width: 16, height: 16 }}, output: Inline) { src }
              }
              areas: terms(taxonomy: "development-area") { id slug name order: extra(path: "order") }
            }
          }
        `,
      ),
    )
  },
}
</script>

<style lang="scss" scoped>
.page {
  padding-top: 3em;
  padding-bottom: 4em;
}
.title {
  margin-bottom: 0.5em;
  font-size: 4em;
  text-align: center;
}
</style>
