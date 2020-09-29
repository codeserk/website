<template>
  <footer class="">
    <div class="footer-container flex container mx-auto">
      <div class="footer-logo flex-1">
        <image-responsive
          v-if="logo"
          :src="logo.image.src"
          :placeholder="logo.placeholder.src"
          fit="contain"
          data-aos="flip-left"
        />
      </div>
      <div class="footer-links sm:flex">
        <ul class="footer-links__pages sm:flex">
          <li v-for="(item, index) in menuItems" :key="item.id" class="menu-item">
            <router-link
              :to="item.link"
              :data-aos-delay="index * 100"
              v-text="item.title"
              class="link"
              data-aos="appear"
            />
            <ul>
              <li v-for="(subItem, subindex) in item.children" :key="subItem.id" class="sub-menu-item">
                <router-link
                  :to="subItem.link"
                  :data-aos-delay="subindex * 100 + index * 100"
                  v-text="subItem.title"
                  class="link"
                  data-aos="appear"
                />
              </li>
            </ul>
          </li>
          <li class="menu-item">
            <router-link
              :data-aos-delay="menuItems.length * 100"
              to="/security-and-cookies"
              class="link"
              data-aos="appear"
            >Security and Cookies</router-link>
          </li>
        </ul>

        <div class="flex-1 social-icons">
          <a v-for="(item, index) in social" :key="index" :href="item.link" class="social-icons__icon" target="__blank" >
            <font-awesome-icon
              :icon="['fab', item.icon]"
              :data-aos-delay="index * 150"
              size="lg"
              data-aos="flip-right"
            />
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import { mapGetters } from 'vuex'

import { socialNetworks } from '~/utils/seo'

export default {
  data: () => ({
    social: [
      { icon: 'youtube', link: socialNetworks.youtube.url },
      { icon: 'instagram', link: socialNetworks.instagram.url },
      { icon: 'facebook', link: socialNetworks.facebook.url }
    ]
  }),

  computed: {
    ...mapGetters(['logo', 'menuItems'])
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/css/colors';
@import '~/assets/css/variables';

footer {
  display: flex;
  align-items: center;
  min-height: 100vh;
  background: #08080EAA;
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
        color: #DEDEDE;
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
