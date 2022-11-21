import { resolve } from '@feathersjs/schema'
import { Type, getDataValidator, getValidator, querySyntax } from '@feathersjs/typebox'
import { dataValidator, queryValidator } from '../../schemas/validators.js'

// Main data model schema
export const chaptersSchema = Type.Object(
  {
    id: Type.Number(),
    bookId: Type.Number(),

    /*  1 + BB CCC 
        Psalms 150 = 1 19 150
        Example: Psalms = 119001 - 119150 */
    chapterId: Type.Number(), 
    chapter: Type.Number(),
    
    // Psalms 150
    name: Type.String(),
    numOfVerses: Type.Number(),
  },
  { $id: 'Chapters', additionalProperties: false }
)
export const chaptersResolver = resolve({
  properties: {}
})

export const chaptersExternalResolver = resolve({
  properties: {}
})

// Schema for creating new entries
export const chaptersDataSchema = Type.Pick(chaptersSchema, ['name'], {
  $id: 'ChaptersData',
  additionalProperties: false
})
export const chaptersDataValidator = getDataValidator(chaptersDataSchema, dataValidator)
export const chaptersDataResolver = resolve({
  properties: {}
})

// Schema for allowed query properties
export const chaptersQueryProperties = Type.Pick(chaptersSchema, ['id', 'name', 'bookId'], {
  additionalProperties: false
})
export const chaptersQuerySchema = querySyntax(chaptersQueryProperties)
export const chaptersQueryValidator = getValidator(chaptersQuerySchema, queryValidator)
export const chaptersQueryResolver = resolve({
  properties: {}
})
