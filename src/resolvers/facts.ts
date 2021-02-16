import { Context, Month } from '../types'

export default {
  Query: {
    async facts(_, { month, day }, { facts }: Context) {
      const _month = parseInt(Month[month] || '1')
      console.log(_month)
      console.log(day)
      if (day < 1 || day >= 31) throw new Error('Day not valid')

      return facts.findByMonthAndDay(_month, day)
    },
  },
}