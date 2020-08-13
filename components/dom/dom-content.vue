<template>
  <div :data-aos="aos" class="content">
    <dom :is="component" v-bind="$props" :style="attributes.style" />
  </div>
</template>

<script>
import Dom from './dom'

export default {
  name: 'DomText',

  extends: Dom
}
</script>
