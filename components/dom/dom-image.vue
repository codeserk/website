<template>
  <image-responsive
    v-if="src"
    :alt="attributes.alt || 'Imagen de contenido'"
    :src="src"
    :placeholder="placeholder"
    :data-aos="aos"
  />
</template>

<script>
import Dom from './dom'

export default {
  name: 'DomImage',

  components: {
    ImageResponsive: () => import('~/components/image'),
  },

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
