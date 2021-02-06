<template>
  <div class="resume page-wrapper color">
    <div class="web-only">
      <client-only>
        <background class="background" />
      </client-only>
      <page-header :breadcrumbs="[{ name: 'Codeserk', link: '/' }]" title="Resume" />
    </div>

    <div class="page">
      <div class="info">
        <div class="info-container">
          <div class="header">
            <div class="me">
              <img
                v-lazy="{ src: $common.me.image.src, loading: $common.me.placeholder.src }"
                width="150"
                height="150"
                alt="Jose Camara"
                class="image circled lazy"
              />
            </div>
            <h1 class="name">José Cámara</h1>

            <div class="title">Full-Stack Engineer</div>
          </div>

          <div class="details">
            <h2>Info</h2>

            <div class="details-items">
              <div v-for="(item, index) in social" :key="index" class="details-item">
                <div class="details-item-label">
                  <a :href="item.link" target="_blank" rel="noreferrer noopener">
                    <font-awesome-icon :icon="[item.iconType, item.icon]" size="lg" />
                  </a>
                </div>
                <div class="details-item-content">
                  <a v-text="item.title" :href="item.link" target="_blank" rel="noreferrer noopener" />
                </div>
              </div>
            </div>
          </div>

          <div class="skills">
            <div v-for="section in skillSections" :key="section.key" :class="section.key" class="skills-section">
              <div v-for="item in section.items" :key="item.id" class="skill item">
                <router-link :to="`${section.baseURL}${item.slug}`" class="item-name">
                  <h3 v-text="item.name" class="label" />
                </router-link>
                <progress-bar :progress="item.knowledge" :text="item.knowledgeYears" class="small" aos="" />
              </div>
            </div>

            <div class="skills-section tongues">
              <div v-for="tongue in tongues" :key="tongue.name" class="skill tongue">
                <h3 v-text="tongue.name" class="label" />
                <progress-bar :progress="tongue.knowledge" :text="tongue.level" class="small" aos="" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="resume-content">
        <div class="profile">
          <h2>Profile</h2>
          <p>
            I'm <strong>José Cámara</strong> and I'm passionate about innovative technologies and computer programming.
            Although the main focus of my career is <router-link to="/development/web">Web development</router-link>, I
            have acquired skills in other <router-link to="/development">areas of development</router-link>, such as:
            <router-link to="/development/game">Games</router-link>,
            <router-link to="/development/android">Android</router-link> and
            <router-link to="/development/ios">iOS</router-link>.
          </p>
        </div>

        <div class="career">
          <h2>Career</h2>

          <div v-for="item in career" :key="item.id" class="item">
            <div class="item-header">
              <img
                v-if="item.featuredImage"
                v-lazy="{
                  src: item.featuredImage.image.src,
                  loading: item.featuredImage.placeholder.src,
                }"
                :alt="`${item.title} logo`"
                class="image lazy bordered"
                width="32"
                height="32"
              />
              <div class="item-header-info">
                <div class="title">
                  <router-link :to="`/career/${item.slug}`"><h3 v-text="item.title"/></router-link>
                  <span v-if="item.position" v-text="item.position" class="position" />
                </div>
                <div class="time">
                  <span v-text="getStartDateText(item)" class="start-date" />
                  <span v-text="getEndDateText(item)" class="end-date" />
                  <span v-text="getPeriod(item)" class="period" />
                </div>
              </div>
            </div>
            <div class="item-content">
              <p v-text="item.excerpt" class="excerpt" />
              <term-chip v-for="term in item.topTerms" :key="term" :id="term" class="term-chip" />
            </div>
          </div>
        </div>

        <div class="education">
          <h2>Education</h2>

          <div v-for="item in education" :key="item.id" class="item">
            <div class="item-header">
              <img
                v-if="item.featuredImage"
                v-lazy="{
                  src: item.featuredImage.image.src,
                  loading: item.featuredImage.placeholder.src,
                  error: item.featuredImage.placeholder.src,
                }"
                :alt="`${item.title} logo`"
                class="image lazy bordered"
                width="150"
                height="150"
              />
              <div class="item-header-info">
                <div class="title">
                  <h3 v-text="item.title" />
                </div>
                <div class="time">
                  <span v-text="getStartDateText(item)" class="start-date" />
                  <span v-text="getEndDateText(item)" class="end-date" />
                  <span v-text="getPeriod(item)" class="period" />
                </div>
              </div>
            </div>
            <div class="item-content">
              <p v-text="item.excerpt" class="excerpt" />
              <terms-map :item="item" class="inline" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { generateSeoMeta, socialNetworks } from '../utils/seo'

