<template>
  <main>
    <header class="header">
      <div class="social-icons">
        <a v-for="(item, index) in social" :key="index" :href="item.link" target="_blank">
          <font-awesome-icon :icon="['fab', item.icon]" size="lg" />
        </a>
      </div>

      <h1>Jos<span class="color">é</span> C<span class="color">á</span>mara <span class="subtitle">@codeserk</span></h1>

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
import { lightenDarkenColor } from '../utils/color'
import { socialNetworks } from '../utils/seo'

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
    lighten: 0,
    mainColor: '#175fa2',

    titles: [
      'Software Engineer',
      '<strong>Backend</strong> developer',
      '<a href="https://nestjs.com/" target="_blank">NestJS</a> big Fan',
      '<strong>Frontend</strong> developer',
      '<a href="https://vuejs.org/" target="_blank">VueJS</a> lover!',
      '<strong>DevOps</strong> initiated',
      '<strong>Game</strong> developer (as <em>hobby</em>)',
      '<strong>iOS</strong> and <strong>Android</strong> learner ',
      '<em>Cat</em> enthusiast! :3',
    ],

    social: [
      { icon: 'github', link: socialNetworks.github.url },
      { icon: 'linkedin', link: socialNetworks.linkedin.url },
      { icon: 'twitter', link: socialNetworks.twitter.url },
    ],
  }),

  computed: {
    color() {
      return lightenDarkenColor(this.mainColor, 0)
    },
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

            articles: posts(type: "blog", sort: { field: "createdAt", direction: Descending }, pagination: { limit: 3 }) {
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

            projects: posts(type: "project", pagination: { limit: 9 }) {
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
}
</script>

<style lang="scss" scoped>
.header {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  color: white;
  font-size: 8vw;
  line-height: 1em;
  text-align: center;

  .social-icons {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    font-size: 2rem;
    line-height: 2rem;

    a {
      margin-right: 2rem;
    }
  }

  h1 {
    position: relative;
    overflow: hidden;
    color: white;
    font-size: 1.2em;
    letter-spacing: 0.2em;

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

  .titles {
    position: absolute;
    bottom: 0;
    font-size: 4vw;

    .typing,
    /deep/ .typed-cursor {
      margin-bottom: 0 !important;
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
      font-size: 4em;
      text-align: center;
    }
  }
}

@media (min-width: 1500px) {
  .header {
    font-size: 8em;

    .titles {
      font-size: 5rem;
    }
  }
}

@keyframes header-color {
  0% {
    color: white;
  }
  100% {
    color: red;
  }
}
</style>
