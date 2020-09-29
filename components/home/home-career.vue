<template>
  <div class="career page-wrapper full color">
    <div class="container skew mx-auto">
      <div v-for="item in items" :key="item.id" class="item content">
        <div class="block left">
          <h2 v-text="item.title" />

          <section>
            <dl>
              <dt>Position</dt>
              <dd v-text="item.position" />
            </dl>
          </section>
        </div>
        <div class="block right">
          <dom-content v-bind="item.dom" class="mx-auto" aos="fade-up" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    DomContent: () => import('~/components/dom/dom-content')
  },

  props: {
    /** Carrer items (jobs / conferences) */
    career: {
      type: Array,
      default: () => ([])
    }
  },

  computed: {
    items () {
      return [...this.career]
        .sort((itemA, itemB) => new Date(itemB.startDate) - new Date(itemA.startDate))
    }
  }
}
</script>

<style lang="scss" scoped>
.page-wrapper {
  position: relative;
padding: 4rem 0;
}
.container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: center;
  height: 100%;

  &:before {
    content: '';
    position: absolute;
    top: -50px;
    bottom: -200px;
    left: 0;
    margin-left: calc(30% - 32px);
    border-right: 8px solid white;
    z-index: -1;
  }

  .item {
    position: relative;
    flex: 1;
    justify-content: space-between;
    display: bolck;
    margin: 2em 0;

    &:before {
      content: '';
      position: absolute;
      top: 50px;
      left: 100px;
      right: 100px;
      border-bottom: 8px solid white;
      z-index: -1;
    }

    .block {
      &.left {
        width: 30%;
        float: left;
      }
      &.right {
        width: 65%;
        float: right;
      }
    }
  }
}
</style>
