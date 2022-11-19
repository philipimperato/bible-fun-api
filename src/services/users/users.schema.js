import { resolve } from '@feathersjs/schema'
import { Type, getDataValidator, getValidator, querySyntax } from '@feathersjs/typebox'
import { passwordHash } from '@feathersjs/authentication-local'
import { dataValidator, queryValidator } from '../../schemas/validators.js'

// Main data model schema
export const userSchema = Type.Object(
  {
    id: Type.Number(),
    email: Type.String(),
    password: Type.String(),
    status: Type.Union([ 
      Type.Literal('inactive'), 
      Type.Literal('active') 
    ]),
  },
  { $id: 'User', additionalProperties: false }
)
export const userResolver = resolve({
  properties: {}
})

export const userExternalResolver = resolve({
  properties: {
    // The password should never be visible externally
    password: async () => undefined
  }
})

// Schema for the basic data model (e.g. creating new entries)
export const userDataSchema = Type.Pick(userSchema, ['email', 'password'], {
  $id: 'UserData',
  additionalProperties: false
})
export const userDataValidator = getDataValidator(userDataSchema, dataValidator)
export const userDataResolver = resolve({
  properties: {
    password: passwordHash({ strategy: 'local' })
  }
})

// Schema for allowed query properties
export const userQueryProperties = Type.Pick(userSchema, ['id', 'email'])
export const userQuerySchema = querySyntax(userQueryProperties)
export const userQueryValidator = getValidator(userQuerySchema, queryValidator)
export const userQueryResolver = resolve({
  properties: {
    // If there is a user (e.g. with authentication), they are only allowed to see their own data
    id: async (value, user, context) => {
      if (context.params.user) {
        return context.params.user.id
      }
      return value
    }
  }
})
