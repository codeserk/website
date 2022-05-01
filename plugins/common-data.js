import Vue from 'vue'
import { sortByOrder } from '../utils/sort'

export default async function(context) {
  const data = await context.$source.resolve('/common-data', async ({ query }) => {
    const result = await query(
      `
        query commonData {
          me: mediaById(id: "me-v2") {
            image(resolution: Small, format: png, transform: { resize: { width: 290, height: 290 }}) { src }
            placeholder: image(resolution: Placeholder, format: png, transform: { resize: { width: 16, height: 16 }}, output: Inline) { src }
          }

          avatar: mediaById(id: "avatar-pixelated-v2") {
            image(resolution: Small, format: png, transform: { resize: { width: 290, height: 290 }}) { src }
            placeholder: image(resolution: Placeholder, format: png, transform: { resize: { width: 16, height: 16 }}, output: Inline) { src }
          }

          areas: terms(taxonomy: "development-area") {
            id slug name taxonomy { id }
            order: extra(path: "order")
          }

          languages: terms(taxonomy: "language") {
            id slug name taxonomy { id }
            order: extra(path: "order")
            status: extra(path: "status")
            knowledge: extra(path: "knowledge")
            knowledgeYears: extra(path: "knowledgeYears")
            scopes: extra(path: "scopes")
            summary: extra(path: "summary")
          }

          frameworks: terms(taxonomy: "framework") {
            id link slug name taxonomy { id }
            order: extra(path: "order")
            status: extra(path: "status")
            knowledge: extra(path: "knowledge")
            knowledgeYears: extra(path: "knowledgeYears")
            kind: extra(path: "kind")
            summary: extra(path: "summary")
          }

          databases: terms(taxonomy: "database") {
            id slug name taxonomy { id }
            order: extra(path: "order")
            status: extra(path: "status")
            knowledge: extra(path: "knowledge")
            knowledgeYears: extra(path: "knowledgeYears")
            summary: extra(path: "summary")
          }

          technologies: terms(taxonomy: "technology") {
            id slug name taxonomy { id }
            order: extra(path: "order")
            status: extra(path: "status")
            knowledge: extra(path: "knowledge")
            knowledgeYears: extra(path: "knowledgeYears")
            scopes: extra(path: "scopes")
            summary: extra(path: "summary")
          }

          messageBrokers: terms(taxonomy: "message-broker") {
            id slug name taxonomy { id }
            order: extra(path: "order")
            status: extra(path: "status")
            knowledge: extra(path: "knowledge")
            knowledgeYears: extra(path: "knowledgeYears")
            summary: extra(path: "summary")
          }
        }`,
    )

    return {
      ...result,
      areas: result.areas.sort(sortByOrder),
      languages: result.languages.sort(sortByOrder),
      frameworks: result.frameworks.sort(sortByOrder),
      databases: result.databases.sort(sortByOrder),
      messageBrokers: result.messageBrokers.sort(sortByOrder),
      technologies: result.technologies.sort(sortByOrder),
    }
  })

  const keywordsFields = ['areas', 'languages', 'frameworks', 'databases', 'brokers', 'technologies']
  if (!Vue.__common_data__) {
    Vue.__common_data__ = true
    Vue.mixin({
      transition: {
        beforeLeave() {
          document.body.classList.add('transition')
        },

        afterEnter() {
          document.body.classList.remove('transition')
        },
      },

      components: {
        PageWrapper: () => import('~/components/page/wrapper'),
      },

      computed: {
        $common() {
          return data
        },
      },

      methods: {
        hasTerm(id) {
          return !!this.getTerm(id)
        },

        getTerm(id) {
          if (!id) {
            return
          }
          id = id.toLowerCase().trim()

          for (const key in data) {
            if (data[key] && Array.isArray(data[key])) {
              const term = data[key].find(term => term.id === id)
              if (term) {
                return {
                  ...term,
                  type: term.taxonomy.id,
                }
              }
            }
          }
        },

        getKeywords(item) {
          if (!item) {
            return []
          }

          const keywords = []
          for (const key of keywordsFields) {
            if (Array.isArray(item[key])) {
              keywords.push(...item[key].sort(sortByOrder).map(term => term.name))
            }
          }

          return keywords
        },
      },
    })
  }
}
