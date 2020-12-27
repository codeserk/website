<template>
  <div class="single-time-block-container">
    <div class="single-time-block">
      <span v-if="date" v-text="dateText" class="date" />

      <div :class="{ 'with-small-padding': withPadding }" class="block skew left with-shadow-left">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  props: {
    date: {
      type: String,
      default: null,
    },

    withPadding: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    dateText() {
      if (!this.date) {
        return
      }

      return moment(this.date).format('DD/MM/YYYY')
    },
  },
}
</script>

<style lang="scss" scoped>
.single-time-block-container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: center;
  margin-top: 0;
  margin-bottom: 0;

  &::before {
    content: '';
    position: absolute;
    top: -30px;
    bottom: -30px;
    left: 0;
    margin-left: calc(30% - 32px);
    border-right: 8px solid white;
  }

  .single-time-block {
    position: relative;
    display: block;
    flex: 1;
    justify-content: space-between;
    margin: 1em 0;
    padding: 2.5em 0 0;

    .date {
      position: absolute;
      top: 0;
      left: calc(30% - 29px);
      padding: 0 1em;
      font-size: 1.5em;

      &::after {
        content: '';
        position: absolute;
        top: calc(50% - 10px);
        left: -9px;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: white;
      }
    }

    .chip-container {
      margin-bottom: 1em;
    }

    .left {
      float: left;
      width: 40%;
      min-height: 100px;
      margin-left: 20%;

      section {
        padding: 1em 1.5em 1em 1em;
      }
    }
  }

  @media (max-width: theme('screens.lg')) {
    &::before {
      margin-left: calc(50% - 32px);
    }

    .single-time-block {
      .block.left {
        float: none;
        width: 100%;
        margin-left: 0;
        transform: skewY(-1deg);
      }

      .date {
        left: calc(50% - 30px);
      }
    }
  }

  @media (max-width: theme('screens.sm')) {
    .single-time-block {
      .date {
        font-size: 1.25rem;
      }

      .block.left {
        width: 100%;
      }
    }
  }
}
</style>
