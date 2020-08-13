<template>
  <div
    v-lazy-container="{ selector: 'img' }"
    :class="{ 'image-placeholder--rounded': rounded, }"
    :style="{
      width: width ? `${width}px` : '',
      height: height ? `${height}px` : '',
      background,
    }"
    class="image-placeholder image-container obect-center"
  >
    <img
      :data-src="src"
      :data-loading="placeholder"
      :class="classes"
      :width="width"
      :height="height"
      :alt="alt"
      :title="alt"
      :style="{ 'object-fit': fit }"
      draggable="false"
      class="object-center"
    />
  </div>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    source: {
      type: String,
      default: ''
    },
    alt: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: ''
    },
    height: {
      type: String,
      default: ''
    },
    classes: {
      type: String,
      default: ''
    },
    background: {
      type: String,
      default: ''
    },
    fit: {
      type: String,
      default: 'contain',
      enum: () => ['cover', 'contain', 'fit']
    },
    rounded: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped lang="scss">
.image-placeholder {
  overflow: hidden;
  line-height: 0;
  &--rounded {
    border-radius: 100%;
    img {
      border-radius: 100%;
    }
  }
  overflow: hidden;
  width: auto;
}
img {
  border-radius: inherit !important;

  width: 100%;
  height: 100%;

  transition: filter ease-in-out 1s, opacity ease-in-out 0.4s;
  opacity: 0;
  filter: blur(8px);

  &[lazy='loading'] {
    opacity: 0.9;
    filter: blur(8px);
  }
  &[lazy='loaded'] {
    opacity: 1;
    filter: blur(0px);
  }

  &:hover {
    filter: blur(0px) brightness(1.05);
  }
}
</style>
