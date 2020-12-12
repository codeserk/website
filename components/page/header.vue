<template>
  <div class="header-container">
    <img v-if="image" v-lazy="lazyImage" :alt="`${title} - header image`" class="image-moon lazy circled" />

    <div class="container mx-auto clearfix">
      <div :class="{ 'without-image': !image }" class="header">
        <div v-if="image" class="header-image">
          <img
            v-lazy="lazyImage"
            :alt="`${title} - header image`"
            class="image-header lazy bordered"
            width="200"
            height="200"
          />
        </div>

        <div class="header-title">
          <breadcrumbs v-if="breadcrumbs" :breadcrumbs="breadcrumbs" />
          <h1 v-text="title" class="title" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    Breadcrumbs: () => import('~/components/breadcrumbs'),
  },

  props: {
    title: {
      type: String,
      default: '',
    },

    image: {
      type: Object,
      default: () => null,
    },

    breadcrumbs: {
      type: Array,
      default: () => [],
    },
  },

  computed: {
    lazyImage() {
      if (!this.image?.image?.src) {
        return
      }

      return {
        src: this.image?.image?.src,
        loading: this.image?.placeholder?.src,
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.header-container {
  .image-moon {
    position: absolute;
    top: 5vw;
    right: 5vw;
    display: none;
    height: 20vh;

    @media (min-width: 1800px) {
      display: block;
    }
  }

  .header {
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    justify-content: center;
    margin-bottom: 2em;
    padding: 0 2em;

    .header-image {
      display: block;
      margin: 0 1em;
      margin-left: 1em;
      border: none;

      .image-header {
        min-width: 200px;
        height: 200px;
        margin: auto;
      }
    }

    .header-title {
      margin-top: 1em;
      margin-right: 1em;
      text-align: left;

      .title {
        font-size: 4rem;
      }
    }

    &.without-image {
      flex-direction: row;
      justify-content: center;

      .header-title {
        max-width: 550px;
      }
    }

    @media (min-width: 1800px) {
      flex-direction: row;

      .header-image {
        display: none;
      }
    }

    @media (max-width: theme('screens.lg')) {
      flex-direction: column;
      padding: 0 1em;

      .header-image {
        margin: 0;
        .image-header {
          margin: 0;
        }
      }
    }
  }

  &.centered .header {
    justify-content: center;
  }
}
</style>
