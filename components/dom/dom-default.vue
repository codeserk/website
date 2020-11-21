<template>
  <component :is="component" v-bind="attributes" :data-aos="aos" class="dom-default">
    <dom v-for="(childNode, index) in children" :key="index" v-bind="{ ...childNode }" />
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
  },

  mounted() {
    console.log(this.component, this.attributes)
  },
}
</script>
