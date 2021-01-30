<template>
  <div class="resume">
    <div class="container mx-auto">
      <div class="page">
        <div class="info">
          <div class="header">
            <div class="avatar"></div>
            <div class="name"></div>

            <div class="title"></div>
          </div>

          <div class="details">
            <h2>Contact</h2>

            <dl>
              <dt>Website</dt>
              <dd>
                <a v-text="'codeserk.es'" href="https://www.codeserk.es" target="_blank" rel="noreferrer noopener" />
              </dd>

              <template v-for="(item, index) in social">
                <dt :key="index"><font-awesome-icon :icon="[item.iconType, item.icon]" size="lg" /></dt>
                <dd :key="index">
                  <a v-text="item.title" :href="item.link" target="_blank" rel="noreferrer noopener" />
                </dd>
              </template>
            </dl>
          </div>

          <div class="skills"></div>
        </div>
        <div class="resume-content">
          <div class="profile">
            <h2>Profile</h2>
            <p data-aos="appear">
              I'm <strong>José Cámara</strong> and I'm passionate about innovative technologies and computer
              programming. Although the main focus of my career is
              <router-link to="/development/web">Web development</router-link>, I have acquired skills in other
              <router-link to="/development">areas of development</router-link>, such as:
              <router-link to="/development/game">Games</router-link>,
              <router-link to="/development/game">Android</router-link> and
              <router-link to="/development/game">iOS</router-link>.
            </p>
          </div>

          <div class="career">
            <h2>Career</h2>

            <div v-for="item in career" :key="item.id" class="career-item">
              <img
                v-if="item.featuredImage"
                v-lazy="{
                  src: item.featuredImage.image.src,
                  loading: item.featuredImage.placeholder.src,
                }"
                :alt="`${item.title} logo`"
                class="image lazy bordered"
                width="150"
                height="150"
              />
              {{ item.excerpt }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Background from '@/components/layout/scene/background'
import { socialNetworks } from '../utils/seo'

export default {
  layout: 'resume',

  components: {
    Background,
  },

  data: () => ({
    social: [
      { iconType: 'fab', icon: 'github', link: socialNetworks.github.url, title: '@codeserk' },
      { iconType: 'fab', icon: 'linkedin', link: socialNetworks.linkedin.url, title: 'Jose Camara' },
      { iconType: 'fab', icon: 'twitter', link: socialNetworks.twitter.url, title: '@codeserk' },
      { iconType: 'fa', icon: 'envelope', link: socialNetworks.email.url, title: 'info@codeserk.es' },
    ],
  }),

  async asyncData({ route, $source }) {
    return $source.resolve(route.path, ({ query }) =>
      query(
        `
          query index {
            career: posts(type: "career", sort: { path: "extra.startDate", direction: Descending }) {
              id slug title content excerpt dom
              startDate: extra(path: "startDate")
              endDate: extra(path: "endDate")
              position: extra(path: "position")
              website: extra(path: "website")
              areas: terms(taxonomy: "development-area") { id slug name order: extra(path: "order") }
              languages: terms(taxonomy: "language") { id slug name order: extra(path: "order") }
              frameworks: terms(taxonomy: "framework") { id slug name order: extra(path: "order") }
              databases: terms(taxonomy: "database") { id slug name order: extra(path: "order") }
              brokers: terms(taxonomy: "message-broker") { id slug name order: extra(path: "order") }
              technologies: terms(taxonomy: "technology") { id slug name order: extra(path: "order") }
              featuredImage {
                image(resolution: Small, format: png, transform: { resize: { width: 42, height: 42 }}) { src }
                placeholder: image(resolution: Placeholder, format: png, transform: { resize: { width: 16, height: 16 }}, output: Inline) { src }
              }
            }
          }
        `,
      ),
    )
  },
}
</script>

<style lang="scss" scoped>
.resume {
  background: white;
  font-size: 14px;

  .resume-content {
    .career {
      .career-item {
        .image {
          width: 42px;
          height: 42px;
        }
      }
    }
  }
}

.page {
  background: white;
  width: 21cm;
  height: 29.7cm;
  display: block;
  margin: 0 auto;
  margin-bottom: 0.5cm;
  box-shadow: 0 0 0.5cm rgba(0, 0, 0, 0.5);

  display: flex;

  .info {
    width: 33%;
    overflow: hidden;
    position: relative;
    background: black;

    .background {
      opacity: 0.25;
      position: relative;

      &::after {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background: black;
        opacity: 0.1;
      }
    }
  }
  .resume-content {
    flex: 1;
  }
}
@media print {
  .page {
    margin-bottom: 0;
    // box-shadow: none;
  }
}

@media screen {
  .resume {
    padding-top: 1em;
  }
}
</style>
