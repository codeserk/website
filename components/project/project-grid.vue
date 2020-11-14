<template>
  <div class="projects clearfix">
    <div
      v-for="(project, index) in sortedProjects"
      :key="project.id"
      :class="{ 'has-icon': !!project.icon }"
      :data-aos-delay="100 * (index % 3)"
      class="block with-shadow-left clearfix"
      data-aos="fade-up"
    >
      <nuxt-link :to="project.link"><h3 v-text="project.title" class="title"/></nuxt-link>
      <div v-lazy:background-image="project.icon" class="project-content">
        <div class="description">
          <progress-bar :progress="project.progress" :text="project.status" class="progress" />
          <div class="areas chip-container">
            <chip
              v-for="area in project.areas"
              :key="area.id"
              :slug="area.slug"
              :text="area.name"
              type="development-area"
            />
          </div>

          <div class="fill" />
          <p v-if="project.excerpt" v-text="project.excerpt" class="excerpt" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { sortByOrder } from '../../utils/sort'

export default {
  components: {
    Chip: () => import('~/components/chip'),
    ProgressBar: () => import('~/components/progress-bar.vue'),
  },

  props: {
    projects: {
      type: Array,
      default: () => [],
    },

    limit: {
      type: Number,
      default: 0,
    },
  },

  computed: {
    sortedProjects() {
      const result = [...this.projects].sort(sortByOrder).map(project => ({
        ...project,
        icon: {
          src: project.icon?.image.src,
          loading: project.icon?.placeholder.src,
        },
      }))

      if (this.limit > 0) {
        return result.slice(0, this.limit)
      }

      return result
    },
  },
}
</script>

<style lang="scss" scoped>
.projects {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.block {
  display: block;
  width: 300px;
  margin: 1em 0.5em;

  .project-content {
    position: relative;
    overflow: hidden;
    height: 290px;
    background-size: cover;
    background-repeat: no-repeat;

    .description {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      display: flex;
      flex-direction: column;
      padding: 1em;
      background: #111a;
      transition: all 0.4s ease-in-out;

      .progress {
        margin-bottom: 0.5em;
        transition: transform 0.4s ease-in-out;
      }
      .areas {
        transition: transform 0.4s ease-in-out;
      }

      .fill {
        flex: 1;
      }

      .excerpt {
        transition: transform 0.4s ease-in-out;
      }
    }

    .image {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }
  }

  &.has-icon .description:hover {
    background: transparent;

    .progress,
    .areas {
      transform: translate3d(0, -200px, 0);
    }
    .excerpt {
      transform: translate3d(0, 200px, 0);
    }
  }
}

.more-container {
  margin-top: 3em;
  text-align: center;
}

@media (max-width: theme('screens.lg')) {
  .block {
    width: 250px;

    .title {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .project-content {
      height: 240px;
      font-size: 0.9em;
    }
  }
}

@media (max-width: theme('screens.xs')) {
  .block {
    width: 400px;

    .title {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .project-content {
      height: 390px;
      font-size: 0.9em;
    }
  }
}
</style>
