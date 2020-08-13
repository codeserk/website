<template>
  <header
    :class="{
      'header--minimized': isMinimized,
      'header--home': !isMinimized
    }"
    class="header"
  >
    <div class="mobile-menu">
      <div :class="{ 'nav-icon--active': isMobileOverlayOn }" @click="toggleMobileOverlay" class="nav-icon">
        <div></div>
      </div>
    </div>

    <div :style="{ 'background-image': background ? `url(${background.image.src})` : '' }" class="background" />
    <div class="social-icons">
      <a v-for="(item, index) in social" :key="index" :href="item.link" class="social-icons__icon" target="__blank" >
        <font-awesome-icon :icon="['fab', item.icon]" size="lg"/>
      </a>
    </div>
    <div class="title">
      <router-link to="/" class="title-link">
        <h1>Codeserk</h1>
      </router-link>
    </div>

    <nav class="menu container mx-auto">
      <popper
        v-for="item of menuItems"
        :key="item.id"
        :options="{ placement: 'bottom' }"
        :disabled="!item.children.length"
        trigger="hover"
      >
        <ul class="popper">
          <li v-for="subMenu of item.children" :key="subMenu.id">
            <router-link
              :to="subMenu.link"
              v-text="subMenu.title"
              class="link"
            />
          </li>
        </ul>

        <button slot="reference">
          <router-link
            :to="item.link"
            :class="{ 'active': isMenuActive(item.link) }"
            v-text="item.title"
            class="menu-item link"
          />
        </button>
      </popper>
    </nav>

    <transition name="fade" mode="out-in">
      <div v-if="isMobileOverlayOn" class="mobile-overlay" />
    </transition>

    <transition name="mobile-body" mode="out-in">
      <div v-if="isMobileOverlayOn" class="mobile-body">
        <ul class="mobile-body__menu">
          <li v-for="item in menuItems" :key="item.id" class="mobile-body__menu__item">
            <a :href="item.link" @click.prevent="gotoLink(item.link)" v-text="item.title" />
          </li>
        </ul>
        <div class="mobile-body__social">
          <a v-for="(item, index) in social" :key="index" :href="item.link" class="mobile-body__social__icon" target="__blank" >
            <font-awesome-icon :icon="['fab', item.icon]" size="lg"/>
          </a>
        </div>
      </div>
    </transition>
  </header>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Popper from 'vue-popperjs'
import 'vue-popperjs/dist/vue-popper.css'

import { socialNetworks } from '../../utils/seo'

export default {
  name: 'LayoutHeader',

  components: {
    'popper': Popper
  },

  data: () => ({
    social: [
      { icon: 'youtube', link: socialNetworks.youtube.url },
      { icon: 'instagram', link: socialNetworks.instagram.url },
      { icon: 'facebook', link: socialNetworks.facebook.url }
    ]
  }),

  computed: {
    ...mapGetters(['isMobileOverlayOn', 'menuItems', 'background']),

    isMinimized() {
      return this.$route.fullPath !== '/' && this.$route.fullPath !== ''
    }
  },

  methods: {
    ...mapActions(['toggleMobileOverlay', 'hideMobileOverlay']),

    gotoLink(link) {
      this.hideMobileOverlay()
      this.$router.push(link)
    },

    isMenuActive (link) {
      return this.$route.path.includes(link)
    }
  }
}
</script>

<style scoped lang="scss">
/* purgecss start ignore */
@import "~/assets/css/colors";
@import "~/assets/css/variables";

