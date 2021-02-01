<template>
  <page-wrapper title="Challenges <>" class="color full">
    <div class="container mx-auto">
      <div v-for="source in sources" :key="source.id" class="challenge-source">
        <div class="content small">
          <router-link :to="`/challenge${source.link}`"><h2 v-text="source.name"/></router-link>
        </div>
        <challenge-grid :challenges="source.challenges" />
      </div>
    </div>
  </page-wrapper>
</template>

<script>
import { generateSeoMeta } from '../../utils/seo'
export default {
  components: {
    ChallengeGrid: () => import('~/components/card/challenge-grid'),
  },

  async asyncData({ route, $source }) {
    return $source.resolve(route.path, ({ query }) =>
      query(
        `
          query challenges {
            sources: terms(taxonomy: "challenge-source") {
              id name dom link

              challenges: posts(sort: { path: "createdAt", direction: Descending }) {
                id slug title link
                order: extra(path: "order")
              }
            }
          }
        `,
      ),
    )
  },

  head() {
    return generateSeoMeta({
      path: this.$route.path,
      title: 'Code Challenges',
      description: 'Section with all the code challenges.',
    })
  },
}
</script>
