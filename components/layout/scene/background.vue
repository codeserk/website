<template>
  <vue100vh
    id="scene-background"
    :class="{ 'scene-background--animated': animated }"
    :style="{ 'background-color': backgroundColor }"
    :css="{ height: '100rvh' }"
  >
    <div
      id="background"
      :style="{
        'background-image': `url('/scene/background.png')`,
        '-webkit-mask-image': `url('/scene/background.png')`,
        'mask-image': `url('/scene/background.png')`,
        'background-color': backgroundColor,
      }"
      class="layer layer-bottom layer-fixed"
    />
    <div
      id="moon"
      :style="{
        'background-image': `url('/scene/moon.png')`,
        '-webkit-mask-image': `url('/scene/moon.png')`,
        'mask-image': `url('/scene/moon.png')`,
        'background-color': moonColor,
      }"
      class="layer layer-top layer-fixed"
    />
    <div
      id="clouds-far"
      :style="{
        'background-image': `url('/scene/clouds-far.png')`,
        '-webkit-mask-image': `url('/scene/clouds-far.png')`,
        'mask-image': `url('/scene/clouds-far.png')`,
        'background-color': layerColor,
        transform: `translate3d(${positions.cloudsFar}px, 0px, 0px)`,
      }"
      class="layer layer-top layer-fixed"
    />

    <div
      id="mountain-far-cover"
      :style="{
        'background-image': `url('/scene/mountain-far-cover.png')`,
        '-webkit-mask-image': `url('/scene/mountain-far-cover.png')`,
        'mask-image': `url('/scene/mountain-far-cover.png')`,
        'background-color': layerColor,
      }"
      class="layer layer-bottom layer-fixed"
    />
    <div
      id="mountain-far"
      :style="{
        'background-image': `url('/scene/mountain-far.png')`,
        '-webkit-mask-image': `url('/scene/mountain-far.png')`,
        'mask-image': `url('/scene/mountain-far.png')`,
        'background-color': layerColor,
      }"
      class="layer layer-bottom layer-fixed"
    />

    <div
      id="clouds-near"
      :style="{
        'background-image': `url('/scene/clouds-near.png')`,
        '-webkit-mask-image': `url('/scene/clouds-near.png')`,
        'mask-image': `url('/scene/clouds-near.png')`,
        'background-color': layerColor,
        transform: `translate3d(${positions.cloudsNear}px, 0px, 0px)`,
      }"
      class="layer layer-bottom layer-fixed"
    />

    <div
      id="mountains-near"
      :style="{
        'background-image': `url('/scene/mountains-near.png')`,
        '-webkit-mask-image': `url('/scene/mountains-near.png')`,
        'mask-image': `url('/scene/mountains-near.png')`,
        'background-color': layerColor,
      }"
      class="layer layer-bottom layer-fixed"
    />
    <div
      id="trees-far"
      :style="{
        'background-color': layerColor,
        'background-image': `url('/scene/trees-far.png')`,
        '-webkit-mask-image': `url('/scene/trees-far.png')`,
        transform: `translate3d(${positions.treesFar}px, 0px, 0px)`,
      }"
      class="layer layer-bottom"
    />
    <div
      id="trees-near"
      :style="{
        'background-color': layerColor,
        'background-image': `url('/scene/trees-near.png')`,
        '-webkit-mask-image': `url('/scene/trees-near.png')`,
        transform: `translate3d(${positions.treesNear}px, 0px, 0px)`,
      }"
      class="layer layer-bottom"
    />
  </vue100vh>
</template>

<script>
import Vue from 'vue'
import { lightenDarkenColor } from '../../../utils/color'

const FPS = 1

export default {
  props: {
    color: {
      type: String,
      default: '#575fa2', // '#AA6B8C' //  '#575fa2'
    },

    animated: {
      type: Boolean,
      default: true,
    },
  },

  data: () => ({
    images: {
      background: { src: '/scene/background.png' },
      moon: { src: '/scene/moon.png' },
      cloudsFar: { src: '/scene/clouds-far.png' },
      cloudsNear: { src: '/scene/clouds-near.png' },
      mountainFar: { src: '/scene/mountain-far.png' },
      mountainsNear: { src: '/scene/mountains-near.png' },
      treesFar: { src: '/scene/trees-far.png' },
      treesNear: { src: '/scene/trees-near.png' },
    },

    treesFarMult: Math.PI / 8,
    treesNearMult: Math.PI / 2,

    tick: 0,
  }),

  computed: {
    isLoading() {
      return Object.values(this.images).some(image => !image.ready)
    },

    layerColor() {
      if (this.isLoading) {
        return '#000000'
      }

      return this.color
    },

    backgroundColor() {
      if (this.isLoading) {
        return '#000000'
      }

      return lightenDarkenColor(this.color, 51)
    },

    moonColor() {
      if (this.isLoading) {
        return '#000000'
      }

      return lightenDarkenColor(this.color, 102)
    },

    // Positions
    positions() {
      return {
        cloudsFar: (this.frame * 1) % window.innerWidth,
        cloudsNear: (this.frame * 3) % window.innerWidth,
        treesFar: Math.cos(this.frame * this.treesFarMult) * 4,
        treesNear: Math.cos(this.frame * this.treesNearMult),
      }
    },

    frame() {
      return (this.tick * 2) / FPS
    },
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

    setInterval(() => {
      this.tick++
    }, 1000 / FPS)
  },
}
</script>

<style lang="scss" scoped>
#scene-background {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: -1;
  user-select: none;
  transition: background 0.4s ease-in;
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

#background {
  bottom: 10vh;
  height: 70vh;
  max-height: 60vw;
}

#moon {
  top: 5vw;
  right: 5vw;
  height: 20vh;
  background-position: top right;
  background-repeat: no-repeat;
  mask-repeat: no-repeat;
  mask-position: top right;
}

#clouds-far {
  top: 0;
  left: -100vw;
  width: 200vw;
  height: 20vh;
  background-size: contain;
  mask-size: contain;
}
#clouds-near {
  bottom: 20vh;
  left: -100vw;
  width: 200vw;
  height: 20vh;
  background-size: contain;
  mask-size: contain;
}

#mountain-far {
  right: 0;
  bottom: 14vh;
  left: 0;
  height: 60vh;
  background-position: bottom right;
  background-size: contain;
  mask-position: bottom right;
  mask-size: contain;
}
#mountain-far-cover {
  right: 0;
  bottom: 0;
  left: 0;
  height: 15vh;
  background-repeat: repeat;
  mask-repeat: repeat;
}

@media (max-width: theme('screens.sm')) {
  #background {
    bottom: 0;
  }
  #mountain-far {
    bottom: 10vh;
  }
  #mountain-far-cover {
    height: 11vh;
  }
  #clouds-near {
    bottom: 12vh;
    height: 10vh;
  }
}

#mountains-near {
  right: 0;
  bottom: 0;
  left: 0;
  height: 40vh;
  background-position: bottom right;
  background-size: contain;
  mask-position: bottom right;
  mask-size: contain;
}

#trees-far {
  bottom: 0;
  left: 0;
  width: calc(100vw + 20px);
  height: 30vh;
  background-position: bottom right;
  background-size: contain;
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
  mask-position: bottom right;
  mask-size: contain;
}
</style>
