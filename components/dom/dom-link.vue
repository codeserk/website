<template>
  <a :href="link" :target="target" class="px-mobile underline" v-text="text" />
</template>

<script>
import { parseLink } from '../../utils/link'
import Dom from './dom'

export default {
  name: 'DomLink',

  extends: Dom,

  computed: {
    component() {
      return this.tag
    },

    link() {
      return parseLink(this.attributes.href)
    },

    target() {
      if (this.attributes && this.attributes.href && this.attributes.href.startsWith('#')) {
        return undefined
      }

      return '__blank'
    }
  }
}
</script>
