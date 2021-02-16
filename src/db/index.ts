import Datastore from 'nedb-promises'

export const setup = (options: {
  autoload: boolean
  inMemoryOnly?: boolean
  timestampData: boolean
  filename?: string
}) =>
  Datastore.create({
    ...options,
  })

// export const facts = setup({
//   filename: 'facts.db',
//   autoload: true,
//   timestampData: true,
//   inMemoryOnly: false,
// })