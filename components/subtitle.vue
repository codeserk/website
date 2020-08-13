<template>
  <div :class="{ 'subtitle-container--sticky': sticky }" class="subtitle-container" data-aos="fade">
    <router-link
      v-if="link"
      :to="link"
      class="subtitle flex my-6 align-center justify-around category-header"
    >
      <component :is="tag" v-text="title" class="p-6 bg-white text-lg uppercase" />
      <div v-if="image" class="px-4 bg-white">
        <image-responsive
          :source="image"
          width="80"
          container-width="80"
          container-height="80"
          height="80"
          fit="contain"
          rounded
        />
      </div>
    </router-link>
    <div
      v-else
      class="subtitle flex my-6 align-center justify-around category-header"
    >
      <component :is="tag" v-text="title" class="p-6 bg-white text-lg uppercase" />
      <div v-if="image" class="px-4 bg-white">
        <image-responsive
          :source="image"
          width="80"
          container-width="80"
          container-height="80"
          height="80"
          fit="contain"
          rounded
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    sticky: {
      type: Boolean,
      default: false
    },
    link: {
      type: String,
      required: false,
      default: ''
    },

    title: {
      type: String,
      default: ''
    },

    tag: {
      type: String,
      default: 'h2'
    },

    image: {
      type: String,
      required: false,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~/assets/css/colors";

.subtitle-container--sticky {
  position: -webkit-sticky;
  position: sticky;
  top: 0px;
  background: white;
  z-index: 1;
}
.subtitle {
  position: relative;
  margin-bottom: 0px;

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    border-bottom: 1px solid $color-grey;
    left: 0;
    right: 0;
    z-index: -1;
  }

  h2 {
    background: white;
    color: $color-grey;
    padding: 0.5em 1em;
    line-height: 40px;
    margin-bottom: 0;
    font-size: 3rem;
  }

  h3 {
    background: white;
    color: $color-grey;
    padding: 0.5em 1em;
    line-height: 40px;
    margin-bottom: 0;
    font-size: 2rem;
    margin-left: 1em;
    margin-right: 1em;
  }
}
</style>
