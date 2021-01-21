<template>
  <div class="dual-blocks-container">
    <div class="dual-blocks">
      <div class="left">
        <div :class="{ 'with-small-padding': withPaddingLeft }" class="block skew with-shadow-left">
          <slot name="left-block" />
        </div>

        <slot name="left" />
      </div>

      <div class="right">
        <div :class="{ 'with-small-padding': withPaddingRight }" class="block with-shadow-left">
          <slot name="right-block" />
        </div>

        <slot name="right" />
      </div>

      <div class="left-bottom">
        <slot name="left-bottom" />
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

    .left,
    .left-bottom {
      float: left;
      width: 30%;

      section {
        padding: 1em 1.5em 1em 1em;
      }

      .block {
        &::after {
          content: '';
          position: absolute;
          bottom: 20px;
          right: -20%;
          left: 100%;
          border-bottom: 8px solid white;
        }
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

      .left,
      .left-botom {
        width: 100%;
      }
      .right {
        width: 100%;
      }
    }
  }

  @media (max-width: theme('screens.lg')) {
    .dual-blocks {
      .left {
        float: none;
        width: 100%;
      }
      .left-bottom {
        width: 100%;
      }
      .right {
        width: 100%;
        margin-top: 2ch;
      }

      .block {
        &::after {
          display: none;
        }
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
