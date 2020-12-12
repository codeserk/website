<template>
  <div class="gallery relative">
    <div
      ref="slider"
      @mousedown="startScrolling('primary')"
      @mouseleave="stopScrolling('primary')"
      @mouseup="stopScrolling('primary')"
      @mousemove="event => scrollSlider('primary', event)"
      @scroll="onPrimaryScrolled"
      class="slider"
    >
      <div v-for="(item, index) in images" :key="index" @click="zoomImage(index)" class="slider-item">
        <img v-lazy="{ src: item.src, loading: item.placeholder }" class="lazy" />
      </div>
    </div>

    <div v-if="withSecondary && imagesLeft.length > 0" class="menu menu-left">
      <div
        v-for="(item, index) in imagesLeft"
        :key="index"
        @click="scrollPrimaryTo(index * 2)"
        :class="{ 'is-active': current === index * 2 }"
        class="menu-item"
      >
        <img v-lazy="{ src: item.thumbnail, loading: item.thumbnailPlaceholder }" class="lazy bordered" />
      </div>
    </div>
    <div v-if="withSecondary && imagesRight.length > 0" class="menu menu-right">
      <div
        v-for="(item, index) in imagesRight"
        :key="index"
        @click="scrollPrimaryTo(1 + index * 2)"
        :class="{ 'is-active': current === 1 + index * 2 }"
        class="menu-item"
      >
        <img v-lazy="{ src: item.thumbnail, loading: item.thumbnailPlaceholder }" class="lazy bordered" />
      </div>
    </div>

    <div v-if="images.length > 0" class="dots">
      <div
        v-for="(item, index) in images"
        :key="item.id"
        :class="{ 'is-active': current === index }"
        @click="scrollPrimaryTo(index)"
        class="dot"
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
      default: () => [],
    },

    withSecondary: {
      type: Boolean,
      default: false,
    },
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
        left: null,
      },
      secondary: {
        scrolling: false,
        scrolled: 0,
        el: 'secondary',
        x: null,
        left: null,
      },
    },

    photoSwipe: null,
  }),

  computed: {
    primaryImageWidth() {
      if (!this.$refs.slider || this.$refs.slider.children.length === 0) {
        return 0
      }

      return this.$refs.slider.children[0].clientWidth
    },

    imagesLeft() {
      return this.images.filter((image, index) => index % 2 === 0)
    },

    imagesRight() {
      return this.images.filter((image, index) => index % 2 !== 0)
    },

    secondaryImageWidth() {
      if (!this.$refs.secondary || this.$refs.secondary.children.length === 0) {
        return 0
      }

      return this.$refs.secondary.children[0].clientWidth
    },
  },

  mounted() {
    const self = this
    window.addEventListener(
      'resize',
      debounce(() => {
        self.scrollPrimaryTo(self.current)
      }, 200),
    )

    this.initImages()
  },

  destroyed() {
    window.removeEventListener(
      'resize',
      debounce(() => {
        self.scrollPrimaryTo(self.current)
      }, 200),
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
          w: image.width,
          h: image.height,
          title: image.title,
        })),
        {
          index,
          history: false,
          closeOnScroll: false,
          bgOpacity: 0.9,
          getThumbBoundsFn() {
            const image = self.$refs.slider.childNodes[self.photoSwipe.getCurrentIndex()].firstChild
            const pageYScroll = window.pageYOffset || document.documentElement.scrollTop
            const imageRect = image.getBoundingClientRect()

            return {
              x: imageRect.left,
              y: imageRect.top + pageYScroll,
              w: imageRect.width,
            }
          },
        },
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
      if (this.$refs.secondary) {
        this.$refs.secondary.scrollTo(index * this.secondaryImageWidth, 0)
      }
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
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~/assets/css/variables';
@import '~/assets/css/colors';

.gallery {
  display: flex;
  width: 600px;
  max-height: 600px;
  margin: auto;
  margin-bottom: 100px;
}

.slider {
  display: flex;
  flex: 1;
  align-items: center;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  border: 0.5ch solid white;
  background: #08080e;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;

  .slider-item {
    position: relative;
    display: flex;
    flex: 1;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    min-width: 100%;
    height: 100%;
    text-align: center;
    cursor: pointer;
    scroll-snap-align: start;
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;

    img {
      max-width: 100%;
      height: auto;
      max-height: 100%;
    }

    .slider-item-overlay {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background: $color-background;
      opacity: 1;
      transition: opacity 0.4s ease-in-out;
    }
  }
}

.menu {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  width: 200px;
  max-height: 600px;

  &.menu-left {
    left: -250px;

    .menu-item {
      &::before {
        content: '';
        position: absolute;
        top: calc(50% - 0.25ch);
        right: calc(-50px - 0.5ch);
        left: 100%;
        border-bottom: 0.5ch solid white;
        transform: scale3d(0, 1, 0);
        transform-origin: center left;
      }
    }
  }
  &.menu-right {
    right: -250px;

    .menu-item {
      &::before {
        content: '';
        position: absolute;
        top: calc(50% - 0.25ch);
        right: 100%;
        left: calc(-50px - 0.5ch);
        border-bottom: 0.5ch solid white;
        transform: scale3d(0, 1, 0);
        transform-origin: center right;
      }
    }
  }

  .menu-item {
    position: relative;
    margin: 0.5em 0;
    cursor: pointer;

    img {
      width: 200px;
      height: 200px;
    }

    &.is-active {
      &::before {
        transform: scale3d(1, 1, 1);
      }
    }

    &::before {
      transition: transform 0.4s ease-in-out;
    }
  }
}

.slider::-webkit-scrollbar,
.secondary::-webkit-scrollbar {
  display: none;
}

.dots {
  position: absolute;
  bottom: -40px;
  left: 0;
  display: flex;
  max-width: 100%;
  padding: 12px 0;
  padding-right: 50px;
  background: white;

  .dot {
    margin: 0 12px;
    padding: 8px;
    border: 1px solid #333;
    border-radius: 4px;
    cursor: pointer;
    transition: background 0.4s ease-in-out;

    &.is-active {
      background: #333;
    }
  }
}

@media (max-width: theme('screens.xl')) {
  .gallery {
    width: 500px;
    max-height: 500px;

    .menu {
      width: 150px;
      height: 500px;

      &.menu-left {
        left: -200px;
      }
      &.menu-right {
        right: -200px;
      }

      img {
        width: 150px;
        height: 150px;
      }
    }
  }
}

@media (max-width: theme('screens.xl')) {
  .gallery {
    width: 450px;
    max-height: 450px;

    .menu {
      width: 130px;
      height: 450px;

      &.menu-left {
        left: -150px;

        .menu-item::before {
          right: calc(-20px - 0.5ch);
        }
      }
      &.menu-right {
        right: -150px;

        .menu-item::before {
          left: calc(-20px - 0.5ch);
        }
      }

      img {
        width: 130px;
        height: 130px;
      }
    }
  }
}

@media (max-width: theme('screens.md')) {
  .gallery {
    width: 100%;
    height: auto;
    max-height: 80vh;

    .slider {
    }

    .menu {
      display: none;
    }
  }
}
</style>
