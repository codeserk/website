<template>
  <div id="scene" v-if="!isLoading">
      <img id="background" :src="layers.background.src" class="layer" />
      <img id="mountain-far" :src="layers.mountainFar.src" class="layer" />
      <img id="mountains-near" :src="layers.mountainsNear.src" class="layer" />
  </div>
</template>

<script>
import Vue from 'vue'
import debounce from 'debounce'
import { lightenDarkenColor } from '../../../utils/color'

class SceneLayer {
  ready = false
  img = null
  pattern = null

  constructor(src, alignment, offset, size) {
    this.src = src
    this.alignment = alignment
    this.offset = offset
    this.size = size
  }

  async loadImage() {
    this.img = new Image()

    const promise = new Promise((resolve) => {
      this.img.onload = () => { resolve() }
    })
    this.img.src = this.src
    await promise

    this.ready = true
  }

  get widthMult () {
    if (!this.img) {
      return 1
    }

    return this.img.width / this.img.height
  }

  get heightMult() {
    if (!this.img) {
      return 1
    }

    return this.img.height / this.img.width
  }

  createPattern(ctx) {
    this.pattern = ctx.createPattern(this.img, 'repeat-x')
  }
}

export default {
  data: () => ({
    context: null,

    width: window.innerWidth,
    height: window.innerHeight,
    color: '#E39B99',
    colorAnimation: 0,

    layers: {
      background: new SceneLayer('/scene/background.png', 'bottom', 0, 100),
      moon: new SceneLayer('/scene/moon.png', 'top', 10, 10),
      cloudsFar: new SceneLayer('/scene/clouds-far.png', 'top', 0, 20),
      mountainFar: new SceneLayer('/scene/mountain-far.png', 'bottom', 5, 60),
      cloudsNear: new SceneLayer('/scene/clouds-near.png', 'bottom', 15, 10),
      mountainsNear: new SceneLayer('/scene/mountains-near.png', 'bottom', -5, 30)
    }
  }),

  computed: {
    canvas() {
      return this.$refs.canvas
    },

    layersList() {
      return Object.values(this.layers)
    },

    isLoading() {
      return false // || Object.values(this.layersList).some(layer => !layer.ready)
    }
  },

  async mounted() {
    this.context = this.$refs.canvas.getContext('2d')
    this.context.imageSmoothingEnabled = false

    await Promise.all(this.layersList.map(async (layer) => {
      await layer.loadImage()
    }))

    window.addEventListener(
      'resize',
      debounce(() => {
        // this.width = window.innerWidth
        // this.height = window.innerHeight

        // this.draw()
      }, 100)
    )

    setInterval(() => {
    //   this.draw()
    }, 1000)
  },

  methods: {
  }
}
</script>

<style lang="scss" scoped>
#scene {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: -1;
  width: 100vw;
  height: 100vh;
  image-rendering: pixelated;
}

.layer {
  position: absolute;
  background: red;
  mix-blend-mode: multiply;
}

#mountain-far {
  bottom: 15vh;
  width: 100vw;
}

#mountains-near {
  bottom: 0;
  left: 0;
  width: 100vw;
}

</style>
