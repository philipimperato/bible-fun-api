import { resolve } from '@feathersjs/schema'
import { Type, getDataValidator, getValidator, querySyntax } from '@feathersjs/typebox'
import { dataValidator, queryValidator } from '../../schemas/validators.js'

export const notesSchema = Type.Object(
  {
    id: Type.Number(),
    userId: Type.Number(),
    verseId: Type.Number(),

    note: Type.String()
  },
  { $id: 'Notes', additionalProperties: false }
)
export const notesResolver = resolve({
  properties: {
    userId: async (value, user, context) => {
      if (context.params.user) {
        return context.params.user.id
      }
      return value
    }
  }
})

export const notesExternalResolver = resolve({
  properties: {}
})

export const notesDataSchema = Type.Pick(notesSchema, ['userId', 'verseId', 'note'], {
  $id: 'NotesData',
  additionalProperties: false
})
export const notesDataValidator = getDataValidator(notesDataSchema, dataValidator)
export const notesDataResolver = resolve({
  properties: {
    userId: async (value, user, context) => {
      if (context.params.user) {
        return context.params.user.id
      }
      return value
    }
  }
})

export const notesQueryProperties = Type.Pick(notesSchema, 
  ['id', 'userId', 'verseId', 'note'], 
  { additionalProperties: false }
)
export const notesQuerySchema = querySyntax(notesQueryProperties)
export const notesQueryValidator = getValidator(notesQuerySchema, queryValidator)
export const notesQueryResolver = resolve({
  properties: {
    userId: async (value, user, context) => {
      if (context.params.user) {
        return context.params.user.id
      }
      return value
    }
  }
})
