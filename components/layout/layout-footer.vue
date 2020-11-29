<template>
  <footer class="footer">
    <div class="container mx-auto">
      <h2 class="sr-only">Footer</h2>

      <img
        v-lazy="{ src: $common.avatar.image.src, loading: $common.avatar.placeholder.src }"
        data-aos="appear"
        class="image lazy"
      />

      <hr />

      <div class="links-container">
        <div class="links">
          <h3>Development</h3>
          <nav>
            <router-link
              v-for="(area, index) in $common.areas"
              :key="area.id"
              :to="`/development/${area.slug}`"
              v-text="area.name"
              :data-aos-delay="index * 100"
              data-aos="appear"
            />
          </nav>
        </div>

        <div class="links">
          <h3>Languages</h3>
          <nav>
            <router-link
              v-for="(language, index) in $common.languages"
              :key="language.id"
              :to="`/language/${language.slug}`"
              v-text="language.name"
              :data-aos-delay="index * 100"
              data-aos="appear"
            />
          </nav>
        </div>

        <div class="links">
          <h3>Frameworks</h3>
          <nav>
            <router-link
              v-for="(framework, index) in $common.frameworks"
              :key="framework.id"
              :to="`/framework/${framework.slug}`"
              v-text="framework.name"
              :data-aos-delay="index * 100"
              data-aos="appear"
            />
          </nav>
        </div>

        <div class="links">
          <h3>Databases</h3>
          <nav>
            <router-link
              v-for="(database, index) in $common.databases"
              :key="database.id"
              :to="`/database/${database.slug}`"
              v-text="database.name"
              :data-aos-delay="index * 100"
              data-aos="appear"
            />
          </nav>
        </div>

        <div class="links">
          <h3>Message Brokers</h3>
          <nav>
            <router-link
              v-for="(messageBroker, index) in $common.messageBrokers"
              :key="messageBroker.id"
              :to="`/message-broker/${messageBroker.slug}`"
              v-text="messageBroker.name"
              :data-aos-delay="index * 100"
              data-aos="appear"
            />
          </nav>
        </div>

        <div class="links">
          <h3>Technologies</h3>
          <nav>
            <router-link
              v-for="(technology, index) in $common.technologies"
              :key="technology.id"
              :to="`/technology/${technology.slug}`"
              v-text="technology.name"
              :data-aos-delay="index * 100"
              data-aos="appear"
            />
          </nav>
        </div>
      </div>
    </div>

    <div
      id="trees-far"
      :style="{
        'background-image': `url('/scene/trees-far.png')`,
      }"
      class="layer layer-bottom"
    />
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
  position: relative;
  overflow-x: hidden;
  min-height: 125vh;

  &::before {
    content: '';
    position: absolute;
    top: 80vh;
    right: 0;
    bottom: 0;
    left: 0;
    background: #08080e;
  }

  .container {
    position: relative;
    margin-top: 80vh;
    padding-top: 0;
    color: white;
  }

  .image {
    filter: grayscale(100%);
  }

  .links-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    margin: 0 -2em;

    .links {
      margin: 2em;

      h3 {
        font-size: 1.4em;
      }

      nav {
        display: flex;
        flex-direction: column;

        a {
          &::before {
            content: '├─ ';
          }
          &:last-child {
            &::before {
              content: '└─ ';
            }
          }
        }
      }
    }
  }
}

.layer {
  position: absolute;
  right: 0;
  left: 0;
  background-size: contain;
  background-repeat: repeat-x;
  image-rendering: pixelated;
}

#trees-far {
  top: 50vh;
  left: 0;
  width: calc(100vw + 20px);
  height: 30vh;
  background-position: bottom right;
  background-size: contain;
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
