<template>
  <div>
    <div id="header">
      <h1>José Cámara</h1>
      <h2>@codeserk</h2>
    </div>

    <div class="page-wrapper full"></div>

    <about-me />
    <career :career="career" />
    <languages :languages="languages" />
    <web-development :languages="languages" />

  </div>
</template>

<script>
import { lightenDarkenColor } from '../utils/color'
import AboutMe from '../components/home/home-about-me'
import Career from '../components/home/home-career'
import WebDevelopment from '../components/home/home-web-development'
import Languages from '../components/home/home-languages'

export default {
  components: {
    AboutMe,
    Career,
    Languages,
    WebDevelopment
  },

  data: () => ({
    lighten: 0,
    mainColor: '#575fa2'
  }),

  computed: {
    color () {
      return lightenDarkenColor(this.mainColor, 0)
    }
  },

  async asyncData({ store, error, route, params, $source }) {
    const data = await $source.resolve(route.path, ({ query }) =>
      query(
        `
          query index {
            career: posts(type: "career") {
              id title content dom
              startDate: extra(path: "startDate")
            }

            languages: terms(taxonomy: "language") {
              id slug name
              order: extra(path: "order")
              icon: extra(path: "icon")
              scopes: extra(path: "scopes")
              knowledge: extra(path: "knowledge")
              shortDescription: extra(path: "shortDescription")
              status: extra(path: "status")
            }
          }
        `
      )
    )

    return data
  }
}
</script>

<style lang="scss">

@keyframes textAppear {
  0% { content: '████████████████████' }
  25% { content: '▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓' }
  50% { content: '▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒' }
  75% { content: '░░░░░░░░░░░░░░░░░░░░' }
  100% { content: ' ' }
}

.container {
  z-index: 2;
}

#header {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 2;
  z-index: 5;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
  }
  h2 {
    font-size: 1.1em;
  }
  p {
    margin-top: 10vh;
    font-size: 0.6em;
    letter-spacing: 0;
  }
}

</style>
