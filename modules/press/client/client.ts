import fetch from 'node-fetch'
import { ApolloClient } from 'apollo-client'
import { DocumentNode } from 'graphql'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { Service } from 'typedi'
import gql from 'graphql-tag'

@Service()
export class Client {
  protected readonly apollo: ApolloClient<any>

  constructor() {
    const cache = new InMemoryCache()
    const link = new HttpLink({ uri: 'http://localhost:4020/', fetch: fetch as any })
    this.apollo = new ApolloClient({ cache, link })
  }

  query(query: DocumentNode | string, variables?: any): Promise<any> {
    if (typeof query === 'string') {
      query = gql(query) as DocumentNode
    }

    return this.apollo.query({ query, variables }).then(res => res.data)
  }
}
