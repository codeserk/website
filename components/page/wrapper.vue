<template>
  <article class="page-wrapper">
    <page-header :breadcrumbs="breadcrumbsWithHome" v-bind="$props" :class="headerClass" />

    <slot />
  </article>
</template>

<script>
export default {
  components: {
    PageHeader: () => import('~/components/page/header'),
  },

  props: {
    headerClass: {
      type: String,
      default: '',
    },

    title: {
      type: String,
      default: '',
    },

    image: {
      type: Object,
      default: () => null,
    },

    breadcrumbs: {
      type: Array,
      default: () => [],
    },
  },

  computed: {
    breadcrumbsWithHome() {
      return [{ name: 'Codeserk', link: '/' }, ...this.breadcrumbs]
    },
  },
}
</script>

<style lang="scss" scoped>
.heading {
  display: block;
  margin-bottom: 0.5em;
  font-size: 4rem;
  text-align: center;
}

hr {
  margin: 1em 0;
}

section {
  margin: 6em 0;
}
</style>
