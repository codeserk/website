<template>
  <div class="dual-blocks-container">
    <div class="dual-blocks">
      <div :class="{ 'with-small-padding': withPaddingLeft }" class="block skew left with-shadow-left">
        <slot name="left-block" />
      </div>

      <div class="right">
        <div :class="{ 'with-small-padding': withPaddingRight }" class="block with-shadow-left">
          <slot name="right-block" />
        </div>

        <slot name="right" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    withPaddingLeft: {
      type: Boolean,
      default: false,
    },
    withPaddingRight: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="scss" scoped>
.dual-blocks-container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: center;

  &::before {
    content: '';
    position: absolute;
    top: 100px;
    right: 100px;
    left: 100px;
    border-bottom: 8px solid white;
  }

  .dual-blocks {
    position: relative;
    display: block;
    flex: 1;
    justify-content: space-between;
    margin: 2em 0;

    .item-header {
      margin-bottom: 1em;
      padding-bottom: 0.5em;
      border-bottom: 1px solid white;
    }

    .left {
      float: left;
      width: 30%;

      section {
        padding: 1em 1.5em 1em 1em;
      }
    }
    .right {
      float: right;
      width: 65%;

      .block {
        margin-bottom: 2em;
      }
    }
  }

  @media (max-width: theme('screens.sm')) {
    .dual-blocks {
      .item-header {
        display: block !important;
      }
    }
  }

  @media (max-width: theme('screens.lg')) {
    .dual-blocks {
      .block.left {
        float: none;
        width: 90%;
      }
      .right {
        width: 90%;
        margin-top: 2ch;
      }

      &::before {
        content: '';
        position: absolute;
        top: -30px;
        bottom: -30px;
        left: 0;
        margin-left: calc(30% - 32px);
        border-right: 8px solid white;
      }
    }
  }
}
</style>
