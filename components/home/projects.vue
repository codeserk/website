<template>
  <div class="home-projects container mx-auto">
    <nuxt-link
      v-for="project in projects" :key="project.id"
      class="block with-shadow-left clearfix"
      :class="{ 'has-icon': !!project.icon }"
      :to="project.link"
    >
      <h3 v-text="project.title" class="title" />
      <div class="project-content">
        <image-responsive class="image" v-if="project.icon" :src="project.icon.image.src" :placeholder="project.icon.placeholder.src" />

        <div class="description">
          <progress-bar class="progress" :progress="project.progress" :text="project.status" />
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
          <p class="excerpt" v-if="project.excerpt" v-text="project.excerpt" />
        </div>
      </div>
    </nuxt-link >
  </div>
</template>

<script>
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
  },
}
</script>

<style lang="scss" scoped>
.home-projects {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  &::-webkit-scrollbar {
    display: none;
  }

  .block {
    display: block;
    width: 300px;
    margin: 1em 0.5em;

    .project-content {
      position: relative;
      overflow: hidden;
      height: 290px;

      .description {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        display: flex;
        flex-direction: column;
        padding: 1em;
        background: #111A;
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

    &.has-icon:hover {
      .progress, .areas {
        transform: translate3d(0, -200px, 0);
      }
      .excerpt {
        transform: translate3d(0, 200px, 0);
      }
      .description {
        background: transparent;
      }
    }
  }
}
</style>
