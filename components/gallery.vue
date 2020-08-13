<template>
  <div class="gallery relative">
    <div
      ref="slider"
      @mousedown="startScrolling('primary')"
      @mouseleave="stopScrolling('primary')"
      @mouseup="stopScrolling('primary')"
      @mousemove="event => scrollSlider('primary', event)"
      @scroll="onPrimaryScrolled"
      class="slider relative"
    >
      <div
        v-for="(item, index) in images"
        :key="index"
        :style="{ 'background-image': `url(${item.src})` }"
        :class="{ 'slider-item--ready': imageReady[item.id] }"
        @click="zoomImage(index)"
        class="slider-item"
      >
        <div class="slider-item-overlay"></div>
      </div>
    </div>

    <div
      ref="secondary"
      v-if="withSecondary && images.length > 1"
      @mousedown="startScrolling('secondary')"
      @mouseleave="stopScrolling('secondary')"
      @mouseup="stopScrolling('secondary')"
      @mousemove="event => scrollSlider('secondary', event)"
      class="secondary hidden sm:flex w:1/2 md:1/3"
    >
      <div
        v-for="(item, index) in slicedGallery"
        :key="index"
        :style="{ 'background-image': `url(${item.thumbnail})` }"
        :class="{ 'figure--ready': imageReady[item.id] }"
        @click="scrollPrimaryTo((index + 1) % images.length)"
        class="figure"
      >
        <div class="figure-overlay"></div>
      </div>
    </div>

    <div class="primary-dots absolute left-0 bottom-0 p-5 flex flex-horizontal sm:hidden">
      <div
        v-for="(item, index) in images"
        :key="item.id"
        :class="{ 'bg-white': current === index }"
        @click="scrollPrimaryTo(index)"
        class="dot mx-2 p-1 border rounded cursor-pointer"
      />
    </div>

    <client-only>
      <div ref="photoSwipe" class="pswp" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="pswp__bg" />

        <div class="pswp__scroll-wrap">
          <div class="pswp__container">
            <div class="pswp__item" />
            <div class="pswp__item" />
            <div class="pswp__item" />
          </div>
          <div class="pswp__ui pswp__ui--hidden">
            <div class="pswp__top-bar">
              <div class="pswp__counter" />
              <button class="pswp__button pswp__button--close" title="Close (Esc)" />

              <button class="pswp__button pswp__button--zoom" title="Zoom in/out" />
              <div class="pswp__preloader">
                <div class="pswp__preloader__icn">
                  <div class="pswp__preloader__cut">
                    <div class="pswp__preloader__donut" />
                  </div>
                </div>
              </div>
            </div>
            <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
              <div class="pswp__share-tooltip" />
            </div>

            <div class="pswp__caption">
              <div class="pswp__caption__center" />
            </div>
          </div>
        </div>
      </div>
    </client-only>
  </div>
</template>

<script scoped>
import Vue from 'vue'
import PhotoSwipe from 'photoswipe/dist/photoswipe'
import PhotoSwipeUIDefault from 'photoswipe/dist/photoswipe-ui-default'
import debounce from 'debounce'

