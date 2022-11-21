import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'
import {
  chaptersDataValidator,
  chaptersQueryValidator,
  chaptersResolver,
  chaptersDataResolver,
  chaptersQueryResolver,
  chaptersExternalResolver
} from './chapters.schema.js'
import { ChapterService, getOptions } from './chapters.class.js'

export * from './chapters.class.js'
export * from './chapters.schema.js'

export const chapters = (app) => {
  app.use('chapters', new ChapterService(getOptions(app)), {
    methods: ['find', 'get', 'create', 'update', 'patch', 'remove'],
    events: []
  })
  app.service('chapters').hooks({
    around: {
      all: [authenticate('jwt')]
    },
    before: {
      all: [
        schemaHooks.validateQuery(chaptersQueryValidator),
        schemaHooks.validateData(chaptersDataValidator),
        schemaHooks.resolveQuery(chaptersQueryResolver),
        schemaHooks.resolveData(chaptersDataResolver)
      ]
    },
    after: {
      all: [
        schemaHooks.resolveResult(chaptersResolver),
        schemaHooks.resolveExternal(chaptersExternalResolver)
      ]
    },
    error: {
      all: []
    }
  })
}
