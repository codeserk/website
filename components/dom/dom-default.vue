<template>
  <component :is="component" v-bind="attributes" :data-aos="level === 1 ? aos : undefined" class="dom-default">
    <dom v-for="(childNode, index) in filteredChildren" :key="index" v-bind="{ ...childNode }" :level="level + 1" />
  </component>
</template>

<script>
import Dom from './dom'

export default {
  name: 'DomDefault',

  components: {
    Dom,
  },

  extends: Dom,

  computed: {
    component() {
      return this.tag
    },

    filteredChildren() {
      if (!this.maxParagraphs) {
        return this.children
      }

      return this.children.slice(0, this.maxParagraphs)
    },
  },
}
</script>
