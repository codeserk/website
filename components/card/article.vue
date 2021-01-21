<template>
  <div
    :data-aos-delay="100 * (index % 3)"
    :class="{ 'has-image': !!lazyImage }"
    class="card article with-shadow-left"
    data-aos="appear"
  >
    <nuxt-link :to="link" class="image">
      <img v-lazy="lazyImage" :alt="`${title} logo`" />
    </nuxt-link>
    <div class="card-content lazy-background">
      <div class="description">
        <div class="fill" />
        <component :is="heading" v-text="title" class="title" />
        <p v-if="summary" v-text="summary" class="summary" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    index: {
      type: Number,
      default: 0,
    },
    title: {
      type: String,
      default: '',
    },

    heading: {
      type: String,
      default: 'h2',
    },

    link: {
      type: String,
      default: '/',
    },

    image: {
      type: Object,
      default: () => null,
    },

    progress: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      default: null,
    },

    summary: {
      type: String,
      default: '',
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
.card {
  display: block;
  width: 450px;
  margin: 1em 2em;
  text-align: center;

  .title {
  }

  .image {
    display: inline-block;
    margin: auto;
    text-align: center;

    img {
      width: 290px;
      height: 290px;
      image-rendering: pixelated;
    }
  }

  .card-content {
    position: relative;
    overflow: hidden;

    .description {
      display: flex;
      flex-direction: column;
      padding: 1em;
      text-align: left;

      .title {
        font-size: 1.5em;
        text-align: center;
      }

      .extra-content {
        transition: transform 0.4s ease-in-out;
      }
      .areas {
        transition: transform 0.4s ease-in-out;
      }

      .fill {
        flex: 1;
      }

      .summary {
        transition: transform 0.4s ease-in-out;
      }
    }

    .image {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }
  }
}

@media (max-width: theme('screens.lg')) {
  .card {
    width: 250px;

    .card-content {
      height: 240px;
      font-size: 0.9em;
    }
  }
}

@media (max-width: theme('screens.xs')) {
  .card {
    width: 400px;

    .card-content {
      height: 390px;
      font-size: 0.9em;
    }
  }
}
</style>
