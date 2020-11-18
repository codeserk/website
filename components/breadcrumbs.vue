<template>
  <nav class="px-mobile breadcrumbs">
    <router-link v-for="link in breadcrumbs" :key="link.link" :to="link.link" class="breadcrumbs__item">
      {{ link.name }}
    </router-link>
  </nav>
</template>

<script>
export default {
  props: {
    breadcrumbs: {
      type: Array,
      default: () => [],
    },
  },
}
</script>

<style lang="scss" scoped>
.breadcrumbs {
  &__item {
    margin-right: 0.5rem;
    color: white;
    text-transform: uppercase;

    &::after {
      content: '/';
      padding-left: 0.5rem;
    }

    &:hover,
    &:focus,
    &:active {
      opacity: 1;
    }
  }
}
</style>
