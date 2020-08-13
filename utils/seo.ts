export const siteName = 'Codeserk'

export const socialNetworks = {
  youtube: {
    name: '',
    url: 'https://www.youtube.com/channel/'
  },

  facebook: {
    id: 0,
    title: '',
    url: 'https://www.facebook.com//'
  },

  instagram: {
    title: '@',
    url: 'https://www.instagram.com//'
  }
}

export const defaultSeo = {
  title: 'Codeserk',
  canonical: 'https://www.codeserk.es',
  description: 'Codeserk',
  author: 'Jose Camara',
  keywords: [ 'codeserk', 'web', 'ts', 'js', 'css', 'html', 'dev' ],
  image: '/logo.png'
}

export interface SeoInformation {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  path?: string;
}

export function generateSeoMeta(info: SeoInformation): any {
  let url = defaultSeo.canonical + (info.path || '')
  if (url !== defaultSeo.canonical && !url.endsWith('/')) {
    url += '/'
  }

  const head: any = {
    link: [
      {
        rel: 'canonical',
        href: url
      }
    ]
  }
  const metas: any[] = []
  metas.push({ property: 'og:url', hid: 'og:url', content: url })
  const title = info.title
    ? `${info.title} • ${siteName}`
    : defaultSeo.title
  head.title = title
  metas.push({ property: 'og:title', hid: 'og:title', content: title })
  metas.push({ property: 'twitter:title', hid: 'twitter:title', content: title })

  const description = info.description
    ? getShortDescription(info.description)
    : defaultSeo.description
  metas.push({ name: 'description', hid: 'description', content: description })
  metas.push({ property: 'og:description', hid: 'og:description', content: description })
  metas.push({ property: 'twitter:description', hid: 'twitter:description', content: description })

  const keywords = info.keywords || defaultSeo.keywords
  metas.push({ name: 'keywords', hid: 'keywords', content: keywords.join(',') })

  const image = defaultSeo.canonical + (info.image || defaultSeo.image)
  metas.push({ property: 'og:image', hid: 'og:image', content: image })
  metas.push({ property: 'og:image:type', hid: 'og:image:type', content: 'image/jpeg' })
  metas.push({ property: 'og:image:width', hid: 'og:image:width', content: 600 })
  metas.push({ property: 'og:image:width', hid: 'og:image:height', content: 600 })
  metas.push({ property: 'twitter:image', hid: 'twitter:image', content: image })

  return { ...head, meta: metas }
}

export function getShortDescription(description: string): string {
  return description
    .replace(/<\/?[^>]+(>|$)/g, '')
    .slice(0, 160)
}
