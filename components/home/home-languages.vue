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
  position: relative;
  max-width: 600px;
  padding: 48px;

  &::before {
    content: '';
    position: absolute;
    top: 1px;
    right: 1px;
    bottom: 1px;
    left: 1px;
    z-index: -1;
    margin-right: 1ch;
    border: 0.5ch solid white;
    background-color: #0F090C;
    box-shadow: 1ch 1rem 0 white;
  }
}

h1 {
  vertical-align: baseline;
  font-size: 3rem;
  letter-spacing: 10px;
}

.language {
  position: relative;
  z-index: 1;
  margin: 5rem 0;

  @media (max-width: theme('screens.xl')) {
    margin: 8rem 0;
  }

  @media (max-width: theme('screens.lg')) {
    margin: 0 0 6rem 0;

    .short-description {
      position: relative;
      top: unset !important;
      right: unset !important;
      left: unset !important;
      width: auto;
      max-width: unset;
      padding: 0;
      &::before {
        display: none;
      }
      &::after {
        display: none;
      }
    }
  }

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
      flex: 2;
      height: 2rem;
      border: 4px solid white;
      border-radius: 4px;

      .language-bar-width {
        height: 100%;
        background: white;
      }

      .language-bar-status {
        position: absolute;
        top: -0.25rem;
        right: 0;
        left: 0;
        line-height: 2rem;
        text-align: center;
        text-transform: uppercase;
        mix-blend-mode: difference;
      }
    }
  }

  .short-description {
    position: absolute;
    top: -50%;
    width: calc((100vw - 600px) / 2 - 10px);
    max-width: 400px;
    padding: 1em;

    &::after {
      content: '';
      position: absolute;
      top: 30px;
      border-bottom: 4px solid white;
    }
  }

  &:nth-child(odd) .short-description {
    left: calc(100% + 60px);

    &::after {
      right: calc(100% - 2px);
      left: -14px;
    }
  }
  &:nth-child(even) .short-description {
    right: calc(100% + 60px);

    &::after {
      right: -14px;
      left: calc(100% - 2px);
    }
  }
}
</style>
