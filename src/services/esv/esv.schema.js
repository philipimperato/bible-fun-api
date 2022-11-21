import { resolve } from '@feathersjs/schema'
import { Type, getDataValidator, getValidator, querySyntax } from '@feathersjs/typebox'
import { dataValidator, queryValidator } from '../../schemas/validators.js'

export const esvSchema = Type.Object(
  {
    id: Type.Number(),
    text: Type.String()
  },
  { $id: 'Esv', additionalProperties: false }
)
export const esvResolver = resolve({
  properties: {}
})

export const esvExternalResolver = resolve({
  properties: {}
})

export const esvDataSchema = Type.Pick(esvSchema, ['text'], {
  $id: 'EsvData',
  additionalProperties: false
})
export const esvDataValidator = getDataValidator(esvDataSchema, dataValidator)
export const esvDataResolver = resolve({
  properties: {}
})

export const esvQueryProperties = Type.Pick(esvSchema, ['id', 'text'], { additionalProperties: false })
export const esvQuerySchema = querySyntax(esvQueryProperties)
export const esvQueryValidator = getValidator(esvQuerySchema, queryValidator)
export const esvQueryResolver = resolve({
  properties: {}
})
