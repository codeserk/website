<template>
  <page-wrapper title="Projects" header-class="centered" class="color full">
    <div class="container mx-auto">
      <projects-grid :projects="projects" />
    </div>
  </page-wrapper>
</template>

<script>
import { generateSeoMeta } from '../../utils/seo'
export default {
  components: {
    ProjectsGrid: () => import('~/components/project/project-grid'),
  },

  async asyncData({ route, $source }) {
    return $source.resolve(route.path, ({ query }) =>
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

  head() {
    return generateSeoMeta({
      path: this.$route.path,
      title: 'Projects',
      description: 'Section with all the projects.',
    })
  },
}
</script>
