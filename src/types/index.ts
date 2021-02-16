import { FactsService } from '../services/facts'

export enum Region {
  GLOBAL = `GLOBAL`,
  NATIONAL = `NATIONAL`,
  LOCAL = `LOCAL`,
  OTHER = `OTHER`,
}

export enum Month {
  JANUARY = 1,
  FEBRUARY,
  MARCH,
  APRIL,
  MAY,
  JUNE,
  JULY,
  AUGUST,
  SEPTEMBER,
  OCTOBER,
  NOVEMBER,
  DECEMBER,
}

export interface Id {
  _id: string
}

export interface Fact {
  month: Month
  day: number
  title: string
  description: string
  region: Region
  locale: string
  beganAt: Date
  durationInDays: number
  active: boolean
}

export interface FactEntity extends Fact, Id {}

export interface Context {
  facts: FactsService
}