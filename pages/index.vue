<template>
  <main>
    <header class="header">
      <div class="heading-container">
        <div class="social-icons">
          <a v-for="(item, index) in social" :key="index" :href="item.link" target="__blank" rel="noreferrer noopener">
            <span v-text="item.title" class="sr-only" />
            <font-awesome-icon :icon="[item.iconType, item.icon]" size="lg" />
          </a>
        </div>

        <h1>
          Jos<span class="color">é</span> C<span class="color">á</span>mara
          <span class="subtitle yellow">@codeserk</span>
        </h1>

        <div class="titles-container">
          <client-only>
            <vue-typed-js
              :strings="titles"
              :start-delay="1000"
              :type-speed="100"
              :back-speed="20"
              class="content titles"
              content-type="html"
              loop
            >
              <span class="typing" />
            </vue-typed-js>
          </client-only>
        </div>
      </div>
    </header>

    <div class="sections">
      <section>
        <h2>About me 🐱</h2>
        <about-me :images="{ avatar: $common.avatar, mia, ryuk }" />
      </section>

      <section>
        <h2>Languages 👓</h2>
        <languages :languages="$common.languages" />
      </section>

      <section>
        <h2>Career📱</h2>
        <career :career="career" />
      </section>

      <section>
        <h2>Web Development @</h2>
        <web-development
          :frameworks="$common.frameworks"
          :databases="$common.databases"
          :technologies="$common.technologies"
          :message-brokers="$common.messageBrokers"
        />
      </section>

      <section>
        <h2>Blog 📺</h2>
        <blog :articles="articles" />
      </section>

      <section>
        <router-link to="/project"><h2>Projects 🎵</h2></router-link>
        <projects :projects="projects" :limit="9" />
      </section>
    </div>
  </main>
</template>

<script>
import { generateSeoMeta, socialNetworks } from '../utils/seo'

export default {
  components: {
    AboutMe: () => import('~/components/home/about-me'),
    Languages: () => import('~/components/home/languages'),
    Career: () => import('~/components/home/career'),
    WebDevelopment: () => import('~/components/home/web-development'),
    Blog: () => import('~/components/home/blog'),
    Projects: () => import('~/components/home/projects'),
  },

  data: () => ({
    titles: [
      'Software Engineer',
      '<strong>Backend</strong> developer',
      '<a href="https://nestjs.com/" target="__blank" rel="noreferrer noopener">NestJS</a> big Fan',
      '<strong>Frontend</strong> developer',
      '<a href="https://vuejs.org/" target="__blank" rel="noreferrer noopener">VueJS</a> lover!',
      '<strong>DevOps</strong> initiated',
      '<strong>Game</strong> developer (as <em>hobby</em>)',
      '<strong>iOS</strong> and <strong>Android</strong> learner',
      '<em>Cat</em> enthusiast! :3',
    ],

    social: [
      { iconType: 'fab', icon: 'github', link: socialNetworks.github.url, title: 'GitHub account' },
      { iconType: 'fab', icon: 'linkedin', link: socialNetworks.linkedin.url, title: 'LinkedIn profile' },
      { iconType: 'fab', icon: 'twitter', link: socialNetworks.twitter.url, title: 'Twitter account' },
      { iconType: 'fa', icon: 'envelope', link: socialNetworks.email.url, title: 'Email' },
    ],
  }),

  head() {
    return generateSeoMeta({
      path: this.$route.path,
    })
  },

  async asyncData({ store, error, route, params, $source }) {
    const data = await $source.resolve(route.path, ({ query }) =>
      query(
        `
          query index {
            avatar: mediaById(id: "avatar") {
              image(resolution: Small, format: png, transform: { resize: { width: 290, height: 290 }}) { src }
              placeholder: image(resolution: Placeholder, format: png, transform: { resize: { width: 16, height: 16 }}, output: Inline) { src }
            }
            mia: mediaById(id: "mia") {
              image(resolution: Small, format: png, transform: { resize: { width: 290, height: 290 }}) { src }
              placeholder: image(resolution: Placeholder, format: png, transform: { resize: { width: 16, height: 16 }}, output: Inline) { src }
            }
            ryuk: mediaById(id: "ryuk") {
              image(resolution: Small, format: png, transform: { resize: { width: 290, height: 290 }}) { src }
              placeholder: image(resolution: Placeholder, format: png, transform: { resize: { width: 16, height: 16 }}, output: Inline) { src }
            }

            career: posts(type: "career") {
              id slug title content dom
              startDate: extra(path: "startDate")
              endDate: extra(path: "endDate")
              position: extra(path: "position")
              website: extra(path: "website")
              areas: terms(taxonomy: "development-area") { id slug name order: extra(path: "order") }
              languages: terms(taxonomy: "language") { id slug name order: extra(path: "order") }
              frameworks: terms(taxonomy: "framework") { id slug name order: extra(path: "order") }
              databases: terms(taxonomy: "database") { id slug name order: extra(path: "order") }
              brokers: terms(taxonomy: "message-broker") { id slug name order: extra(path: "order") }
              technologies: terms(taxonomy: "technology") { id slug name order: extra(path: "order") }
              featuredImage {
                image(resolution: Small, format: png, transform: { resize: { width: 290, height: 290 }}) { src }
                placeholder: image(resolution: Placeholder, format: png, transform: { resize: { width: 16, height: 16 }}, output: Inline) { src }
              }
            }

            articles: posts(
              type: "blog",
              filters: { status: { eq: "published" } }
              sort: { path: "createdAt", direction: Descending },
              pagination: { limit: 3 }
            ) {
              id slug title excerpt link
              status: extra(path: "status")
              progress: extra(path: "progress")
              startDate: extra(path: "startDate")
              endDate: extra(path: "endDate")
              order: extra(path: "order")
              image: featuredImage {
                image(resolution: Small, format: png, transform: { resize: { width: 290, height: 290 }}) { src }
                placeholder: image(resolution: Placeholder, format: png, transform: { resize: { width: 16, height: 16 }}, output: Inline) { src }
              }
              areas: terms(taxonomy: "development-area") { id slug name order: extra(path: "order") }
            }

            projects: posts(type: "project", sort: { path: "extra.order", direction: Ascending }, pagination: { limit: 9 }) {
              id slug title excerpt link
              status: extra(path: "status")
              progress: extra(path: "progress")
              startDate: extra(path: "startDate")
              endDate: extra(path: "endDate")
              order: extra(path: "order")
              image: featuredImage {
                image(resolution: Small, format: png, transform: { resize: { width: 290, height: 290 }}) { src }
                placeholder: image(resolution: Placeholder, format: png, transform: { resize: { width: 16, height: 16 }}, output: Inline) { src }
              }
              areas: terms(taxonomy: "development-area") { id slug name order: extra(path: "order") }
            }
          }
        `,
      ),
    )

    return data
  },

  mounted() {
    if (this.$analytics) {
      this.$analytics.logEvent('view_page', {
        title: 'Home',
        slug: '/',
        link: '/',
      })
    }
  },
}
</script>

