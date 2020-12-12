<template>
  <img v-lazy="{ src: src, loading: placeholder }" data-aos="appear" class="image lazy" />
</template>

<script>
import Dom from './dom'

export default {
  name: 'DomImage',

  extends: Dom,

  computed: {
    src() {
      return this.attributes.srcLarge ? this.attributes.srcLarge.src || this.attributes.src : this.attributes.src
    },

    placeholder() {
      return this.attributes.srcPlaceholder ? this.attributes.srcPlaceholder.src : undefined
    },
  },
}
</script>

<style lang="scss">
.image {
  width: 100%;
}
</style>
