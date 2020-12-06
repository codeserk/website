<template>
  <component :is="component" v-bind="{ ...$props, ...attributes }" :style="attributes.style" class="dom" />
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
      if (['h1', 'h2', 'h3', 'h4'].includes(this.tag)) {
        return 'dom-subtitle'
      }
      if (this.tag === 'img') {
        return 'dom-image'
      }
      if (this.tag === 'a') {
        if (this.hasTerm(this.attributes.href)) {
          return 'dom-term'
        }

        return 'dom-link'
      }
      if (this.text) {
        return 'dom-text'
      }

      return 'dom-default'
    },
  },
}
</script>
