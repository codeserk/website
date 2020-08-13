<template>
  <transition name="slide-fade-up">
    <div v-if="canUseCookies && !isValueSet" class="cookies-popup">
      <span class="cookies-popup__text" v-text="text" />
      <router-link class="cookies-popup__know-more link" to="/security-and-cookies">Know more.</router-link>

      <div class="cookies-popup__buttons">
        <button class="cookies-popup__buttons__reject link" @click="setValue(false)">Reject cookies</button>
        <button class="cookies-popup__buttons__accept" @click="setValue(true)">Accept</button>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data: () => ({
    text: 'This website uses cookies to improve the experience.',

    useCookies: null
  }),

  computed: {
    canUseCookies() {
      return !!localStorage
    },

    isValueSet() {
      return this.useCookies !== null
    }
  },

  beforeMount() {
    if (this.canUseCookies) {
      this.useCookies = localStorage.getItem('use-cookies')
    }
  },

  methods: {
    setValue(accepted) {
      if (!this.canUseCookies) {
        return
      }

      this.useCookies = !!accepted
      localStorage.setItem('use-cookies', !!accepted)

      if (this.useCookies && this.$setupAnalytics) {
        this.$setupAnalytics()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~/assets/css/colors";

.cookies-popup {
  font-size: 0.75rem;
  z-index: 1000;
  position: fixed;
  background: white;
  border: 1px solid black;
  border-radius: 4px;
  width: 240px;
  right: 1rem;
  bottom: 1rem;
  padding: 1rem;

  &__buttons {
    margin-top: 1rem;
    display: flex;
    justify-content: space-between;

    &__accept {
      padding: 4px 8px;
      text-transform: uppercase;
      background: $color-primary;
      color: white;
      border-radius: 10px;
    }
  }

  .link::before {
    background-color: black;
  }

  @media (max-width: theme('screens.sm')) {
    left: 50%;
    transform: translate3d(-50%, 0, 0);
  }
}
</style>
