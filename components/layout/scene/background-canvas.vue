<template>
  <canvas ref="canvas" :width="width" :height="height" />
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
      layer.createPattern(this.context)
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
      this.draw()
    }, 1000)
  },

  methods: {
    draw() {
      if (this.isLoading) {
        return
      }

      this.canvas.width = window.innerWidth
      this.canvas.height = window.innerHeight

      this.context.imageSmoothingEnabled = false

      for (const layer of this.layersList) {
        this.context.resetTransform()
        // this.context.fillStyle = layer.pattern
        // this.context.globalCompositeOperation = 'normal'
        // this.context.fillRect(0, 0, this.width, this.height)

        // this.context.globalCompositeOperation = 'source-atop'
        // const color = lightenDarkenColor(this.color, Math.min(0, -255 + 10 * this.colorAnimation++))
        // this.context.fillStyle = color
        // this.context.fillRect(0, 0, this.width, this.height)

        // this.context.globalCompositeOperation = 'multiply'
        let height = layer.size * this.canvas.height / 100
        let width = layer.widthMult * height
        if (width * 0.9 > this.canvas.width) {
          width = this.canvas.width
          height = layer.heightMult * width
        }

        const offset = this.canvas.height * layer.offset / 100
        let x = 0
        const y = layer.alignment === 'top' ? offset : this.canvas.height - height - offset

        while (x < this.canvas.width) {
          this.context.globalCompositeOperation = 'source-over'
          this.context.drawImage(layer.img, x, y, width, height)

          this.context.globalCompositeOperation = 'copy'
          this.context.drawImage(layer.img, x, y, width, height)

          this.context.fillStyle = this.color
          this.context.globalCompositeOperation = 'multiply'
          this.context.fillRect(x, y, width, height)

          this.context.globalCompositeOperation = 'destination-atop'
          this.context.drawImage(layer.img, x, y, width, height)

          x += width
        }
      }

      // this.context.globalCompositeOperation = 'destinatoin-over'
      // this.context.fillStyle = this.color
      // this.context.fillRect(0, 0, this.canvas.width, this.canvas.height)
    }
  }
}
</script>

<style lang="scss" scoped>
canvas {
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
</style>
