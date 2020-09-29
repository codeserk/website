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

    <nav v-if="false" class="menu container mx-auto">
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
  position: relative;
  width: 100vw;
  height: 100vh;
  transition: all 0.4s ease-in-out;
  transition-delay: 0.1s;

  @media (max-width: theme('screens.sm')) {
    .mobile-menu {
      position: absolute;
      top: $header-height-xs / 2;
      left: 20px;
      display: block;
      filter: drop-shadow(0 0 1px black) drop-shadow(0 0 1px black) drop-shadow(0 0 1px black);
      transform: translate3d(0, -50%, 0);
      .nav-icon {
        width: 26px;

        &::after,
        &::before,
        div {
          content: '';
          display: block;
          height: 4px;
          margin: 8px 0;
          border-radius: 3px;
          background-color:white;
          transition: all .4s ease-in-out;
        }

        &--active::before {
          transform: translateY(12px) rotate(135deg);
        }

        &--active::after {
          transform: translateY(-12px) rotate(-135deg);
        }

        &--active div {
          transform: scale(0);
        }
      }
    }

    .social-icons {
      padding: 11px 20px;
      font-size: 26px;
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
        overflow: hidden;
        height: $header-height-xs;
        margin-left: 40px;
        line-height: $header-height-xs;
        text-overflow: ellipsis;
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

  .background {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
    background-color: 0;
    background-position: center bottom;
    background-size: cover;
    background-repeat: no-repeat;
  }

  .social-icons {
    position: absolute;
    right: 0;
    z-index: 1;
    padding: 10px;
    color: white;
    transition: all 0.4s ease-in-out;

    &__icon {
      margin-left: 20px;
      filter: drop-shadow(0 0 1px black) drop-shadow(0 0 1px black) drop-shadow(0 0 1px black);
    }
  }

  .title {
    z-index: -1;
    display: flex;
    align-items: center;
    justify-content: center;
    height: calc(100% - 40px);
    color: white;
    font-family: $font-header;
    text-align: center;
    filter: drop-shadow(0 0 1px black) drop-shadow(0 0 1px black) drop-shadow(0 0 1px black) drop-shadow(0 0 1px black);
    transition: all 0.4s ease-in-out;

    @media (min-width: theme('screens.md')) {
      height: calc(100% - 100px);
    }

    h1 {
      color: white;
      font-size: 3em;
      line-height: 120px;
      letter-spacing: 0.2em;
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
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1;
    display: none;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 100px;
    background: black;
    font-size: 2em;
    font-family: $font-header;
    transition: all 0.4s ease-in-out;

    @media (min-width: theme('screens.sm')) {
      display: flex;
    }

    .menu-item {
      position: relative;
      flex: 1;
      color: white;
      text-align: center;
      text-transform: uppercase;
      filter: drop-shadow(0 0 1px black) drop-shadow(0 0 1px black) drop-shadow(0 0 1px black);
    }

    .popper {
      min-width: 100px;
      font-size: 0.75em;
      li {
        padding: 10px;
      }
      .link::before {
        background-color: black;
      }
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
      height: 70px;
      background: transparent;
    }
  }

  .mobile-overlay {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1;
    background: $color-background;
    opacity: 1;
  }

  .mobile-menu {
    z-index: 2;
    display: none;
  }

  .mobile-body {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-content: space-around;
    align-items: center;
    justify-content: space-around;
    padding: 10% 15%;

    &__menu {
      display: flex;
      flex: 1;
      flex-direction: column;
      align-content: center;
      justify-content: space-around;
      margin-bottom: 1em;
      font-size: 2.5em;
      font-family: $font-header;

      &__item {
        margin-bottom: 1em;
        color: white;
        text-align: center;
        text-transform: uppercase;
      }
    }

    &__social {
      display: flex;
      justify-content: space-around;
      width: 100%;
      color: white;

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