export default {
  props: {
    images: {
      type: Array,
      default: () => []
    },

    withSecondary: {
      type: Boolean,
      default: false
    }
  },

  data: () => ({
    current: 0,
    imageReady: {},

    scroll: {
      primary: {
        scrolling: false,
        el: 'slider',
        scrolled: 0,
        x: null,
        left: null
      },
      secondary: {
        scrolling: false,
        scrolled: 0,
        el: 'secondary',
        x: null,
        left: null
      }
    },

    photoSwipe: null
  }),

  computed: {
    slicedGallery() {
      const result = [...this.images].slice(1)
      result.push(this.images[0])

      return result
    },

    primaryImageWidth() {
      if (!this.$refs.slider || this.$refs.slider.children.length === 0) {
        return 0
      }

      return this.$refs.slider.children[0].clientWidth
    },

    secondaryImageWidth() {
      if (!this.$refs.secondary || this.$refs.secondary.children.length === 0) {
        return 0
      }

      return this.$refs.secondary.children[0].clientWidth
    }
  },

  mounted() {
    const self = this
    window.addEventListener(
      'resize',
      debounce(() => {
        self.scrollPrimaryTo(self.current)
      }, 200)
    )

    this.initImages()
  },

  destroyed() {
    window.removeEventListener(
      'resize',
      debounce(() => {
        self.scrollPrimaryTo(self.current)
      }, 200)
    )
  },

  methods: {
    initImages() {
      for (const image of this.images) {
        Vue.set(this.imageReady, image.id, false)

        const img = new Image()
        img.onload = () => {
          this.$nextTick(() => {
            Vue.set(this.imageReady, image.id, true)
          })
        }
        img.src = image.src
      }
    },

    onPrimaryScrolled: debounce(function() {
      this.current = Math.floor(this.$refs.slider.scrollLeft / this.$refs.slider.clientWidth)

      this.$nextTick(() => {
        this.scrollSecondaryTo(this.current === this.images.length - 1 ? 0 : this.current)
      })
    }, 100),

    zoomImage(index) {
      if (Math.abs(this.scroll.primary.scrolled) > 100) {
        return
      }

      const self = this
      this.photoSwipe = new PhotoSwipe(
        this.$refs.photoSwipe,
        PhotoSwipeUIDefault,
        this.images.map(image => ({
          src: image.large,
          msrc: image.src,
          w: 1200,
          h: 1200,
          title: image.title
        })),
        {
          index,
          history: false,
          closeOnScroll: false,
          bgOpacity: 0.9,
          getThumbBoundsFn() {
            const image = self.$refs.slider.childNodes[self.photoSwipe.getCurrentIndex()]
            const pageYScroll = window.pageYOffset || document.documentElement.scrollTop
            const imageRect = image.getBoundingClientRect()

            return {
              x: imageRect.left,
              y: imageRect.top + pageYScroll,
              w: imageRect.width
            }
          }
        }
      )
      this.photoSwipe.init()
      this.photoSwipe.listen('beforeChange', () => {
        self.scrollPrimaryTo(this.photoSwipe.getCurrentIndex())
      })
    },

    scrollPrimaryTo(index) {
      if (!this.$refs.slider) {
        return
      }

      this.$refs.slider.scrollTo(index * this.primaryImageWidth, 0)
    },

    scrollSecondaryTo(index) {
      this.$refs.secondary.scrollTo(index * this.secondaryImageWidth, 0)
    },

    startScrolling(key) {
      this.scroll[key].scrolled = 0
      this.scroll[key].scrolling = true

      this.scroll[key].x = event.pageX - this.$refs[this.scroll[key].el].offsetLeft
      this.scroll[key].left = this.$refs[this.scroll[key].el].scrollLeft
    },

    stopScrolling(key) {
      this.scroll[key].scrolling = false
    },

    scrollSlider(key, event) {
      if (!this.scroll[key].scrolling) {
        return
      }

      event.preventDefault()
      const x = event.pageX - this.$refs[this.scroll[key].el].offsetLeft
      const walk = (x - this.scroll[key].x) * 2
      this.scroll[key].scrolled += walk

      this.$refs[this.scroll[key].el].scrollLeft = this.scroll[key].left - walk
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/css/variables';
@import '~/assets/css/colors';

.slider {
  display: flex;
  align-items: center;
  background: $color-background;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;

  .slider-item {
    position: relative;
    flex-shrink: 0;
    flex: 1;
    min-width: 100%;
    height: 100%;
    scroll-snap-align: start;
    background: $color-background;
    padding-bottom: 100%;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;

    .slider-item-overlay {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background: $color-background;
      transition: opacity 0.4s ease-in-out;
      opacity: 1;
    }

    &--ready {
      .slider-item-overlay {
        opacity: 0;
      }
    }
  }
}

.slider::-webkit-scrollbar,
.secondary::-webkit-scrollbar {
  display: none;
}

.secondary {
  align-items: center;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  justify-content: space-between;

  .figure {
    background: $color-background;
    flex: 1;
    min-width: calc(50% - 1px);
    height: 100%;
    flex-shrink: 0;
    margin: 4px 2px;
    scroll-snap-align: start;
    padding-bottom: calc(50% - 1px);
    position: relative;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;

    &:first-child {
      margin-left: 0px;
    }
    &:last-child {
      margin-right: 0px;
    }

    @media (min-width: 1024px) {
      min-width: calc(33.33333% - 1px);
      padding-bottom: calc(33.33333% - 1px);
    }
    .figure-overlay {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background: $color-background;
      transition: opacity 0.4s ease-in-out;
      opacity: 0.8;
    }

    &--ready {
      .figure-overlay {
        opacity: 0;
      }
    }
  }
}

.primary-dots .dot {
  transition: background 0.4s ease-in-out;
}
</style>
