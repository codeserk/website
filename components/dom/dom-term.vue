<template>
  <term-chip :id="attributes.href" :text="text" />
</template>

<script>
import Dom from './dom'

export default {
  name: 'DomChip',

  components: {
    TermChip: () => import('~/components/term-chip'),
  },

  extends: Dom,
}
</script>
