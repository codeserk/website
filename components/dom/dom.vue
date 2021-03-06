<template>
  <component
    :is="component"
    v-bind="{ ...$props, ...attributes }"
    :style="attributes.style"
    :level="level"
    :class="`dom-level-${level}`"
    class="dom "
  />
</template>

<script>
export default {
  name: 'Dom',

  components: {
    DomDefault: () => import('./dom-default'),
    DomSubtitle: () => import('./dom-subtitle'),
    DomImage: () => import('./dom-image'),
    DomText: () => import('./dom-text'),
    DomLink: () => import('./dom-link'),
    DomCode: () => import('./dom-code'),
    DomTerm: () => import('./dom-term'),

    // Special components
    Chip: () => import('~/components/chip'),
    Card: () => import('~/components/card'),
  },

  props: {
    tag: {
      type: String,
      default: 'div',
    },

    children: {
      type: Array,
      default: () => [],
    },

    text: {
      type: String,
      default: '',
    },

    attributes: {
      type: Object,
      default: () => ({}),
    },

    maxParagraphs: {
      type: Number,
      default: null,
    },

    level: {
      type: Number,
      default: 0,
    },

    aos: {
      type: String,
      default: 'appear',
    },
  },

  computed: {
    isText() {
      return !!this.text
    },

    component() {
      if (this.tag === 'img') {
        return 'dom-image'
      }
      if (this.tag === 'a') {
        if (this.hasTerm(this.attributes.href)) {
          return 'dom-term'
        }

        return 'dom-link'
      }
      if (this.tag === 'pre' && this.text.startsWith('<code')) {
        return 'dom-code'
      }
      if (this.text) {
        return 'dom-text'
      }

      return 'dom-default'
    },
  },
}
</script>
