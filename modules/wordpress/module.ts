import 'reflect-metadata'
import * as path from 'path'

import { press } from '@codeserk/press-core'
import { media } from '@codeserk/press-media'
import { MediaServiceResolver } from '@codeserk/press-graphql-media'
import { filesystem } from '@codeserk/press-source-filesystem'
import { graphql, GraphQLSchemaBuilder } from '@codeserk/press-graphql'

require('dotenv').config()

export default async function wordpressModule(this: any) {
  // Setup filesystem module
  filesystem
    .withConfig({ basePath: path.resolve(__dirname, '../../content') })
    .withJSONParser()
    .withMarkdownParser()
    .withPropertiesParser()
    .withJavaScriptParser()
    .withTOMLParser()
    .withTypeScriptParser()
    .withYAMLParser()

  // Setup media module
  media.withConfig({
    downloadDir: './static/media',
    baseUrl: '/media',
    image: {
      resolutions: {
        placeholder: 32,
        xs: 200,
        sm: 320,
        md: 640,
        lg: 1200
      }
    }
  })

  // Setup press
  press
    .withConfig({
      cache: {
        enabled: true,
        ttl: this.isDev ? 60 * 60 : 60
      }
    })
    .withPermalinks({
      types: {
        posts: 'blog',
        pages: '',
        attachment: 'media'
      },
      taxonomies: {
        category: 'categoria',
        // eslint-disable-next-line @typescript-eslint/camelcase
        post_tag: 'etiqueta',
        // eslint-disable-next-line @typescript-eslint/camelcase
        product_tag: 'etiqueta'
      }
    })
    .withMediaRepository(filesystem.mediaRepository)
    .withPostRepository(filesystem.postRepository)
    .withPostTypeRepository(filesystem.postTypeRepository)
    .withTaxonomyRepository(filesystem.taxonomyRepository)
    .withTermRepository(filesystem.termRepository)
    .withUserRepository(filesystem.userRepository)
    .withMediaService(media.service)

  // GraphGL
  const port = process.env.IS_GENERATING ? 4021 : 4020
  const schemas = await new GraphQLSchemaBuilder()
    .withMediaResolver()
    .withPostResolver()
    .withPostTypeResolver()
    .withTaxonomyResolver()
    .withTermResolver()
    .withUserResolver()
    .withResolver(MediaServiceResolver)
    .build()

  // Start
  try {
    const { server } = await graphql.withPort(port)
      .withSchema(schemas)
      .startServer()
  } catch (error) {
    console.error(error)
  }

  // Uncomment this to test GraphQL
  // await new Promise(resolve => setTimeout(resolve, 1000000))

  this.nuxt.hook('build:done', async () => {
    if (!this.isDev || process.env.IS_GENERATING) {
      // await server.stop()
    }
  })
  this.nuxt.hook('generate:done', async () => {
    // await server.stop()
  })

  // Register server plugin
  this.addPlugin({
    src: path.resolve(__dirname, 'plugin.server.ts'),
    fileName: 'wordpress.plugin.server.ts',
    mode: 'server'
  })
  // Register client plugin
  this.addPlugin({
    src: path.resolve(__dirname, 'plugin.client.ts'),
    fileName: 'wordpress.plugin.client.ts',
    mode: 'client'
  })
}
