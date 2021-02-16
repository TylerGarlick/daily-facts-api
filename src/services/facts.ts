import { FactEntity, Fact } from '../types'
import Datastore from 'nedb-promises'

type MultipleOptions = {
  multi: boolean
}

export type UpsertOptions = MultipleOptions & {
  upsert: boolean
  returnUpdatedDocs: boolean
}

export type RemoveOptions = MultipleOptions & {}

export interface FactsService {
  all(query: Partial<FactEntity>): Promise<Fact[]>

  findByMonthAndDay(month: number, day: number): Promise<Fact[]>

  findByDate(date: Date): Promise<Fact[]>

  findOne(query: Partial<FactEntity>): Promise<Fact | FactEntity | undefined>

  insert(entity: Partial<Fact>): Promise<Fact | FactEntity>

  removeOne(query: Partial<FactEntity>): Promise<boolean>

  removeMany(query: Partial<FactEntity>): Promise<boolean>

  upsertOne(
    query: Partial<FactEntity>,
    entity: Partial<FactEntity>,
    options: UpsertOptions,
  ): Promise<FactEntity | undefined>
}

export default (datastore: Datastore) => {
  return {
    async all(query: Partial<FactEntity>): Promise<Fact[]> {
      const results = await datastore.find(query, { _id: 0 })
      return results.map((r) => (r as unknown) as Fact)
    },
    async findByDate(date: Date): Promise<Fact[]> {
      const month = date.getMonth()
      const day = date.getDate()

      return this.findByMonthAndDay(month, day)
    },
    async findByMonthAndDay(month: number, day: number): Promise<Fact[]> {
      return ((await datastore
        .find({
          month,
          day,
        })
        .exec()) as unknown) as Fact[]
    },
    async upsertOne(
      query: Partial<FactEntity>,
      entity: Partial<FactEntity>,
    ): Promise<FactEntity | undefined> {
      const result = await datastore.update(query, entity, {
        returnUpdatedDocs: true,
        multi: false,
        upsert: true,
      })
      return (result as unknown) as FactEntity
    },
    async removeMany(
      query: Partial<FactEntity>,
      options: RemoveOptions = { multi: true },
    ): Promise<boolean> {
      const results = await datastore.remove(query, options)
      return results >= 1
    },
    async removeOne(
      query: Partial<FactEntity>,
      options: RemoveOptions = { multi: false },
    ): Promise<boolean> {
      const results = await datastore.remove(query, options)
      return results == 1
    },
    async findOne(
      query: Partial<FactEntity>,
    ): Promise<Fact | FactEntity | undefined> {
      return ((await datastore.find(query, {})) as unknown) as FactEntity
    },
    async insert(entity: Partial<Fact>): Promise<Fact | FactEntity> {
      return ((await datastore.insert(entity)) as unknown) as FactEntity
    },
  } as FactsService
}