<style lang="scss" scoped>
.header {
  position: relative;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  color: white;
  font-size: 10vw;
  line-height: 1.5em;
  text-align: center;

  .heading-container {
    position: relative;
    display: flex;
    align-items: center;
    margin-bottom: 1em;

    h1 {
      color: white;
      font-size: 1.5em;
      line-height: 1;
      letter-spacing: 0.2em;
      filter: drop-shadow(0 0 1px black) drop-shadow(0 0 1px black);

      .color {
        opacity: 1;
        animation-name: header-color;
        animation-duration: 1s;
        animation-timing-function: ease-in;
        animation-delay: 1s;
        animation-fill-mode: forwards;
      }

      .subtitle {
        display: block;
        font-size: 0.75em;
      }
    }
  }

  .social-icons {
    position: absolute;
    top: -3em;
    right: 0;
    left: 0;
    display: flex;
    justify-content: space-evenly;
    font-size: 0.5em;

    a {
      display: block;
      filter: drop-shadow(0 0 1px black) drop-shadow(0 0 1px black);
    }
  }

  .titles-container {
    position: absolute;
    right: 0;
    bottom: -3em;
    left: 0;
    height: 2em;
    font-size: 0.9em;
    line-height: 1;
    text-align: center;

    .titles {
      display: inline;
      filter: drop-shadow(0 0 1px black) drop-shadow(0 0 1px black);
    }
  }

  p {
    margin-top: 10vh;
    font-size: 0.6em;
    letter-spacing: 0;
  }
}

.sections {
  padding: 64px 0;
  background: #08080e99;

  section {
    margin-bottom: 128px;
    color: white;

    h2 {
      margin-bottom: 0.5em;
      font-size: 2.5em;
      text-align: center;

      @media (min-width: theme('screens.sm')) {
        font-size: 4em;
      }
    }
  }
}

@media (min-width: theme('screens.sm')) {
  .header {
    font-size: 7vw;
  }
}

@media (min-width: 1500px) {
  .header {
    font-size: 7em;
  }
}

@keyframes header-color {
  0% {
    color: white;
  }
  100% {
    color: #ff004d;
  }
}
</style>
