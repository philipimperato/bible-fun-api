import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'
import {
  booksDataValidator,
  booksQueryValidator,
  booksResolver,
  booksDataResolver,
  booksQueryResolver,
  booksExternalResolver
} from './books.schema.js'
import { BooksService, getOptions } from './books.class.js'

export * from './books.class.js'
export * from './books.schema.js'

export const books = (app) => {
  app.use('books', new BooksService(getOptions(app)), {
    methods: ['find', 'get', 'create', 'update', 'patch', 'remove'],
    events: []
  })
  app.service('books').hooks({
    around: {
      all: [authenticate('jwt')]
    },
    before: {
      all: [
        schemaHooks.validateQuery(booksQueryValidator),
        schemaHooks.validateData(booksDataValidator),
        schemaHooks.resolveQuery(booksQueryResolver),
        schemaHooks.resolveData(booksDataResolver)
      ]
    },
    after: {
      all: [schemaHooks.resolveResult(booksResolver), schemaHooks.resolveExternal(booksExternalResolver)]
    },
    error: {
      all: []
    }
  })
}
