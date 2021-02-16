import { mergeResolvers } from '@graphql-tools/merge'

import factsResolver from './facts'

const resolvers = [factsResolver]

export default mergeResolvers(resolvers)