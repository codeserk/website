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
  background: #08080EAA;
  color: white;
  min-height: 100vh;
  display: flex;
  align-items: center;

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
    justify-content: space-between;
    align-items: flex-start;
    flex-wrap: wrap;

    .menu-item {
      font-family: $font-header;
      text-transform: uppercase;
      color: white;
      font-size: 1.5rem;
      padding: 0 20px;
      margin-bottom: 10px;
      text-align: right;

      .sub-menu-item {
        font-size: 1rem;
        color: #DEDEDE;
        padding: 0;
        margin-top: 5px;
        margin-bottom: 0px;
      }
    }
  }
}

.social-icons {
  display: flex;
  justify-content: space-evenly;
  color: white;
  padding: 10px;
  font-size: 26px;
  padding: 11px 20px;
  text-align: center;
  margin-top: 1em;

  &__icon {
    filter: drop-shadow(0 0 1px black) drop-shadow(0 0 1px black) drop-shadow(0 0 1px black);
    flex: 1;
  }
}

</style>
