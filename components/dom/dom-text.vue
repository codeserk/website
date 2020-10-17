<template>
  <component :is="component" v-text="text" class="px-mobile" />
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
