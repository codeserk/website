<template>
  <div id="scene">
    <div :style="{
      'background-color': backgroundColor
    }"     class="scene-fixed">
      <div
        id="background"
        :style="{
          'background-color': layerColor,
          'background-image': `url('/scene/background.png')`,
          '-webkit-mask-image': `url('/scene/background.png')`,
        }"
        class="layer layyer-bottom layer-fixed"
      />
      <div
        id="moon"
        :style="{
          'background-color': moonColor,
          'background-image': `url('/scene/moon.png')`,
          '-webkit-mask-image': `url('/scene/moon.png')`,
        }"
        class="layer layer-top layer-fixed"
      />
      <div
        id="clouds-far"
        :style="{
          'background-color': layerColor,
          'background-image': `url('/scene/clouds-far.png')`,
          '-webkit-mask-image': `url('/scene/clouds-far.png')`,
          'background-position': `top left ${positions.cloudsFar}px`,
          '-webkit-mask-position': `top left ${positions.cloudsFar}px`
        }"
        class="layer layer-top layer-fixed"
      />

      <div
        id="mountain-far-cover"
        :style="{
          'background-color': layerColor,
          'background-image': `url('/scene/mountain-far-cover.png')`,
        }"
        class="layer layer-bottom layer-fixed"
      />
      <div
        id="mountain-far"
        :style="{
          'background-color': layerColor,
          'background-image': `url('/scene/mountain-far.png')`,
          '-webkit-mask-image': `url('/scene/mountain-far.png')`,
          'background-position': `bottom left ${positions.mountainFar}px`,
          '-webkit-mask-position': `bottom left ${positions.mountainFar}px`
        }"
        class="layer layer-bottom layer-fixed"
      />

      <div
        id="clouds-near"
        :style="{
          'background-color': layerColor,
          'background-image': `url('/scene/clouds-near.png')`,
          '-webkit-mask-image': `url('/scene/clouds-near.png')`,
          'background-position': `bottom left ${positions.cloudsNear}px`,
          '-webkit-mask-position': `bottom left ${positions.cloudsNear}px`
        }"
        class="layer layer-bottom layer-fixed"
      />

      <div
        id="mountains-near"
        :style="{
          'background-color': layerColor,
          'background-image': `url('/scene/mountains-near.png')`,
          '-webkit-mask-image': `url('/scene/mountains-near.png')`,
          'background-position': `bottom left ${positions.mountainsNear}px`,
          '-webkit-mask-position': `bottom left ${positions.mountainsNear}px`
        }"
        class="layer layer-bottom layer-fixed"
      />
    </div>
    <div class="scene-absolute">
      <div
        id="trees-far"
        :style="{
          'background-color': layerColor,
          'background-image': `url('/scene/trees-far.png')`,
          '-webkit-mask-image': `url('/scene/trees-far.png')`,
          'background-position': `bottom left ${positions.treesFar}px`,
          '-webkit-mask-position': `bottom left ${positions.treesFar}px`
        }"
        class="layer layer-bottom"
      />
      <div
        id="trees-near"
        :style="{
          'background-color': layerColor,
          'background-image': `url('/scene/trees-near.png')`,
          '-webkit-mask-image': `url('/scene/trees-near.png')`,
          'background-position': `bottom left ${positions.treesNear}px`,
          '-webkit-mask-position': `bottom left ${positions.treesNear}px`
        }"
        class="layer layer-bottom"
      />
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import debounce from 'debounce'
import { lightenDarkenColor } from '../../utils/color'

const FPS = 1

export default {
  props: {
    color: {
      type: String,
      default: '#575fa2'
    }
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
      treesNear: { src: '/scene/trees-near.png' }
    },

    tick: 0
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
    },

    // Positions
    positions() {
      return {
        cloudsFar: this.frame * 0.2,
        cloudsNear: this.frame * 1,
        mountainFar: this.frame * -0.1,
        mountainsNear: this.frame * -0.25,
        treesFar: this.frame * -0.5,
        treesNear: this.frame * -1
      }
    },

    frame () {
      return this.tick * 2 / FPS
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

    setInterval(() => {
      if (window.scrollY < 100) {
        this.$nextTick(() => {
          this.tick++
        })
      }
    }, 1000 / FPS)
  }
}
</script>

<style lang="scss">
#scene {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  user-select: none;
  transition: background 0.4s ease-in;

  .scene-fixed {
    .layer {
      background-attachment: scroll, scroll, fixed;
    }
  }
  .scene-absolute {
    // position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
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

  &.layer-fixed {
    // position: fixed;
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
  right: 0;
  left: 0;
  height: 20vh;
  background-size: contain;
  mask-size: contain;
}
#clouds-near {
  right: 0;
  bottom: 20vh;
  left: 0;
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
  bottom: 0;
  height: 15vh;
  background-repeat: repeat;
  mask-repeat: repeat;
}

@media (max-width: theme("screens.sm")) {
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
  right: 0;
  bottom: 0;
  left: 0;
  height: 30vh;
  background-position: bottom right;
  background-size: contain;
  mask-position: bottom right;
  mask-size: contain;
}

#trees-near {
  right: 0;
  bottom: 0;
  left: 0;
  height: 30vh;
  background-position: bottom right;
  background-size: contain;
  mask-position: bottom right;
  mask-size: contain;
}
</style>
