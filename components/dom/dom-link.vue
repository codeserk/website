<template>
  <span>
    <router-link v-if="isInternal" :to="link" v-text="text" v-bind="attributes" class="dom-link underline" />
    <a v-else :href="link" v-text="text" v-bind="attributes" target="__blank" class="dom-link underline" />
  </span>
</template>

<script>
import { parseLink } from '../../utils/link'
import Dom from './dom'

export default {
  name: 'DomLink',

  extends: Dom,

  computed: {
    isInternal() {
      return !this.link?.startsWith('http')
    },

    link() {
      return parseLink(this.attributes.href)
    },
  },
}
</script>
