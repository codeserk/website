<template>
  <div class="home-languages">
    <div class="block small with-shadow-left with-padding container skew mx-auto">
      <div
        v-for="language in sortedLanguages"
        :key="language.id"
        :class="{ 'is-selected': selected && selected === language.id }"
        class="language"
      >
        <div class="language-progress">
          <router-link :to="`/language/${language.slug}`" class="language-name">
            <h3 v-text="language.name" />
          </router-link>
          <div class="language-bar">
            <div :style="{ width: `${language.knowledge}%` }" class="language-bar-width" data-aos="scale-x" />
            <span v-text="language.status" class="language-bar-status" />
          </div>
        </div>

        <span v-if="language.summary" v-text="language.summary" class="short-description block with-shadow-left" />
      </div>
    </div>
  </div>
</template>

<script>
import { sortByOrder } from '../../utils/sort'

export default {
  props: {
    languages: {
      type: Array,
      default: () => [],
    },

    selected: {
      type: String,
      default: '',
    },
  },

  computed: {
    sortedLanguages() {
      return [...this.languages].sort(sortByOrder)
    },
  },
}
</script>

<style lang="scss" scoped>
h1 {
  vertical-align: baseline;
  font-size: 3rem;
  letter-spacing: 10px;
}

.language {
  position: relative;
  z-index: 1;
  margin: 6rem 0;

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
        transition: transform 1s ease-in-out;
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
    width: calc((100vw - 600px) / 2 - 24px);
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
    left: calc(100% + 32px + 24px);

    &::after {
      right: calc(100% + 0.5ch);
      left: -24px;
    }
  }
  &:nth-child(even) .short-description {
    right: calc(100% + 32px + 24px);

    &::after {
      right: -24px;
      left: calc(100% + 0.5ch);
    }
  }

  &.is-selected {
    .language-name {
      color: yellow;
    }
  }

  @media (max-width: theme('screens.xl')) {
    margin: 10rem 0;
  }

  @media (max-width: theme('screens.lg')) {
    margin: 0 0 4rem 0;

    .short-description {
      position: relative !important;
      top: unset !important;
      right: unset !important;
      left: unset !important;
      width: auto !important;
      max-width: unset;
      padding: 0 !important;
      border: none;

      &::before {
        display: none;
      }
      &::after {
        display: none;
      }
    }
  }
}

@media (max-width: theme('screens.sm')) {
  .block {
    padding: 24px 32px 24px 24px;
  }
}
</style>
