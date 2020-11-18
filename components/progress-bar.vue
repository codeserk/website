<template>
  <div class="ProgressBar">
    <div :style="{ width: `${progress}%` }" class="bar" data-aos="scale-x" />
    <span v-text="text" class="text" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    progress: {
      type: Number,
      default: 0,
    },

    text: {
      type: String,
      default: '',
    },
  },
})
</script>

<style lang="scss" scoped>
.ProgressBar {
  position: relative;
  height: 2rem;
  border: 4px solid white;
  border-radius: 4px;
  background: black;
  transition: transform 0.4s ease-in-out;

  .bar {
    position: absolute;
    top: -1px;
    bottom: -1px;
    background: white;
  }

  .text {
    position: absolute;
    top: -0.25rem;
    right: 0;
    left: 0;
    line-height: 2rem;
    text-align: center;
    text-transform: uppercase;
    mix-blend-mode: difference;
  }
}
</style>
