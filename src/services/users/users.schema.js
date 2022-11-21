import { resolve } from '@feathersjs/schema'
import { Type, getDataValidator, getValidator, querySyntax } from '@feathersjs/typebox'
import { passwordHash } from '@feathersjs/authentication-local'
import { dataValidator, queryValidator } from '../../schemas/validators.js'

// Main data model schema
export const usersSchema = Type.Object(
  {
    id: Type.Number(),
    email: Type.String(),
    password: Type.String(),
    status: Type.Union([ 
      Type.Literal('inactive'), 
      Type.Literal('active') 
    ]),
  },
  { $id: 'Users', additionalProperties: false }
)
export const userResolver = resolve({
  properties: {}
})

export const userExternalResolver = resolve({
  properties: {
    password: async () => undefined
  }
})

export const userDataSchema = Type.Pick(usersSchema, ['email', 'password'], {
  $id: 'UsersData',
  additionalProperties: false
})
export const userDataValidator = getDataValidator(userDataSchema, dataValidator)
export const userDataResolver = resolve({
  properties: {
    password: passwordHash({ strategy: 'local' })
  }
})

export const userQueryProperties = Type.Pick(usersSchema, ['id', 'email'])
export const userQuerySchema = querySyntax(userQueryProperties)
export const userQueryValidator = getValidator(userQuerySchema, queryValidator)
export const userQueryResolver = resolve({
  properties: {
    id: async (value, user, context) => {
      if (context.params.user) {
        return context.params.user.id
      }
      return value
    }
  }
})
