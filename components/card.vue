<template>
  <div
    :data-aos-delay="100 * (index % 3)"
    :class="{ 'has-image': !!lazyImage }"
    @click="$router.push(link)"
    class="card block borderless with-shadow-left"
    data-aos="appear"
  >
    <nuxt-link :to="link"><component :is="heading" v-text="title" class="title"/></nuxt-link>
    <div class="card-content">
      <img v-lazy="lazyImage" class="image lazy" />
      <div class="description">
        <progress-bar v-if="status" :progress="progress" :text="status" class="progress" />
        <div class="extra-content">
          <slot />
        </div>

        <div class="fill" />
        <p v-if="summary" v-text="summary" class="summary" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    ProgressBar: () => import('~/components/progress-bar'),
  },

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
  width: 300px;
  margin: 2em 1em;
  background: transparent;
  cursor: pointer;
  transition: transform 0.4s ease-in-out;
  transform-origin: center;

  .title {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .card-content {
    position: relative;
    // background: white;
    overflow: hidden;
    height: 290px;
    background-size: cover;
    background-repeat: no-repeat;

    .description {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      display: flex;
      flex-direction: column;
      padding: 1em;
      background: #1113;
      transition: all 0.4s ease-in-out;

      .progress {
        width: 120px;
        margin-bottom: 0.5em;
        transition: transform 0.4s ease-in-out;
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
      top: 1em;
      right: 1em;
      width: 100px;
      height: 100px;
      border-radius: 12px;
    }
  }
  &:hover {
    transform: scale3d(1.1, 1.1, 1.1);
  }

  // &.has-image .description:hover {
  //   background: transparent;

  //   .progress,
  //   .extra-content {
  //     transform: translate3d(0, -200px, 0);
  //   }
  //   .summary {
  //     transform: translate3d(0, 200px, 0);
  //   }
  // }
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
