<template>
  <div class="terms-map">
    <div class="areas chip-container">
      <chip v-for="area in item.areas" :key="area.id" :slug="area.slug" :text="area.name" type="development-area" />
    </div>

    <div class="languages chip-container">
      <chip
        v-for="language in item.languages"
        :key="language.id"
        :slug="language.slug"
        :text="language.name"
        type="language"
      />
    </div>

    <div class="frameworks chip-container">
      <chip
        v-for="framework in item.frameworks"
        :key="framework.id"
        :slug="framework.slug"
        :text="framework.name"
        type="framework"
      />
    </div>

    <div class="databases chip-container">
      <chip
        v-for="database in item.databases"
        :key="database.id"
        :slug="database.slug"
        :text="database.name"
        type="database"
      />
    </div>

    <div class="brokers chip-container">
      <chip v-for="broker in item.brokers" :key="broker.id" :slug="broker.slug" :text="broker.name" type="broker" />
    </div>

    <div class="technologies chip-container">
      <chip v-for="technology in item.technologies" :key="technology.id" :text="technology.name" type="technology" />
    </div>
  </div>
</template>

<script>
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
}
</script>

<style lang="scss" scoped>
.chip-container {
  margin-bottom: 1em;

  &:last-child {
    margin-bottom: 0;
  }
}
</style>
