<template>
  <div class="web-development page-wrapper content">
    <div class="frontend block skew">
      <h2>Frontend</h2>

      <h3>Languages</h3>
      <div
        v-for="language in frontendLanguages" :key="language.id"
        class="language"
      >
        <span v-text="`${language.name} (${language.status})`" class="language-name" />
        <div class="language-bar">
          <div
            :style="{ width: `${language.knowledge}%` }"
            class="language-bar-width"
          />
        </div>
      </div>
    </div>
    <div class="devops block">
      <h2>Dev Ops</h2>
    </div>
    <div class="backend block skew-right">
      <h2>Backend</h2>

      <h3>Languages</h3>
      <div
        v-for="language in frontendLanguages" :key="language.id"
        class="language"
      >
        <span v-text="language.name" class="language-name" />
        <div class="language-bar">
          <div
            :style="{ width: `${language.knowledge}%` }"
            class="language-bar-width"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    languages: {
      type: Array,
      default: () => ([])
    }
  },

  computed: {
    frontendLanguages() {
      return this.languages
        .filter(language => language.scopes?.includes('frontend'))
    },

    backendLanguages() {
      return this.languages
        .filter(language => language.scopes?.includes('backend'))
    }
  }
}
</script>

<style lang="scss" scoped>
.web-development {
  display: flex;
  height: 100%;
  align-items: stretch;
  justify-content: center;
  background: #08080E99;

  .frontend, .devops, .backend {
    flex: 1;
    padding: 2rem;
    margin: 8px;
    border-radius: 12px;
    max-width: 600px;
  }
  .frontend {
    // background: #575fa255;
  }
  .devops {
    // background: #F2F2F2EE;
  }
  .backend {
    // background: #F66805EE;
  }

  .language-bar {
    border: 4px solid white;
    width: 100%;
    height: 2rem;
    border-radius: 4px;

    .language-bar-width {
      background: white;
      height: 100%;
    }
  }

  @media (max-width: theme('screens.md')) {
    flex-direction: column;
    align-items: center;
    justify-items: center;
    .block {
      width: 100%;
      transform: skewY(-3deg) translate3d(0, 1rem, 0);
      flex: 1;
      margin: 1rem auto;
    }
  }
}
</style>
