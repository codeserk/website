<template>
  <div class="wrapper">
    <Nuxt />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import { debounce } from '~/utils/debounce'

export default {
  computed: {
    ...mapGetters(['isMobileOverlayOn', 'searchKey']),

    isHome() {
      return this.$router.path !== '/' && this.$router.path !== ''
    },
  },

  watch: {
    isMobileOverlayOn(value) {
      if (value) {
        document.scrollingElement.scrollTo(0, 0)
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = 'inherit'
      }
    },
  },

  mounted() {
    window.addEventListener(
      'resize',
      debounce(() => {
        if (window.innerWidth >= 640) {
          this.hideMobileOverlay()
        }
      }, 50),
    )
  },

  methods: {
    ...mapActions(['hideMobileOverlay', 'setSearchResults']),
  },
}
</script>

<style lang="scss" scoped>
@import '~/assets/css/variables';

.wrapper {
  position: relative;
  min-height: 100vh;
  background: white;
}

.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active,
.list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}

.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  overflow: hidden;
  transition-timing-function: cubic-bezier(0.55, 0, 0.1, 1);
  transition-duration: 0.5s;
  transition-property: height, opacity, transform;
}

.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  transform: translate(2em, 0);
}

.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  transform: translate(-2em, 0);
}
</style>
