<template>
  <page-wrapper :title="post.title" :breadcrumbs="post.parent.breadcrumbs" :image="post.image" class="color full">
    <div class="container mx-auto">
      <div class="block small with-padding with-shadow-left skew content">
        <dom-content v-bind="post.dom" class="mx-auto" aos="appear" />
      </div>
    </div>
  </page-wrapper>
</template>

<script>
export default {
  components: {
    DomContent: () => import('~/components/dom/dom-content'),
  },

  props: {
    post: { type: Object, default: () => ({}) },
  },
}
</script>
