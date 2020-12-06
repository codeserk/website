<template>
  <term-chip :id="attributes.href" />
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
