import * as fs from 'fs'
import { promisify } from 'util'

import * as fetch from 'node-fetch'
import { ApolloClient } from 'apollo-client'
import { DocumentNode } from 'graphql'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import gql from 'graphql-tag'

const exists = promisify(fs.exists)
const makeDir = promisify(fs.mkdir)

export class Client {
  protected readonly apollo: ApolloClient<any>

  /**
   * Constructor.
   *
   * @param uri
   */
  constructor(uri: string = 'http://localhost:4010') {
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

function writeData(path, data) {
  return new Promise((resolve, reject) => {
    try {
      fs.writeFile(path, JSON.stringify(data), 'UTF-8', () => resolve(`${path} Write Successful`))
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(`${path} Write Failed. ${e}`)
      reject(new Error(`${path} Write Failed. ${e}`))
    }
  })
}

export default function pressPlugin(context, inject) {
  const uri = process.env.IS_GENERATING ? 'http://localhost:4021' : 'http://localhost:4020'
  const client = new Client(uri)
  const source = {
    async resolve(path: string, fn) {
      const data = await fn({
        query: client.query.bind(client),
      })

      if (!path.endsWith('/')) {
        path += '/'
      }
      const dataPath = `./dist${path}index.json`
      if (!(await exists(dataPath))) {
        await makeDir(`./dist${path}`, { recursive: true })
        await writeData(dataPath, data)
      }

      return data
    },
  }

  context.$source = source
  inject('source', source)
}
