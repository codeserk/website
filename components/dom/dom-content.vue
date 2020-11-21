<template>
  <div class="dom-content content">
    <dom :is="component" v-bind="{ ...$props, ...attributes }" />
  </div>
</template>

<script>
import Dom from './dom'

export default {
  name: 'DomContent',

  extends: Dom,
}
</script>
