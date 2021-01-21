<template>
  <client-only>
    <pre v-bind="attributes" :class="[codeClass, { active: isActive }]" class="dom-code">
      <code v-text="content" :class="codeClass" />
    </pre>
  </client-only>
</template>

<script>
import * as prism from 'prismjs'
import Dom from './dom'

const CLASS_REGEX = /^<code class="([^"]*)"/

export default {
  name: 'DomCode',

  extends: Dom,

  data: () => ({
    isActive: false,
  }),

  computed: {
    codeClass() {
      const result = CLASS_REGEX.exec(this.text)
      if (result && result[1]) {
        return result[1].trim()
      }

      return ''
    },

    content() {
      return this.text
        .replace(/^<code[^>]+>/, '')
        .replace(/<\/code>$/, '')
        .trim()
    },
  },

  mounted() {
    setTimeout(() => {
      prism.highlightAll()

      this.isActive = true
    }, 200)
  },
}
</script>

<style lang="scss" scoped>
.dom-code {
  font-size: 16px;
  opacity: 0;
  transition: opacity 0.4s ease-in-out;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none;
  }

  &.active {
    opacity: 1;
  }

  .block.with-padding & {
    margin: 3em -32px 2em -32px;
  }
  .block.with-small-padding & {
    margin: 3em -24px 2em -24px;
  }

  .block.skew & {
    transform: skewY(2deg);
    transform-origin: top right;
  }
}
</style>
