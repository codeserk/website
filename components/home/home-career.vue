<template>
  <div class="container skew mx-auto">
    <div v-for="item in items" :key="item.id" class="item">
      <span v-if="item.endDate" v-text="item.endDate" class="end-date" />
      <span v-else v-text="'Now'" class="end-date" />

      <div class="period">
        <span class="bar-above" />
        <span v-text="item.period" class="period-text" />
        <span class="bar-below" />
      </div>

      <div class="block left with-shadow-left">
        <router-link :to="`/career/${item.slug}`">
          <h3 v-text="item.title" class="title" />
        </router-link>

        <section>
          <div :class="{ 'no-position': !item.position }" class="item-header">
            <span v-text="item.period" class="period-text" />
            <span v-text="item.position" class="position" />
          </div>

          <div class="areas chip-container">
            <chip
              v-for="area in item.areas"
              :key="area.id"
              :slug="area.slug"
              :text="area.name"
              type="development-area"
            />
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
            <chip
              v-for="broker in item.brokers"
              :key="broker.id"
              :slug="broker.slug"
              :text="broker.name"
              type="broker"
            />
          </div>

          <div class="technologies chip-container">
            <chip
              v-for="technology in item.technologies"
              :key="technology.id"
              :text="technology.name"
              type="technology"
            />
          </div>
        </section>
      </div>
      <div class="block with-small-padding right with-shadow-left">
        <dom-content v-bind="item.dom" class="mx-auto" aos="fade-up" />
      </div>

      <span v-if="item.startDate" v-text="item.startDate" class="start-date" />
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { sortByDate, sortByOrder } from '../../utils/sort'

export default {
  components: {
    DomContent: () => import('~/components/dom/dom-content'),
    Chip: () => import('~/components/chip'),
  },

  props: {
    /** Career items (jobs / conferences) */
    career: {
      type: Array,
      default: () => [],
    },
  },

  computed: {
    items() {
      return [...this.career].sort(sortByDate('startDate')).map(item => {
        const startDate = moment(item.startDate)
        const endDate = item.endDate ? moment(item.endDate) : undefined
        const years = endDate ? endDate.diff(startDate, 'years') : moment().diff(startDate, 'years')
        const months = endDate ? endDate.diff(startDate, 'months') % 12 : moment().diff(startDate, 'months') % 12

        const timeParts = []
        if (years > 0) {
          timeParts.push(`${years} years`)
        }
        if (months > 0) {
          timeParts.push(`${months} months`)
        }
        const period = timeParts.join(', ')

        return {
          ...item,
          startDate: startDate.format('DD/MM/YYYY'),
          endDate: endDate ? endDate.format('DD/MM/YYYY') : '',
          years,
          months,
          period,

          areas: item.areas.sort(sortByOrder),
          languages: item.languages.sort(sortByOrder),
          frameworks: item.frameworks.sort(sortByOrder),
          databases: item.databases.sort(sortByOrder),
          brokers: item.brokers.sort(sortByOrder),
          technologies: item.technologies.sort(sortByOrder),
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: center;

  &::before {
    content: '';
    position: absolute;
    top: -50px;
    bottom: -50px;
    left: 0;
    z-index: -1;
    margin-left: calc(30% - 32px);
    border-right: 8px solid white;
  }

  .item {
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
      width: calc(30% - 48px);
      min-width: 5em;
      text-align: right;

      &::after {
        right: -11px;
      }
    }
    .end-date {
      top: 0;
      left: calc(30% - 48px);

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
      z-index: -1;
      border-bottom: 8px solid white;
    }

    .chip-container {
      margin-bottom: 1em;
    }

    .block {
      &.left {
        float: left;
        width: 40%;
        padding: 0;

        section {
          padding: 1em 1.5em 1em 1em;
        }
      }
      &.right {
        float: right;
        width: 55%;
      }
    }
  }

  @media (max-width: theme('screens.sm')) {
    .period {
      display: none;
    }

    .item {
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
    }
  }

  @media (max-width: theme('screens.lg')) {
    &::before {
      margin-left: calc(50% - 32px);
    }

    .item {
      .block.left {
        float: none;
        width: 90%;
      }
      .block.right {
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
}
</style>
