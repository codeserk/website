<template>
  <div class="icon">
    <img v-if="src" :src="src" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

const ICONS: Record<string, string> = {
  js: '/icons/js.png',
  ts: '/icons/ts.png',
  rust: '/icons/rust.png',
  java: '/icons/java.png',
  kotlin: '/icons/kotlin.png',
  swift: '/icons/swift.png',
  csharp: '/icons/csharp.png',
  cpp: '/icons/cpp.png',
  c: '/icons/c.png',
}

export default Vue.extend({
  props: {
    language: {
      type: String,
      default: '',
    },
  },

  computed: {
    src(): string | undefined {
      return ICONS[this.language]
    },
  },
})
</script>
]

<style lang="scss" scoped>
.icon {
  display: inline-block;
  overflow: hidden;
  width: 32px;
  height: 32px;
  border-radius: 50%;

  img {
    width: 32px;
    image-rendering: pixelated;
    mix-blend-mode: difference;
  }
}
</style>