header {
  height: 100vh;
  width: 100vw;
  position: relative;
  transition: all 0.4s ease-in-out;
  transition-delay: 0.1s;

  .background {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: 0;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center bottom;
    z-index: -1;
  }

  .social-icons {
    position: absolute;
    right: 0px;
    color: white;
    padding: 10px;
    z-index: 1;
    transition: all 0.4s ease-in-out;

    &__icon {
      filter: drop-shadow(0 0 1px black) drop-shadow(0 0 1px black) drop-shadow(0 0 1px black);
      margin-left: 20px;
    }
  }

  .title {
    z-index: -1;
    display: flex;
    height: calc(100% - 40px);
    justify-content: center;
    align-items: center;
    font-family: $font-header;
    color: white;
    filter: drop-shadow(0 0 1px black) drop-shadow(0 0 1px black) drop-shadow(0 0 1px black) drop-shadow(0 0 1px black);
    text-align: center;
    transition: all 0.4s ease-in-out;

    @media (min-width: theme('screens.md')) {
      height: calc(100% - 100px);
    }

    h1 {
      font-size: 3em;
      letter-spacing: 0.2em;
      line-height: 120px;
      color: white;
      transition: font-size 0.4s ease-in-out;

      @media (max-width: theme('screens.sm')) {
        font-size: 4em;
      }
      @media (min-width: theme('screens.xs')) {
        font-size: 4em;
      }
      @media (min-width: theme('screens.sm')) {
        font-size: 5em;
      }
      @media (min-width: theme('screens.md')) {
        font-size: 6em;
      }
      @media (min-width: theme('screens.lg')) {
        font-size: 8em;
      }
    }
  }

  .menu {
    font-family: $font-header;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100px;
    width: 100%;
    background: black;
    z-index: 1;
    display: none;
    align-items: center;
    justify-content: space-between;
    font-size: 2em;
    transition: all 0.4s ease-in-out;

    .menu-item {
      flex: 1;
      position: relative;
      text-align: center;
      text-transform: uppercase;
      color: white;
      filter: drop-shadow(0 0 1px black) drop-shadow(0 0 1px black) drop-shadow(0 0 1px black);
    }

    .popper {
      font-size: 0.75em;
      min-width: 100px;
      li {
        padding: 10px;
      }
      .link::before {
        background-color: black;
      }
    }

    @media (min-width: theme('screens.sm')) {
      display: flex;
    }
  }

  &.header--minimized {
    height: 250px;
    background-position: center bottom -20px;

    .title {
      @media (min-width: theme('screens.md')) {
        height: calc(100% - 40px);
      }

      h1 {
        @media (max-width: theme('screens.sm')) {
          font-size: 3em;
        }
      }
    }

    .menu {
      background: transparent;
      height: 70px;
    }
  }

  .mobile-overlay {
    position: fixed;
    z-index: 1;
    background: $color-background;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    opacity: 1;
  }

  .mobile-menu {
    display: none;
    z-index: 2;
  }

  @media (max-width: theme('screens.sm')) {
    .mobile-menu {
      position: absolute;
      display: block;
      top: $header-height-xs / 2;
      left: 20px;
      filter: drop-shadow(0 0 1px black) drop-shadow(0 0 1px black) drop-shadow(0 0 1px black);
      transform: translate3d(0, -50%, 0);
      .nav-icon {
        width: 26px;

        &:after,
        &:before,
        div {
          background-color:white;
          border-radius: 3px;
          content: '';
          display: block;
          height: 4px;
          margin: 8px 0;
          transition: all .4s ease-in-out;
        }

        &--active:before {
          transform: translateY(12px) rotate(135deg);
        }

        &--active:after {
          transform: translateY(-12px) rotate(-135deg);
        }

        &--active div {
          transform: scale(0);
        }
      }
    }

    .social-icons {
      font-size: 26px;
      padding: 11px 20px;
      &__icon {
        margin-left: 25px;
      }
    }

    &.header--home {
      .title {
        align-items: center;
        h1 {
          font-size: 7em;

          @media (max-width: 520px) {
            font-size: 5em;
          }
          @media (max-width: 400px) {
            font-size: 4em;
          }
        }
      }
    }

    &.header--minimized {
      height: $header-height-xs;

      .social-icons {
        top: -100%;
      }

      .title {
        margin-left: 40px;
        height: $header-height-xs;
        line-height: $header-height-xs;
        text-overflow: ellipsis;
        overflow: hidden;
        h1 {
          font-size: 3em;
          @media (max-width: 500px) {
            font-size: 3em;
          }
          @media (max-width: 450px) {
            font-size: 2em;
          }
          @media (max-width: 320px) {
            font-size: 1.5em;
          }
        }
      }
    }
  }

  .mobile-body {
    position: fixed;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    align-content: space-around;
    justify-content: space-around;
    padding: 10% 15%;

    &__menu {
      font-family: $font-header;
      display: flex;
      flex-direction: column;
      font-size: 2.5em;
      align-content: center;
      justify-content: space-around;
      flex: 1;
      margin-bottom: 1em;

      &__item {
        color: white;
        text-transform: uppercase;
        margin-bottom: 1em;
        text-align: center;
      }
    }

    &__social {
      color: white;
      display: flex;
      justify-content: space-around;
      width: 100%;

      &__icon {
        font-size: 1.5em;
      }
    }
  }
}

.mobile-body-enter-active, .mobile-body-leave-active {
  transition: all .4s ease-in-out;
  .mobile-body__social__icon {
    transition: all .4s ease-in-out;
  }
  .mobile-body__social__icon:nth-child(2) {
    transition-delay: 0.05s;
    transition-duration: 0.35s;
  }
  .mobile-body__social__icon:nth-child(3) {
    transition-delay: 0.1s;
    transition-duration: 0.3s;
  }
}
.mobile-body-enter, .mobile-body-leave-to {
  opacity: 0;

  .mobile-body__social__icon {
    transform: translate3d(0, 100px, 0);
  }
}

/* purgecss end ignore */
</style>
