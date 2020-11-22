<template>
  <main>
    <header class="header">
      <h1>José Cámara <span class="subtitle">@codeserk</span></h1>
    </header>

    <div class="sections">
      <section>
        <h2>About me 🐱</h2>
        <about-me />
      </section>

      <section>
        <h2>Languages 👓</h2>
        <languages :languages="languages" />
      </section>

      <section>
        <h2>Career📱</h2>
        <career :career="career" />
      </section>

      <section>
        <h2>Web Development @</h2>
        <web-development
          :frameworks="frameworks"
          :databases="databases"
          :technologies="technologies"
          :message-brokers="messageBrokers"
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
            career: posts(type: "career") {
              id slug title content dom
              startDate: extra(path: "startDate")
              endDate: extra(path: "endDate")
              position: extra(path: "position")
              areas: terms(taxonomy: "development-area") { id slug name order: extra(path: "order") }
              languages: terms(taxonomy: "language") { id slug name order: extra(path: "order") }
              frameworks: terms(taxonomy: "framework") { id slug name order: extra(path: "order") }
              databases: terms(taxonomy: "database") { id slug name order: extra(path: "order") }
              brokers: terms(taxonomy: "message-broker") { id slug name order: extra(path: "order") }
              technologies: terms(taxonomy: "technology") { id slug name order: extra(path: "order") }
            }

            areas: terms(taxonomy: "development-area") {
              id slug name
              order: extra(path: "order")
            }

            languages: terms(taxonomy: "language") {
              id slug name
              order: extra(path: "order")
              status: extra(path: "status")
              knowledge: extra(path: "knowledge")
              scopes: extra(path: "scopes")
              summary: extra(path: "summary")
            }

            frameworks: terms(taxonomy: "framework") {
              id link slug name
              order: extra(path: "order")
              status: extra(path: "status")
              knowledge: extra(path: "knowledge")
              kind: extra(path: "kind")
              summary: extra(path: "summary")
            }

            databases: terms(taxonomy: "database") {
              id slug name
              order: extra(path: "order")
              status: extra(path: "status")
              knowledge: extra(path: "knowledge")
              summary: extra(path: "summary")
            }

            technologies: terms(taxonomy: "technology") {
              id slug name
              order: extra(path: "order")
              status: extra(path: "status")
              knowledge: extra(path: "knowledge")
              scopes: extra(path: "scopes")
              summary: extra(path: "summary")
            }

            messageBrokers: terms(taxonomy: "message-broker") {
              id slug name
              order: extra(path: "order")
              status: extra(path: "status")
              knowledge: extra(path: "knowledge")
              summary: extra(path: "summary")
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  color: white;
  font-size: 8vw;
  line-height: 1em;
  letter-spacing: 0.2em;
  text-align: center;

  h1 {
    position: relative;
    overflow: hidden;
    font-size: 1.2em;

    &::after {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 1;
      animation: textAppear 0.5s ease-in-out;
    }
    .subtitle {
      display: block;
      font-size: 0.75em;
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
  }
}
</style>
