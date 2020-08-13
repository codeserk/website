<template>
  <component :is="component" v-bind="attributes" :data-aos="aos" class="px-mobile content">
    <dom v-for="(childNode, index) in children" :key="index" v-bind="{ ...childNode, aos }" />
  </component>
</template>

<script>
import Dom from './dom'

export default {
  name: 'DomDefault',

  components: {
    Dom
  },

  extends: Dom,

  computed: {
    component() {
      return this.tag
    }
  }
}
</script>
