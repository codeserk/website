<template>
  <component v-if="text" :is="component" v-text="transformedText" v-bind="attributes" class="dom-text" />
</template>

<script>
import Dom from './dom'

const TRANSFORMATIONS = [
  { regex: /\/shrug/g, value: `¯\\_(ツ)_/¯` },
  { regex: /-->/g, value: '→' },
]

export default {
  name: 'DomText',

  extends: Dom,

  computed: {
    component() {
      return this.tag
    },

    transformedText() {
      let text = this.text
      if (!this.text || typeof this.text !== 'string') {
        return this.text
      }

      for (const transformation of TRANSFORMATIONS) {
        text = text.replace(transformation.regex, transformation.value)
      }

      return text
    },
  },
}
</script>
