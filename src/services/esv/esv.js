import { authenticate } from '@feathersjs/authentication'
import { EsvService, getOptions } from './esv.class.js'

export * from './esv.class.js'
export * from './esv.schema.js'

export const esv = (app) => {
  app.use('esv', new EsvService(getOptions(app)), {
    methods: ['find'],
    events: []
  })
  app.service('esv').hooks({
    around: {
      all: [authenticate('jwt')]
    },
    before: {
      all: []
    },
    after: {
      all: []
    },
    error: {
      all: []
    }
  })
}
