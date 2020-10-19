<template>
  <footer class="page-wrapper full"></footer>
</template>

<script>
import { mapGetters } from 'vuex'

import { socialNetworks } from '~/utils/seo'

export default {
  data: () => ({
    social: [
      { icon: 'youtube', link: socialNetworks.youtube.url },
      { icon: 'instagram', link: socialNetworks.instagram.url },
      { icon: 'facebook', link: socialNetworks.facebook.url },
    ],
  }),

  computed: {
    ...mapGetters(['logo', 'menuItems']),
  },
}
</script>

<style lang="scss" scoped>
@import '~/assets/css/colors';
@import '~/assets/css/variables';

footer {
  display: flex;
  align-items: center;
  min-height: 100vh;
  color: white;

  .footer-container {
    align-items: center;
    @media (max-width: 400px) {
      display: block;
    }
  }
}

.footer-logo {
  align-items: center;
}

.footer-links {
  flex: 2;
  flex-direction: column;
  margin-top: 30px;

  &__pages {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: space-between;

    .menu-item {
      margin-bottom: 10px;
      padding: 0 20px;
      color: white;
      font-size: 1.5rem;
      font-family: $font-header;
      text-align: right;
      text-transform: uppercase;

      .sub-menu-item {
        margin-top: 5px;
        margin-bottom: 0;
        padding: 0;
        color: #dedede;
        font-size: 1rem;
      }
    }
  }
}

.social-icons {
  display: flex;
  justify-content: space-evenly;
  margin-top: 1em;
  padding: 10px;
  padding: 11px 20px;
  color: white;
  font-size: 26px;
  text-align: center;

  &__icon {
    flex: 1;
    filter: drop-shadow(0 0 1px black) drop-shadow(0 0 1px black) drop-shadow(0 0 1px black);
  }
}
</style>
