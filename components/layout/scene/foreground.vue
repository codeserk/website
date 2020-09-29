<template>
  <div id="scene-foreground">
    <div
      id="trees-far"
      :style="{
        'background-color': layerColor,
        'background-image': `url('/scene/trees-far.png')`,
        '-webkit-mask-image': `url('/scene/trees-far.png')`
      }"
      class="layer layer-bottom"
    />
    <div
      id="trees-near"
      :style="{
        'background-color': layerColor,
        'background-image': `url('/scene/trees-near.png')`,
        '-webkit-mask-image': `url('/scene/trees-near.png')`
      }"
      class="layer layer-bottom"
    />
  </div>
</template>

<script>
import Vue from 'vue'
import { lightenDarkenColor } from '../../../utils/color'

const FPS = 1

export default {
  props: {
    color: {
      type: String,
      default: '#575fa2'
    },

    animated: {
      type: Boolean,
      default: true
    }
  },

  data: () => ({
    images: {
      treesFar: { src: '/scene/trees-far.png' },
      treesNear: { src: '/scene/trees-near.png' }
    }
  }),

  computed: {
    isLoading() {
      return Object.values(this.images).some(image => !image.ready)
    },

    layerColor () {
      if (this.isLoading) {
        return '#000000'
      }

      return this.color
    },

    backgroundColor () {
      if (this.isLoading) {
        return '#000000'
      }

      return lightenDarkenColor(this.color, 51)
    },

    moonColor () {
      if (this.isLoading) {
        return '#000000'
      }

      return lightenDarkenColor(this.color, 102)
    }
  },

  mounted() {
    for (const key in this.images) {
      const img = new Image()
      img.onload = () => {
        this.$nextTick(() => {
          Vue.set(this.images[key], 'ready', true)
        })
      }
      img.src = this.images[key].src
    }
  }
}
</script>

<style lang="scss" scoped>

@keyframes MovementBottom {
  0% {
    transform: translate3d(-10px, 0, 0);
  }
  100% {
    transform: translate3d(0, 0, 0);
  }
}

#scene-foreground {
  position: absolute;
  top: 100%;
  right: 0;
  left: 0;
  user-select: none;
}

.layer {
  position: absolute;
  right: 0;
  left: 0;
  background-size: contain;
  background-repeat: repeat-x;
  transition: background-color 0.4s ease-in;
  image-rendering: pixelated;
  mask-repeat: repeat-x;
  mask-size: contain;
  background-blend-mode: multiply;

  &.layer-top {
    background-position: top;
    mask-position: top;
  }
  &.layer-bottom {
    background-position: bottom;
    mask-position: bottom;
  }
}

#trees-far {
  bottom: 0;
  left: 0;
  width: calc(100vw + 20px);
  height: 30vh;
  background-position: bottom right;
  background-size: contain;
  animation: MovementBottom 4s steps(2) alternate infinite;
  mask-position: bottom right;
  mask-size: contain;
}

#trees-near {
  bottom: 0;
  left: 0;
  width: calc(100vw + 20px);
  height: 30vh;
  background-position: bottom right;
  background-size: contain;
  animation: MovementBottom 2s steps(2) alternate infinite;
  mask-position: bottom right;
  mask-size: contain;
}

</style>
