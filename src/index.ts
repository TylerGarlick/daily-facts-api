import { bootstrap } from './server'

bootstrap({ port: 4000 })
  .then(({ url }) => console.log(`Server started: ${url}`))
  .catch(console.error)