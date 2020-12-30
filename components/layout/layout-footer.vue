<template>
  <footer class="footer">
    <div class="container mx-auto">
      <h2 class="sr-only">Footer</h2>

      <div class="avatar" data-aos="appear">
        <div class="speech-bubble">Thanks for visiting my portfolio <span class="yellow">✌︎</span></div>
        <router-link to="/">
          <span class="sr-only">Home</span>
          <img
            v-lazy="{ src: $common.avatar.image.src, loading: $common.avatar.placeholder.src }"
            data-aos="appear"
            width="200"
            height="200"
            alt="Jose Camara"
            class="image lazy"
          />
        </router-link>
      </div>

      <div class="social-icons">
        <a v-for="(item, index) in social" :key="index" :href="item.link" target="__blank" rel="noreferrer noopener">
          <span v-text="item.title" class="sr-only" />
          <font-awesome-icon :icon="[item.iconType, item.icon]" size="lg" />
        </a>
      </div>

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

        <div class="links">
          <h3>Pages</h3>
          <nav>
            <router-link
              v-for="(page, index) in pages"
              :key="page.link"
              :to="page.link"
              v-text="page.title"
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
      { iconType: 'fab', icon: 'github', link: socialNetworks.github.url, title: 'GitHub account' },
      { iconType: 'fab', icon: 'linkedin', link: socialNetworks.linkedin.url, title: 'LinkedIn profile' },
      { iconType: 'fab', icon: 'twitter', link: socialNetworks.twitter.url, title: 'Twitter account' },
      { iconType: 'fa', icon: 'envelope', link: socialNetworks.email.url, title: 'Email' },
    ],

    pages: [{ title: 'Security and cookies', link: '/security-and-cookies' }],
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

  .avatar {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 2em;

    .speech-bubble {
      position: relative;
      display: inline-block;
      max-width: 200px;
      margin: 0 24px;
      padding: 1em;
      border-right: 8px solid white;
      border-bottom: 4px solid white;

      &::after {
        content: '►';
        position: absolute;
        top: 2em;
        right: -0.5em;
        font-size: 3rem;
        line-height: 10px;
      }
    }

    img {
      width: 290px;
    }
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
    justify-content: center;
    margin: 0 -2em;

    .links {
      flex-basis: 150px;
      margin: 2em;

      h3 {
        margin-bottom: 0.5em;
        font-size: 1.4em;
        line-height: 1em;
      }

      nav {
        display: flex;
        flex-direction: column;

        a {
          position: relative;
          padding-left: 1.5em;

          &::before {
            content: '├─ ';
            position: absolute;
            left: 0;
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

  @media (max-width: theme('screens.sm')) {
    .avatar {
      flex-direction: column-reverse;

      .speech-bubble {
        margin: 24px 0;
        border-top: 8px solid white;
        border-right: none;
        border-bottom: none;
        border-left: 4px solid white;

        &::after {
          content: '▲';
          top: -1rem;
          right: auto;
          left: 0.5em;
        }
      }
    }

    .links-container {
      margin: 0;

      .links {
        flex: 1;
        margin: 2em 1em;
      }
      a {
        padding: 0.5em;
        font-size: 1.25em;
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
