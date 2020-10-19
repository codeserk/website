import { Client } from './modules/wordpress/plugin.server'
import { socialNetworks, siteName, defaultSeo } from './utils/seo'

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
  ],

  fontawesome: {
    icons: {
      solid: true,
      brands: true,
    },
  },

  server: {
    host: '0.0.0.0',
    port: 3020,
  },

  watch: [
    // '~/content/**/*'
  ],

  serverMiddleware: ['~server/redirects.ts'],
  plugins: [
    '~/plugins/composition-api.js',
    { src: '~/plugins/global-components.js', mode: 'client' },
    '~/plugins/lazyload.js',
    '~/plugins/jsonld',
    { src: '@/plugins/aos', mode: 'client' },
    { src: '@/plugins/touch', mode: 'client' },
    { src: '@/plugins/vertical-height', mode: 'client' },
  ],

  webfontloader: {
    google: {
      families: ['Montaga', 'Amatic SC'],
      urls: [
        'https://fonts.googleapis.com/css2?family=Amatic+SC&family=Montaga&display=swap',
        'https://fonts.googleapis.com/css2?family=Amatic+SC:wght@700&display=swap',
      ],
    },
  },

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
      const { pages } = await client.query(`
                query {
                    pages { link }
                }
            `)

      return [
        '/',
        // ...pages.map(page => page.link)
      ]
    },
  },

  head: {
    htmlAttrs: {
      lang: 'en',
    },
    title: siteName,
    meta: [
      { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
      { charset: 'utf-8' },
      { name: 'msapplication-TileColor', content: '#0924D1' },
      { name: 'theme-color', content: '#0924D1' },
      { name: 'robots', content: 'noindex, nofollow' },
      { name: 'author', content: defaultSeo.author },

      // OpenGraph
      { property: 'og:type', content: 'article' },
      { property: 'og:updated_time', content: builtAt },
      // { property: 'og:title', content: defaultSeo.title },
      { property: 'og:site_name', content: siteName },
      // { property: 'og:url', content: defaultSeo.canonical },
      // { property: 'og:description', content: defaultSeo.description },
      // { property: 'og:image', content: '/logo.jpg' },
      // { property: 'og:image:type', content: 'image/jpeg' },
      // { property: 'og:image:width', content: 600 },

      // Twitter
      // { property: 'twitter:card', content: 'summary_large_image' },
      // { name: 'twitter:title', content: siteName },
      // { name: 'twitter:description', content: defaultSeo.description },
      // { property: 'twitter:site', content: socialNetworks.twitter.site }
      // { name: 'twitter:image', content: '/logo.jpg' }

      // Facebook
      // { property: 'fb:app_id', content: socialNetworks.facebook.id }
    ],
  },

  pwa: {
    icon: {
      iconFileName: 'logo.png',
    },
    name: siteName,
    author: defaultSeo.author,
    description: defaultSeo.description,
    lang: 'es',
    manifest: {
      theme_color: '#0924D1',
      background_color: '#000000',
    },
  },

  sitemap: {
    hostname: 'https://www.codeserk.es',
    gzip: true,
    exclude: ['/home'],
    routes: async () => {
      // const uri = process.env.IS_GENERATING
      //   ? 'http://localhost:4001'
      //   : 'http://localhost:4000'
      // const client = new Client(uri)
      // const { pages } = await client.query(`
      //           query {
      //               pages { slug link updatedAt }
      //           }
      //       `)
      return [
        // ...pages.map((page) => {
        //   const url = page.slug === 'home' ? '/' : page.link
        //   return { url, lastmod: page.updatedAt }
        // })
      ]
    },
  },
}
