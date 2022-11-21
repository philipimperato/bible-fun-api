import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'
import {
  versesDataValidator,
  versesQueryValidator,
  versesResolver,
  versesDataResolver,
  versesQueryResolver,
  versesExternalResolver
} from './verses.schema.js'
import { VerseService, getOptions } from './verses.class.js'

export * from './verses.class.js'
export * from './verses.schema.js'

export const verses = (app) => {
  app.use('verses', new VerseService(getOptions(app)), {
    methods: ['find', 'get', 'create', 'update', 'patch', 'remove'],
    events: []
  })
  app.service('verses').hooks({
    around: {
      all: [authenticate('jwt')]
    },
    before: {
      all: [
        schemaHooks.validateQuery(versesQueryValidator),
        schemaHooks.validateData(versesDataValidator),
        schemaHooks.resolveQuery(versesQueryResolver),
        schemaHooks.resolveData(versesDataResolver)
      ]
    },
    after: {
      all: [schemaHooks.resolveResult(versesResolver), schemaHooks.resolveExternal(versesExternalResolver)]
    },
    error: {
      all: []
    }
  })
}
