import { Client } from './modules/wordpress/plugin.server'
import { siteName, defaultSeo, getShortDescription } from './utils/seo'

const builtAt = new Date().toISOString()

export default {
  buildModules: ['@nuxtjs/tailwindcss', '@nuxtjs/fontawesome'],
  css: ['@/assets/css/main.scss', 'photoswipe/src/css/main.scss', 'photoswipe/src/css/default-skin/default-skin.scss'],
  modules: [
    'nuxt-webfontloader',
    '@nuxt/typescript-build',
    '~/modules/wordpress/module.ts',
    '@nuxtjs/pwa',
    '@nuxtjs/sitemap',
    '@nuxtjs/feed',
  ],

  loading: {
    color: 'white',
    height: '10px',
  },

  fontawesome: {
    icons: {
      brands: ['faGithub', 'faTwitter', 'faLinkedin'],
    },
  },

  server: {
    host: '0.0.0.0',
    port: 3020,
  },

  serverMiddleware: ['~server/redirects.ts'],
  plugins: [
    '~/plugins/composition-api.js',
    { src: '~/plugins/global-components.js', mode: 'client' },
    '~/plugins/lazyload.js',
    '~/plugins/jsonld',
    { src: '@/plugins/aos', mode: 'client' },
    { src: '@/plugins/touch', mode: 'client' },
    { src: '@/plugins/vertical-height', mode: 'client' },
    '~/plugins/common-data',
    { src: '@/plugins/firebase', mode: 'client' },
  ],

  render: {
    bundleRenderer: {
      shouldPreload: (file, type) => {
        return ['script', 'style', 'font'].includes(type)
      },
    },
  },

  build: {
    parallel: process.env.NODE_ENV !== 'production',
    cache: process.env.NODE_ENV !== 'production',
    hardSource: process.env.NODE_ENV !== 'production',
    extractCSS: process.env.NODE_ENV === 'production',
    postcss: {
      plugins: {
        tailwindcss: 'tailwind.config.js',
      },
    },

    terser: {
      terserOptions: {
        compress: {
          drop_console: true,
        },
      },
    },

    extend(config) {
      const rule = config.module.rules.find(r => r.test.toString() === '/\\.(png|jpe?g|gif|svg|webp)$/i')

      config.module.rules.splice(config.module.rules.indexOf(rule), 1)

      config.module.rules.push({
        test: /\.(jpe?g|png|webp|gif|svg)$/,
        loader: 'url-loader',
        query: {
          limit: 1000,
          name: 'img/[name].[hash:7].[ext]',
        },
      })
    },
  },

  purgeCSS: {
    // mode: 'postcss',
    whitelistPatterns: [
      /.*has-.*$/,
      /.*wp-.*$/,
      /.*pswp.*$/,
      /.*fas.*$/,
      /.*fa.*$/,
      /.*fab.*$/,
      /.*wfa.*$/,
      /.*aos.*$/,
      /^page.*$/,
    ],
  },

  generate: {
    concurrency: 10,
    fallback: 'error.html',

    async routes() {
      const uri = process.env.IS_GENERATING ? 'http://localhost:4021' : 'http://localhost:4020'
      const client = new Client(uri)
      const {
        pages,
        posts,
        areas,
        languages,
        frameworks,
        databases,
        technologies,
        messageBrokers,
      } = await client.query(`
        query {
          pages { link }
          posts { type { id } link }

          areas: terms(taxonomy: "development-area") { slug }
          languages: terms(taxonomy: "language") { slug }
          frameworks: terms(taxonomy: "framework") { slug }
          databases: terms(taxonomy: "database") { slug }
          technologies: terms(taxonomy: "technology") { slug }
          messageBrokers: terms(taxonomy: "message-broker") { slug }
        }
      `)
      return [
        '/',
        ...pages.map(page => page.link),
        ...posts.filter(post => post.type.id !== 'page').map(page => page.link),
        ...areas.map(term => `/development/${term.slug}`),
        ...languages.map(term => `/language/${term.slug}`),
        ...frameworks.map(term => `/framework/${term.slug}`),
        ...databases.map(term => `/database/${term.slug}`),
        ...technologies.map(term => `/technology/${term.slug}`),
        ...messageBrokers.map(term => `/message-broker/${term.slug}`),
      ]
    },
  },

  head: {
    htmlAttrs: {
      lang: 'en',
    },
    title: siteName,
    link: [
      // Favicon
      { rel: 'apple-touch-icon', sizes: '57x57', href: '/favicon/apple-icon-57x57.png' },
      { rel: 'apple-touch-icon', sizes: '60x60', href: '/favicon/apple-icon-60x60.png' },
      { rel: 'apple-touch-icon', sizes: '72x72', href: '/favicon/apple-icon-72x72.png' },
      { rel: 'apple-touch-icon', sizes: '76x76', href: '/favicon/apple-icon-76x76.png' },
      { rel: 'apple-touch-icon', sizes: '114x114', href: '/favicon/apple-icon-114x114.png' },
      { rel: 'apple-touch-icon', sizes: '120x120', href: '/favicon/apple-icon-120x120.png' },
      { rel: 'apple-touch-icon', sizes: '144x144', href: '/favicon/apple-icon-144x144.png' },
      { rel: 'apple-touch-icon', sizes: '152x152', href: '/favicon/apple-icon-152x152.png' },
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/favicon/apple-icon-180x180.png' },
      { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/favicon/android-icon-192x192.png' },
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', sizes: '96x96', href: '/favicon/favicon-96x96.png' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon/favicon-16x16.png' },
    ],
    meta: [
      // Favicon
      { name: 'msapplication-TileColor', content: '#575fa2' },
      { name: 'msapplication-TileImage', content: '/favicon/msicon-144x144.png' },
      { name: 'theme-color', content: '#575fa2' },

      { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
      { charset: 'utf-8' },
      { name: 'robots', content: 'noindex, nofollow' },
      { name: 'author', content: defaultSeo.author },

      // OpenGraph
      { property: 'og:type', content: 'article' },
      { property: 'og:updated_time', content: builtAt },
      { property: 'og:site_name', content: siteName },
    ],
  },

  pwa: {
    icon: {
      iconFileName: 'favicon.png',
    },
    name: siteName,
    author: defaultSeo.author,
    description: defaultSeo.description,
    lang: 'en',
    manifest: {
      theme_color: '#0924D1',
      background_color: '#575fa2',
    },
  },

  feed: [
    {
      path: '/feed.xml',
      async create(feed) {
        feed.options = {
          title: defaultSeo.title,
          link: 'https://www.codeserk.es/feed.xml',
          description: defaultSeo.description,
          image: 'https://www.codeserk.es/header.png',
          author: {
            name: defaultSeo.author,
            email: 'info@codeserk.es',
            link: 'https://www.codeserk.es',
          },
        }

        const uri = process.env.IS_GENERATING ? 'http://localhost:4021' : 'http://localhost:4020'
        const client = new Client(uri)
        const { posts } = await client.query(`
          query {
            posts(filters: { typeId: { ne: "paged" } }) {
              slug link title content excerpt updatedAt mainTerm { slug }
              featuredImage { image(resolution: Small, format: png, transform: { resize: { width: 600, height: 600 }}) { src } }
            }
          }
        `)

        posts.forEach(post => {
          const image = post.featuredImage && post.featuredImage.image ? post.featuredImage.image.src : 'header.png'

          feed.addItem({
            title: post.title,
            id: post.link,
            link: post.link,
            description: getShortDescription(post.excerpt),
            content: post.content,
            author: [
              {
                name: defaultSeo.author,
                email: 'info@codeserk.es',
                link: 'https://www.codeserk.es',
              },
            ],
            date: new Date(post.updatedAt),
            image: `https://www.codeserk.es/${image}`,
          })
        })
      },
      cacheTime: 1000 * 60 * 15,
      type: 'rss2',
    },
  ],

  sitemap: {
    hostname: 'https://www.codeserk.es',
    gzip: true,
    exclude: ['/home'],
    routes: async () => {
      const uri = process.env.IS_GENERATING ? 'http://localhost:4021' : 'http://localhost:4020'
      const client = new Client(uri)
      const {
        pages,
        posts,
        areas,
        languages,
        frameworks,
        databases,
        technologies,
        messageBrokers,
      } = await client.query(`
        query {
          pages { link updatedAt }
          posts { type { id } link updatedAt }

          areas: terms(taxonomy: "development-area") { slug }
          languages: terms(taxonomy: "language") { slug }
          frameworks: terms(taxonomy: "framework") { slug }
          databases: terms(taxonomy: "database") { slug }
          technologies: terms(taxonomy: "technology") { slug }
          messageBrokers: terms(taxonomy: "message-broker") { slug }
        }
      `)
      return [
        { url: '/', lastmod: builtAt },
        ...pages.map(page => {
          return { url: page.link, lastmod: page.updatedAt }
        }),
        ...posts
          .filter(post => post.type.id !== 'page')
          .map(page => {
            return { url: page.link, lastmod: page.updatedAt }
          }),
        ...areas.map(term => ({ url: `/development/${term.slug}` })),
        ...languages.map(term => ({ url: `/language/${term.slug}` })),
        ...frameworks.map(term => ({ url: `/framework/${term.slug}` })),
        ...databases.map(term => ({ url: `/database/${term.slug}` })),
        ...technologies.map(term => ({ url: `/technology/${term.slug}` })),
        ...messageBrokers.map(term => ({ url: `/message-broker/${term.slug}` })),
      ]
    },
  },
}
