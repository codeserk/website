<template>
  <chip v-if="term" :slug="term.slug" :text="text || term.name" :type="term.type" />
</template>

<script>
export default {
  components: {
    chip: () => import('~/components/chip'),
  },

  props: {
    id: {
      type: String,
      default: '',
    },

    text: {
      type: String,
      default: '',
    },
  },

  computed: {
    term() {
      return this.getTerm(this.id)
    },
  },
}
</script>
