<template>
  <subtitle :id="id" :title="text" :tag="tag" v-bind="attributes" class="dom-subtitle" />
</template>

<script>
import { removeSpecialCharacters } from '../../utils/string'
import Dom from './dom'

export default {
  name: 'DomSubtitle',

  components: {
    Subtitle: () => import('~/components/subtitle'),
  },

  extends: Dom,

  computed: {
    id() {
      return removeSpecialCharacters(this.text.toLowerCase().replace(/ /g, '-'))
    },
  },
}
</script>
