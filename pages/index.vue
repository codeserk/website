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
        <h2>Projects 🎵</h2>
        <projects :projects="projects" />
      </section>
    </div>
  </main>
</template>

<script>
import { lightenDarkenColor } from '../utils/color'
import AboutMe from '../components/home/home-about-me'
import Languages from '../components/home/home-languages'
import Career from '../components/home/home-career'
import WebDevelopment from '../components/home/web-development'
import Projects from '../components/home/projects'

export default {
  components: {
    AboutMe,
    Languages,
    Career,
    WebDevelopment,
    Projects,
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

            projects: posts(type: "project") {
              id slug title content dom
              status: extra(path: "status")
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
  font-size: 10vw;
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
</style>
