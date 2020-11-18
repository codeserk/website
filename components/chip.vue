<template>
  <router-link :to="link" v-text="text" :class="classes" class="chip" />
</template>

<script>
export default {
  props: {
    slug: {
      type: String,
      default: '',
    },

    text: {
      type: String,
      default: '',
    },

    type: {
      type: String,
      default: '',
    },
  },

  computed: {
    link() {
      return `/${this.type}/${this.slug}`
    },

    classes() {
      return [this.type.toLowerCase(), this.text.toLowerCase()]
    },
  },
}
</script>

<style lang="scss" scoped>
.chip {
  display: inline-block;
  margin: 0 4px 4px 0;
  padding: 0 8px;
  border: 1px solid white;
  border-radius: 4px;
  background: white;
  color: white;
  text-transform: uppercase;

  &.development {
    background: #333;
  }

  &.language {
    background: #3509a8;
  }

  &.framework {
    background: #008e67;
  }

  &.database {
    background: #f35d00;
  }

  &.message-broker {
    background: #0932a3;
  }

  &.technology {
    background: #ac0034;
  }
}
</style>