const languages = ['typescript', 'javascript']
const frameworks = ['vue', 'nuxt', 'nestjs']
const databases = ['mysql', 'mongodb']
const brokers = ['rabbitmq', 'kafka']
const technologies = ['docker', 'kubernetes']

export default {
  layout: 'resume',

  components: {
    PageHeader: () => import('~/components/page/header'),
    Background: () => import('~/components/layout/scene/background'),
    ProgressBar: () => import('~/components/progress-bar.vue'),
    TermsMap: () => import('~/components/terms-map'),
    TermChip: () => import('~/components/term-chip'),
  },

  data: () => ({
    social: [
      { iconType: 'fa', icon: 'globe', link: 'https://www.codeserk.es/', title: 'www.codeserk.es' },
      { iconType: 'fab', icon: 'github', link: socialNetworks.github.url, title: '@codeserk' },
      { iconType: 'fab', icon: 'linkedin', link: socialNetworks.linkedin.url, title: 'Jose Camara' },
      { iconType: 'fab', icon: 'twitter', link: socialNetworks.twitter.url, title: '@codeserk' },
      { iconType: 'fa', icon: 'envelope', link: socialNetworks.email.url, title: 'info@codeserk.es' },
    ],

    tongues: [
      { name: 'Spanish', level: 'Native', knowledge: 100 },
      { name: 'English', level: 'Proficient', knowledge: 80 },
    ],
  }),

  computed: {
    languages() {
      return this.$common.languages
        .filter(language => languages.includes(language.id))
        .map(language => ({
          ...language,
          name: language.id === 'javascript' ? 'JavaScript' : 'TypeScript',
        }))
    },

    frameworks() {
      return this.$common.frameworks.filter(framework => frameworks.includes(framework.id))
    },

    databases() {
      return this.$common.databases.filter(database => databases.includes(database.id))
    },

    brokers() {
      return this.$common.messageBrokers.filter(broker => brokers.includes(broker.id))
    },

    technologies() {
      return this.$common.technologies.filter(technology => technologies.includes(technology.id))
    },

    skillSections() {
      return [
        { key: 'languages', label: 'Languages', baseURL: '/language/', items: this.languages },
        { key: 'frameworks', label: 'Frameworks', baseURL: '/framework/', items: this.frameworks },
        { key: 'databases', label: 'Databases', baseURL: '/database/', items: this.databases },
        { key: 'message-brokers', label: 'Message brokers', baseURL: '/message-broker/', items: this.brokers },
        { key: 'technologies', label: 'Technologies', baseURL: '/technology/', items: this.technologies },
      ]
    },
  },

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
              topTerms: extra(path: "topTerms")
              areas: terms(taxonomy: "development-area") { id slug name order: extra(path: "order") }
              languages: terms(taxonomy: "language") { id slug name order: extra(path: "order") }
              frameworks: terms(taxonomy: "framework") { id slug name order: extra(path: "order") }
              featuredImage {
                image(resolution: Small, format: png, transform: { resize: { width: 42, height: 42 }}) { src }
                placeholder: image(resolution: Placeholder, format: png, transform: { resize: { width: 16, height: 16 }}, output: Inline) { src }
              }
            }

            education: posts(type: "education", sort: { path: "extra.startDate", direction: Descending }) {
              id slug title content excerpt dom
              startDate: extra(path: "startDate")
              endDate: extra(path: "endDate")
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

  methods: {
    getStartDateText(item) {
      if (!item.startDate) {
        return
      }

      return moment(item.startDate).format('DD/MM/YYYY')
    },

    getEndDateText(item) {
      if (!item.endDate) {
        return 'NOW'
      }

      return moment(item.endDate).format('DD/MM/YYYY')
    },

    getPeriod(item) {
      const startDate = moment(item.startDate)
      const endDate = item.endDate ? moment(item.endDate) : undefined
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

  head() {
    return generateSeoMeta({
      path: this.$route.path,
      title: 'Resume',
      description: `I'm José Cámara and I'm passionate about innovative technologies and computer programming.
            Although the main focus of my career is Web development, I have acquired skills in other areas of development,
            such as: Games, Android and iOS.`,
      keywords: ['Resume', 'Software Engineer', 'Full-stack', 'Web developer', 'TypeScript', 'JavaScript', 'Vue'],
      image: this.$common.me.image.src,
    })
  },
}
</script>

<style lang="scss" scoped>
.resume {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;

  .page {
    font-size: 11px;
    font-family: 'Courier New', Courier, monospace;

    h1,
    h2,
    h3,
    h4 {
      font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana,
        sans-serif;
    }
  }

  .info {
    position: relative;
    width: 33%;
    background: black;
    color: white;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 0;
      background: black;
      background-image: url(/background.png);
      background-position-x: -25%;
      background-size: cover;
      opacity: 0.4;
      filter: grayscale(100%);
    }

    .info-container {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      padding: 2em 2em;
      color: white;

      .header {
        text-align: center;
        .me {
          width: 100%;
          img {
            margin: auto;
          }
        }

        .name {
          margin-top: 6px;
          font-size: 32px;
        }
        .title {
          color: #ddd;
          font-size: 16px;
        }
      }

      .details {
        width: 100%;
        margin-bottom: 2em;

        h2 {
          margin-bottom: 10px;
          font-size: 20px;
        }

        .details-items {
          .details-item {
            display: flex;
            align-items: flex-start;
            justify-content: flex-start;
            margin-bottom: 1em;

            .details-item-label {
              margin-right: 1em;
              font-weight: bold;
              font-size: 14px;
              font-family: 'Courier New', Courier, monospace;
              text-align: right;
            }

            .details-item-content {
              flex: 1;
              font-size: 13px;
            }
          }
        }
      }

      .skills {
        width: 100%;

        .skills-section {
          position: relative;
          margin-bottom: 3em;

          &:last-child {
            margin-bottom: 0;
          }

          &.tongues {
            margin-top: 4em;
          }
        }

        .skill {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1em;

          &:last-child {
            margin-bottom: 0;
          }

          .label {
            min-width: 80px;
            margin-right: 1em;
            font-weight: bold;
            font-size: 13px;
            font-family: 'Courier New', Courier, monospace;
            text-align: left;
          }

          .ProgressBar {
            flex: 1;
          }
        }
      }
    }
  }

  .resume-content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    padding: 2em 2em;

    img.lazy {
      image-rendering: auto;
    }

    .profile {
      p {
        color: #333;
      }
    }

    h2 {
      margin-bottom: 6px;
      color: black;
      font-size: 18px;
      font-display: bold;
    }

    .career,
    .education {
      .item {
        margin: 0 0 2.5em 0;
        &:last-child {
          margin-bottom: 0;
        }

        .item-header {
          display: flex;
          align-items: center;
          margin-bottom: 0.5em;
          padding-bottom: 0.5em;
          border-bottom: 1px dashed #ddd;

          .item-header-info {
            margin-left: 1em;

            h3 {
              display: inline-block;
              color: black;
              font-size: 14px;
            }
            .position {
              display: inline-block;
              color: #666;
              line-height: 14px;

              &::before {
                content: ' / ';
              }
            }

            .time {
              color: #555;
              font-size: 10px;

              .end-date {
                &::before {
                  content: ' - ';
                }
              }

              .period {
                margin-left: 2px;

                &::before {
                  content: '(';
                }
                &::after {
                  content: ')';
                }
              }
            }
          }
        }

        .image {
          width: 32px;
          height: 32px;
        }

        .excerpt {
          margin-bottom: 0.75em;
          color: #333;
        }

        .term-chip {
          padding-top: 2px;
          font-weight: bold;
          font-size: 10px;
          filter: saturate(0.4);
        }
      }
    }
  }
}

.page {
  display: block;
  display: flex;
  overflow: hidden;
  width: 21cm;
  height: 29.7cm;
  margin: 0 auto;
  margin: 0.5cm 0;
  border-radius: 6px;
  background: white;
  box-shadow: 0 0 0.5cm rgba(0, 0, 0, 0.5);

  .resume-content {
    flex: 1;
  }
}
@media only print {
  .resume {
    display: block;
    margin: 0;
    padding: 0;

    .background {
      display: none;
    }
  }

  .web-only {
    display: none;
  }

  .page {
    margin: 0;
    padding: 0;
    border-radius: 0;
  }
}

@media screen and (max-width: theme('screens.md')) {
  .page {
    display: block;
    width: 100%;
    height: auto;

    .info {
      width: 100%;

      .info-container {
        position: relative;
        max-width: 400px;
        margin: auto;

        .header {
          margin-bottom: 2em;
        }
      }
    }
  }
}
</style>
