import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'
import { loadSchema } from '@graphql-tools/load'
import { ApolloServer } from 'apollo-server'
import { join } from 'path'

import { GraphQLDate } from 'graphql-scalars'

import { setup } from './db'

import Resolvers from './resolvers'
import { Context } from './types'
import Services from './services'

const filename = join(__dirname, 'db/facts.db')

console.log(Resolvers)

export const bootstrap = async (options: { port: number }) => {
  const db = await setup({
    filename,
    inMemoryOnly: false,
    autoload: true,
    timestampData: true,
  })
  const resolvers = {
    date: GraphQLDate,
  }
  const schema = await loadSchema(`./src/**/*.graphql`, {
    loaders: [new GraphQLFileLoader()],
    resolvers: [resolvers, Resolvers],
  })

  const server = new ApolloServer({
    schema,
    introspection: true,
    debug: true,
    playground: true,
    cors: false,
    mockEntireSchema: false,
    mocks: false,
    context: async (context: Context) => {
      const { facts } = Services(db)

      context.facts = facts

      return context
    },
  })
  return server.listen(options.port)
}