<template>
  <div
    :data-aos-delay="100 * (index % 3)"
    :class="{ 'has-image': !!lazyImage }"
    :data-aos="aos ? 'appear' : null"
    class="challenge with-shadow-left"
  >
    <div class="buttons">
      <svg xmlns="http://www.w3.org/2000/svg" width="54" height="14" viewBox="0 0 54 14">
        <g fill="none" fill-rule="evenodd" transform="translate(1 1)">
          <circle cx="6" cy="6" r="6" fill="#FF5F56" stroke="#E0443E" stroke-width=".5"></circle>
          <circle cx="26" cy="6" r="6" fill="#FFBD2E" stroke="#DEA123" stroke-width=".5"></circle>
          <circle cx="46" cy="6" r="6" fill="#27C93F" stroke="#1AAB29" stroke-width=".5"></circle>
        </g>
      </svg>
    </div>
    <nuxt-link :to="link" class="challenge-content">
      <component :is="heading" v-text="title" class="title" />
      <div class="language-container">
        <span class="code">&lt;&gt;</span>
        <span class="language">TypeScript</span>
      </div>
    </nuxt-link>
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

    aos: {
      type: Boolean,
      default: false,
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
.challenge {
  position: relative;
  display: block;
  width: 450px;
  height: 300px;
  margin: 1em 2em;
  text-align: center;
  background: #273238;
  border-radius: 8px;
  transition: background 0.4s ease-in-out;
  padding: 1em;

  .challenge-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    height: 100%;

    .title {
      font-size: 2em;
      line-height: 1em;
      text-align: center;
      color: #deca72;
    }

    .language-container {
      width: 100%;
      text-align: right;
      margin-right: 2em;
      margin-top: 0.5em;
      justify-content: space-evenly;
      font-size: 1.25em;

      .code {
        color: #c695e8;
      }
      .language {
        color: white;
      }
    }
  }

  &:hover {
    background: darken(#273238, 5%);
  }
}

@media (max-width: theme('screens.lg')) {
  .challenge {
    width: 350px;

    .challenge-content {
      font-size: 0.9em;
    }
  }
}

@media (max-width: theme('screens.sm')) {
  .challenge {
    margin: 1em;
    min-height: 300px;
    height: auto;

    .challenge-content {
      font-size: 0.8em;
    }
  }
}
</style>
