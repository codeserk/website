<template>
  <page-wrapper :title="term.name" :breadcrumbs="breadcrumbs" :image="term.image" class="color full">
    <div class="container mx-auto">
      <div class="block with-small-padding small with-shadow-left skew">
        <p v-text="term.summary" />

        <template v-if="term.description">
          <hr />
          <dom-content v-bind="term.dom" aos="appear" />
        </template>
      </div>

      <section v-if="term.articles.length > 0">
        <router-link class="heading" to="/blog"><h2>Articles</h2></router-link>
        <article-grid :articles="term.articles" />
      </section>

      <section v-if="term.career.length > 0">
        <router-link class="heading" to="/career"><h2>Career</h2></router-link>
        <career :career="term.career" />
      </section>

      <section v-if="term.projects.length > 0">
        <router-link class="heading" to="/project"><h2>Projects</h2></router-link>
        <project-grid :projects="term.projects" />
      </section>
    </div>

    <slot />
  </page-wrapper>
</template>

<script>
export default {
  components: {
    PageWrapper: () => import('~/components/page/wrapper'),
    Career: () => import('~/components/home/career'),
    ProjectGrid: () => import('~/components/project/project-grid'),
    ArticleGrid: () => import('~/components/card/article-grid'),
    DomContent: () => import('~/components/dom/dom-content'),
  },

  props: {
    breadcrumbs: {
      type: Array,
      default: () => [],
    },

    term: {
      type: Object,
      default: () => ({}),
    },
  },
}
</script>
