import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'
import {
  notesDataValidator,
  notesQueryValidator,
  notesResolver,
  notesDataResolver,
  notesQueryResolver,
  notesExternalResolver
} from './notes.schema.js'
import { NotesService, getOptions } from './notes.class.js'

export * from './notes.class.js'
export * from './notes.schema.js'

export const notes = (app) => {
  app.use('notes', new NotesService(getOptions(app)), {
    methods: ['find', 'get', 'create', 'update', 'patch', 'remove'],
    events: []
  })
  app.service('notes').hooks({
    around: {
      all: [authenticate('jwt')]
    },
    before: {
      all: [
        schemaHooks.resolveData(notesDataResolver),
        schemaHooks.validateQuery(notesQueryValidator),
        schemaHooks.validateData(notesDataValidator),
        schemaHooks.resolveQuery(notesQueryResolver),
      ]
    },
    after: {
      all: [
        schemaHooks.resolveResult(notesResolver), 
        schemaHooks.resolveExternal(notesExternalResolver)
      ]
    },
    error: {
      all: []
    }
  })
}
