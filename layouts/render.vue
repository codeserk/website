<template>
  <div class="wrapper">
    <client-only>
      <background />
    </client-only>
    <Nuxt />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import Background from '../components/layout/scene/background'
import { debounce } from '~/utils/debounce'

export default {
  components: {
    Background,
  },
}
</script>

<style lang="scss" scoped>
@import '~/assets/css/variables';

.wrapper {
  position: relative;
  min-height: 100vh;
}
</style>
