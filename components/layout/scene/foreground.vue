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
    transform: translate3d(0px, 0, 0);
  }
}

#scene-foreground {
  user-select: none;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
}

.layer {
  image-rendering: pixelated;
  background-repeat: repeat-x;
  mask-repeat: repeat-x;
  background-size: contain;
  mask-size: contain;
  background-blend-mode: multiply;
  position: absolute;
  transition: background-color 0.4s ease-in;
  left: 0;
  right: 0;

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
  height: 30vh;
  bottom: 0;
  background-position: bottom right;
  mask-position: bottom right;
  background-size: contain;
  mask-size: contain;
  left: 0px;
  width: calc(100vw + 20px);
  animation: MovementBottom 4s steps(2) alternate infinite;
}

#trees-near {
  height: 30vh;
  bottom: 0;
  background-position: bottom right;
  mask-position: bottom right;
  background-size: contain;
  mask-size: contain;
  left: 0px;
  width: calc(100vw + 20px);
  animation: MovementBottom 2s steps(2) alternate infinite;
}

</style>
