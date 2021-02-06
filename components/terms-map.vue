<template>
  <div class="terms-map">
    <div v-for="type in typesWithItems" :key="type.id" :class="[type.id, 'chip-container']">
      <chip
        v-for="(chip, index) in item[type.field]"
        :key="chip.id"
        :slug="chip.slug"
        :text="chip.name"
        :type="type.id"
        :data-aos-delay="100 * index"
        data-aos="appear"
      />
    </div>
  </div>
</template>

<script>
const types = [
  { id: 'development', field: 'areas' },
  { id: 'language', field: 'languages' },
  { id: 'framework', field: 'frameworks' },
  { id: 'database', field: 'databases' },
  { id: 'message-broker', field: 'brokers' },
  { id: 'technology', field: 'technologies' },
]

export default {
  components: {
    chip: () => import('~/components/chip'),
  },

  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
  },

  data: () => ({
    types,
  }),

  computed: {
    typesWithItems() {
      return this.types.filter(type => !!this.item[type.field] && this.item[type.field].length > 0)
    },
  },
}
</script>

<style lang="scss" scoped>
.chip-container {
  margin-bottom: 1em;

  &:last-child {
    margin-bottom: 0;
  }
}

.terms-map.inline .chip-container {
  display: inline;
}
</style>
