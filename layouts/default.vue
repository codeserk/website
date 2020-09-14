<template>
  <div>
    <div
      class="wrapper"
    >
      <client-only>
        <background />
      </client-only>
      <Nuxt  />
    </div>

    <layout-footer />

    <client-only>
      <cookies-popup />
    </client-only>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import Background from '../components/layout/scene/background'
import { debounce } from '~/utils/debounce'
// import LayoutHeader from '~/components/layout/layout-header'
import LayoutFooter from '~/components/layout/layout-footer'

export default {
  components: {
    Background,
    // LayoutHeader,
    LayoutFooter,
    CookiesPopup: () => import('~/components/layout/cookies-popup')
  },

  computed: {
    ...mapGetters(['isMobileOverlayOn', 'searchKey']),

    isHome() {
      return this.$router.path !== '/' && this.$router.path !== ''
    }
  },

  watch: {
    isMobileOverlayOn(value) {
      if (value) {
        document.scrollingElement.scrollTo(0, 0)
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = 'inherit'
      }
    }
  },

  mounted() {
    window.addEventListener('resize', debounce(() => {
      if (window.innerWidth >= 640) {
        this.hideMobileOverlay()
      }
    }, 50))
  },

  methods: {
    ...mapActions(['hideMobileOverlay', 'setSearchResults'])
  }
}
</script>

<style lang="scss" scoped>
@import "~/assets/css/variables";

.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active, .list-leave-active {
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
  transition-duration: 0.5s;
  transition-property: height, opacity, transform;
  transition-timing-function: cubic-bezier(0.55, 0, 0.1, 1);
  overflow: hidden;
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
