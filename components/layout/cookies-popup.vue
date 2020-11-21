<template>
  <transition name="slide-fade-up">
    <div v-if="canUseCookies && !isValueSet" class="cookies-popup">
      <span class="cookies-popup__text content">
        This website <strong>uses cookies</strong> to <em>improve the experience</em>
      </span>
      <router-link class="cookies-popup__know-more link" to="/security-and-cookies">Know more.</router-link>

      <div class="cookies-popup__buttons">
        <button @click="setValue(false)" class="cookies-popup__buttons__reject link">Reject cookies</button>
        <button @click="setValue(true)" class="cookies-popup__buttons__accept">Accept</button>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data: () => ({
    text: 'This website uses cookies to improve the experience.',

    useCookies: null,
  }),

  computed: {
    canUseCookies() {
      return !!localStorage
    },

    isValueSet() {
      return this.useCookies !== null
    },
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
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~/assets/css/colors';

.cookies-popup {
  position: fixed;
  right: 0.5ch;
  bottom: 2.5ch;
  z-index: 1000;
  width: 300px;
  padding: 1rem;
  border: 0.5ch solid white;
  color: white;
  border-radius: 0;
  background: #07080d;
  font-size: 0.95rem;

  &::before {
    content: '';
    position: absolute;
    top: 4ch;
    right: -0.5ch;
    bottom: -0.5ch;
    left: 4ch;
    z-index: -1;
    box-shadow: 0 1em 0 white;
  }

  @media (max-width: theme('screens.sm')) {
    left: 50%;
    transform: translate3d(-50%, 0, 0);
  }

  &__buttons {
    display: flex;
    justify-content: space-between;
    margin-top: 1rem;

    &__accept {
      padding: 4px 8px;
      border-radius: 10px;
      background: purple;
      color: white;
      text-transform: uppercase;
    }
  }

  .link::before {
    background-color: white;
  }
}
</style>
