import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'
import {
  userDataValidator,
  userQueryValidator,
  userResolver,
  userDataResolver,
  userQueryResolver,
  userExternalResolver
} from './users.schema.js'
import { UserService, getOptions } from './users.class.js'

export * from './users.class.js'
export * from './users.schema.js'

export const users = (app) => {
  app.use('users', new UserService(getOptions(app)), {
    methods: ['find', 'get', 'create', 'update', 'patch', 'remove'],
    events: []
  })
  app.service('users').hooks({
    around: {
      all: [],
      find: [authenticate('jwt')],
      get: [authenticate('jwt')],
      create: [],
      update: [authenticate('jwt')],
      patch: [authenticate('jwt')],
      remove: [authenticate('jwt')]
    },
    before: {
      all: [
        schemaHooks.validateQuery(userQueryValidator),
        schemaHooks.validateData(userDataValidator),
        schemaHooks.resolveQuery(userQueryResolver),
        schemaHooks.resolveData(userDataResolver)
      ]
    },
    after: {
      all: [
        schemaHooks.resolveResult(userResolver), 
        schemaHooks.resolveExternal(userExternalResolver)
      ]
    },
    error: {
      all: []
    }
  })
}
