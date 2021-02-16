import facts from './facts'
import Datastore from 'nedb-promises'

export default (db: Datastore) => ({
  facts: facts(db),
})