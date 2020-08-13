import fetch from 'node-fetch'
import { ApolloClient } from 'apollo-client'
import { DocumentNode } from 'graphql'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import gql from 'graphql-tag'

export class Client {
  protected readonly apollo: ApolloClient<any>

  constructor(uri: string) {
    const cache = new InMemoryCache()
    const link = new HttpLink({ uri, fetch: fetch as any })
    this.apollo = new ApolloClient({ cache, link })
  }
  query(query: DocumentNode | string, variables?: any): Promise<any> {
    if (typeof query === 'string') {
      query = gql(query) as DocumentNode
    }

    return this.apollo.query({ query, variables }).then(res => res.data)
  }
}

const cache = {}
export default async function wordpressPlugin(context, inject) {
  const source = {
    resolve(path, fn) {
      const uri = context.isDev
        ? 'http://localhost:4020'
        : 'http://localhost:4020'
      const client = new Client(uri)
      if (!path.endsWith('/')) {
        path += '/'
      }

      if (context.isDev || !context.isStatic) {
        return fn({
          query: client.query.bind(client)
        })
      }

      if (cache[path]) {
        return cache[path]
      }

      return fetch(`${path}index.json`).then((response) => {
        cache[path] = response.json()

        return cache[path]
      })
    }
  }

  context.$source = source
  inject('source', source)
}
