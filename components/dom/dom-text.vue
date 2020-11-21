<template>
  <component v-if="text" :is="component" v-text="text" v-bind="attributes" class="dom-text" />
</template>

<script>
import Dom from './dom'

export default {
  name: 'DomText',

  extends: Dom,

  computed: {
    component() {
      return this.tag
    },
  },
}
</script>
