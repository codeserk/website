<template>
  <dom
    :class="`dome-level-${level}`"
    :is="component"
    v-bind="$props"
    :level="level"
    class="dom-content content break content-break"
  />
</template>

<script>
import Dom from './dom'

export default {
  name: 'DomContent',

  extends: Dom,
}
</script>
