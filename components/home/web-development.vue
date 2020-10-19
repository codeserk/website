<template>
  <div class="web-development content">
    <div class="frontend block skew with-shadow-left">
      <h3 class="title">Frontend</h3>

      <div class="wrapper">
        <section>
          <h4>Frameworks</h4>
          <item
            v-for="framework in frontendFrameworks"
            :key="framework.id"
            v-bind="framework"
            :link="`/framework/${framework.slug}`"
            class="framework item"
          />
        </section>

        <section>
          <h4>Technologies</h4>
          <item
            v-for="technology in frontendTechnologies"
            :key="technology.id"
            v-bind="technology"
            :link="`/technology/${technology.slug}`"
            class="technology item"
          />
        </section>
      </div>
    </div>
    <div class="devops block with-shadow-center">
      <h3 class="title">Dev Ops</h3>

      <div class="wrapper">
        <section>
          <h4>Technologies</h4>
          <item
            v-for="technology in devOpsTechnologies"
            :key="technology.id"
            v-bind="technology"
            :link="`/technology/${technology.slug}`"
            class="technology item"
          />
        </section>
      </div>
    </div>
    <div class="backend block skew-right with-shadow-right">
      <h3 class="title">Backend</h3>

      <div class="wrapper">
        <section>
          <h4>Frameworks</h4>
          <item
            v-for="framework in backendFrameworks"
            :key="framework.id"
            v-bind="framework"
            :link="`/framework/${framework.slug}`"
            class="framework item"
          />
        </section>

        <section>
          <h4>Databases</h4>
          <item
            v-for="database in sortedDatabases"
            :key="database.id"
            v-bind="database"
            :link="`/database/${database.slug}`"
            class="database item"
          />
        </section>

        <section>
          <h4>Message Brokers</h4>
          <item
            v-for="broker in sortedMessageBrokers"
            :key="broker.id"
            v-bind="broker"
            :link="`/message-broker/${broker.slug}`"
            class="broker item"
          />
        </section>

        <section>
          <h4>Technologies</h4>
          <item
            v-for="technology in backendTechnologies"
            :key="technology.id"
            v-bind="technology"
            :link="`/technology/${technology.slug}`"
            class="technology item"
          />
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

function excludeDeprecated(item) {
  return item.status !== 'deprecated'
}

export default Vue.extend({
  components: {
    Item: () => import('./web-development/item.vue'),
  },

  props: {
    frameworks: {
      type: Array,
      default: () => [],
    },

    databases: {
      type: Array,
      default: () => [],
    },

    technologies: {
      type: Array,
      default: () => [],
    },

    messageBrokers: {
      type: Array,
      default: () => [],
    },
  },

  computed: {
    sortedFrameworks() {
      return [...this.frameworks]
        .filter(excludeDeprecated)
        .sort((frameworkA, frameworkB) => frameworkA.order - frameworkB.order)
    },

    frontendFrameworks() {
      return this.sortedFrameworks.filter(language => language.kind === 'frontend')
    },

    backendFrameworks() {
      return this.sortedFrameworks.filter(language => language.kind === 'backend')
    },

    sortedTechnologies() {
      return [...this.technologies]
        .filter(excludeDeprecated)
        .sort((technologyA, technologyB) => technologyA.order - technologyB.order)
    },

    frontendTechnologies() {
      return this.sortedTechnologies.filter(technology => technology.scopes?.includes('frontend'))
    },

    devOpsTechnologies() {
      return this.sortedTechnologies.filter(technology => technology.scopes?.includes('devops'))
    },

    backendTechnologies() {
      return this.sortedTechnologies.filter(technology => technology.scopes?.includes('backend'))
    },

    sortedDatabases() {
      return [...this.databases]
        .filter(excludeDeprecated)
        .sort((databaseA, databaseB) => databaseA.order - databaseB.order)
    },

    sortedMessageBrokers() {
      return [...this.messageBrokers]
        .filter(excludeDeprecated)
        .sort((brokerA, brokerB) => brokerA.order - brokerB.order)
    },
  },
})
</script>

<style lang="scss" scoped>
.web-development {
  display: flex;
  align-items: flex-start;
  justify-content: center;

  .block {
    flex: 1;
    max-width: 420px;
    margin: 8px 12px;
    margin-bottom: 2em;

    .wrapper {
      padding: 1em 1.5em 1em 1em;
    }

    section {
      margin-bottom: 1.5em;
      border-bottom: 1px solid white;

      h4 {
        font-size: 1.2em;
      }

      &:last-child {
        border: none;
      }
    }
  }

  .item {
    margin-bottom: 1.5em;
  }

  @media (max-width: theme('screens.md')) {
    flex-direction: column;
    align-items: center;
    justify-items: center;

    .block {
      flex: 1;
      width: 100%;
      max-width: 600px;
      margin: 1rem auto;
      transform: skewY(-3deg) translate3d(0, 1rem, 0);
    }
  }
}
</style>
