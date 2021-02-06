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
</style>
