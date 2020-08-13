<template>
  <component :is="component" class="px-mobile" v-text="text" />
</template>

<script>
import Dom from './dom'

export default {
  name: 'DomText',

  extends: Dom,

  computed: {
    component() {
      return this.tag
    }
  }
}
</script>
