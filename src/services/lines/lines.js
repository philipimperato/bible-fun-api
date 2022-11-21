import { authenticate } from '@feathersjs/authentication'
import { LinesService, getOptions } from './lines.class.js'
import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  linesDataValidator
} from './lines.schema.js'

export * from './lines.class.js'
export * from './lines.schema.js'

export const lines = (app) => {
  app.use('lines', new LinesService(getOptions(app)), {
    methods: ['find', 'get', 'create', 'update', 'patch', 'remove'],
    events: []
  })
  app.service('lines').hooks({
    around: {
      all: [authenticate('jwt')]
    },
    before: {
      all: [
        schemaHooks.validateData(linesDataValidator),
      ]
    }
  })
}
