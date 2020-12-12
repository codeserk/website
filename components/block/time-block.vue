<template>
  <div class="time-block-container">
    <div class="time-block">
      <span v-if="endDate" v-text="endDateText" class="end-date" />
      <span v-else-if="startDate" v-text="'Now'" class="end-date" />

      <div v-if="period" class="period">
        <span class="bar-above" />
        <span v-text="period" class="period-text" />
        <span class="bar-below" />
      </div>

      <div :class="{ 'with-small-padding': withPaddingLeft }" class="block skew left with-shadow-left">
        <slot :period="period" name="left-block" />
      </div>

      <div class="right">
        <div :class="{ 'with-small-padding': withPaddingRight }" class="block with-shadow-left">
          <slot name="right-block" />
        </div>

        <slot name="right" />
      </div>

      <span v-if="startDate" v-text="startDateText" class="start-date" />
    </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  props: {
    startDate: {
      type: String,
      default: null,
    },

    endDate: {
      type: String,
      default: null,
    },

    withPaddingLeft: {
      type: Boolean,
      default: false,
    },
    withPaddingRight: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    startDateText() {
      if (!this.startDate) {
        return
      }

      return moment(this.startDate).format('DD/MM/YYYY')
    },

    endDateText() {
      if (!this.endDate) {
        return
      }

      return moment(this.endDate).format('DD/MM/YYYY')
    },

    period() {
      const startDate = moment(this.startDate)
      const endDate = this.endDate ? moment(this.endDate) : undefined
      const years = endDate ? endDate.diff(startDate, 'years') : moment().diff(startDate, 'years')
      const months = endDate ? endDate.diff(startDate, 'months') % 12 : moment().diff(startDate, 'months') % 12
      const days = endDate ? endDate.diff(startDate, 'days') % 365 : moment().diff(startDate, 'days') % 365

      const timeParts = []
      if (years > 0) {
        timeParts.push(years > 1 ? `${years} years` : `${years} year`)
      }
      if (months > 0) {
        timeParts.push(months > 1 ? `${months} months` : `${months} month`)
      }
      if (years === 0 && months === 0) {
        timeParts.push(days > 1 ? `${days} days` : `${days} day`)
      }

      return timeParts.join(', ')
    },
  },
}
</script>

<style lang="scss" scoped>
.time-block-container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: center;
  margin-top: 2em;
  margin-bottom: 3em;

  &::before {
    content: '';
    position: absolute;
    top: -30px;
    bottom: -30px;
    left: 0;
    margin-left: calc(30% - 32px);
    border-right: 8px solid white;
  }

  .time-block {
    position: relative;
    display: block;
    flex: 1;
    justify-content: space-between;
    margin: 2em 0;
    padding: 3.5em 0;

    .item-header {
      margin-bottom: 1em;
      padding-bottom: 0.5em;
      border-bottom: 1px solid white;

      &.no-position {
        display: none;
      }
    }
    .position {
      display: block;
      font-size: 1.1em;
    }
    .period-text {
      display: none;
    }

    .period {
      position: absolute;
      top: 10px;
      bottom: 10px;
      left: -48px;
      z-index: 2;
      width: 24px;
      text-align: center;

      .period-text {
        position: absolute;
        top: calc(50% + 5em);
        display: block;
        width: 10em;
        color: white;
        text-align: center;
        transform: rotate(-90deg);
        transform-origin: 0 0;
      }

      .bar-above {
        position: absolute;
        top: 0;
        bottom: calc(50% + 5em);
        left: 15px;
        display: block;
        border-left: 2px solid white;

        &::after {
          content: '';
          position: absolute;
          top: 4px;
          left: -6px;
          width: 40px;
          border-top: 2px solid white;
        }
      }
      .bar-below {
        position: absolute;
        top: calc(50% + 5em);
        bottom: -24px;
        left: 15px;
        display: block;
        border-left: 2px solid white;

        &::after {
          content: '';
          position: absolute;
          bottom: 4px;
          left: -6px;
          width: 40px;
          border-top: 2px solid white;
        }
      }
    }

    .start-date,
    .end-date {
      position: absolute;
      padding: 0 1em;
      font-size: 1.5em;

      &::after {
        content: '';
        position: absolute;
        top: calc(50% - 10px);
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: white;
      }
    }

    .start-date {
      bottom: -1em;
      left: 0;
      width: calc(30% - 29px);
      min-width: 5em;
      text-align: right;

      &::after {
        right: -11px;
      }
    }
    .end-date {
      top: 0;
      left: calc(30% - 29px);

      &::after {
        left: -9px;
      }
    }

    &::before {
      content: '';
      position: absolute;
      top: 100px;
      right: 100px;
      left: 100px;
      border-bottom: 8px solid white;
    }

    .chip-container {
      margin-bottom: 1em;
    }

    .left {
      float: left;
      width: 40%;

      section {
        padding: 1em 1.5em 1em 1em;
      }
    }
    .right {
      float: right;
      width: 55%;

      .block {
        margin-bottom: 2em;
      }
    }
  }

  @media (max-width: theme('screens.lg')) {
    &::before {
      margin-left: calc(50% - 32px);
    }

    .time-block {
      .block.left {
        float: none;
        width: 90%;
      }
      .right {
        width: 90%;
        margin-top: 2ch;
      }

      &::before {
        display: none;
      }

      .start-date {
        width: calc(50% - 30px);
      }
      .end-date {
        left: calc(50% - 30px);
      }
    }
  }

  @media (max-width: theme('screens.sm')) {
    .period {
      display: none;
    }

    .time-block {
      .item-header {
        display: block !important;
      }
      .period-text {
        display: block;
      }

      .start-date,
      .end-date {
        font-size: 1.25rem;
      }

      .block.left {
        width: 100%;
      }
      .right {
        width: 100%;
      }
    }
  }
}
</style>
