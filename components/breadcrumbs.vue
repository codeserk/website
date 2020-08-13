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
      default: () => []
    }
  }
}
</script>

<style lang="scss" scoped>
  .breadcrumbs {
    &__item {
      color: #4B5667;
      text-transform: uppercase;
      font-size: 0.75rem;
      opacity: 0.6;
      margin-right: 0.5rem;

      &::after {
        content: '/';
        padding-left: 0.5rem;
      }
      &:last-child {
        opacity: 1;

        &::after {
          content: '';
        }
      }

      &:hover, &:focus, &:active {
        opacity: 1;
      }
    }
  }
</style>
