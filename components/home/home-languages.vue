<template>
  <div class="page-wrapper color">
    <div class="container skew mx-auto content">
      <h2 class="text-appear">Languages 👓</h2>

      <div
        v-for="language in sortedLanguages" :key="language.id"
        class="language"
      >
        <div class="language-progress">
          <router-link :to="`/languages/${language.slug}`" class="language-name">
            <span v-text="language.name" />
          </router-link>
          <div class="language-bar">
            <div
              :style="{ width: `${language.knowledge}%` }"
              class="language-bar-width"
            />
            <span v-text="language.status" class="language-bar-status" />
          </div>
        </div>

        <span
          v-if="language.shortDescription"
          v-text="language.shortDescription"
          class="short-description block"
        />
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
    sortedLanguages () {
      return [...this.languages].sort((langA, langB) => langA.order - langB.order)
    }
  }
}
</script>

<style lang="scss" scoped>
.page-wrapper .container {
  padding: 48px;
  position: relative;
  max-width: 600px;

  &:before {
    content: '';
    position: absolute;
    left: 1px;
    top: 1px;
    bottom: 1px;
    right: 1px;
    margin-right: 1ch;
    border: 0.5ch solid white;
    z-index: -1;
    box-shadow: 1ch 1rem 0 white;
    background-color: #0F090C;
  }
}

h1 {
  font-size: 3rem;
  vertical-align: baseline;
  letter-spacing: 10px;
}

.language {
  margin: 5rem 0;
  position: relative;
  z-index: 1;

  .language-progress {
    display: flex;
    justify-content: stretch;
    margin-bottom: 1em;

    .language-name {
      flex: 1;
      font-weight: bold;
    }

    .language-bar {
      position: relative;
      border: 4px solid white;
      flex: 2;
      height: 2rem;
      border-radius: 4px;

      .language-bar-width {
        background: white;
        height: 100%;
      }

      .language-bar-status {
        position: absolute;
        text-align: center;
        top: -0.25rem;
        left: 0;
        right: 0;
        mix-blend-mode: difference;
        line-height: 2rem;
        text-transform: uppercase;
      }
    }
  }

  .short-description {
    position: absolute;
    width: calc((100vw - 600px) / 2 - 10px);
    max-width: 400px;
    top: -50%;
    padding: 1em;

    &:after {
      content: '';
      position: absolute;
      top: 30px;
      border-bottom: 4px solid white;
    }
  }

  &:nth-child(odd) .short-description {
    left: calc(100% + 60px);

    &:after {
      left: -14px;
      right: calc(100% - 2px);
    }
  }
  &:nth-child(even) .short-description {
    right: calc(100% + 60px);

    &:after {
      left: calc(100% - 2px);
      right: -14px;
    }
  }

  @media (max-width: theme('screens.xl')) {
    margin: 8rem 0;
  }

  @media (max-width: theme('screens.lg')) {
    margin: 0rem 0 6rem 0;

    .short-description {
      position: relative;
      padding: 0;
      width: auto;
      max-width: unset;
      top: unset !important;
      left: unset !important;
      right: unset !important;
      &:before {
        display: none;
      }
      &:after {
        display: none;
      }
    }
  }
}
</style>
