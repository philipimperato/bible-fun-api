import { resolve } from '@feathersjs/schema'
import { Type, getDataValidator, getValidator, querySyntax } from '@feathersjs/typebox'
import { dataValidator, queryValidator } from '../../schemas/validators.js'

export const versesSchema = Type.Object(
  {
    // unique to the bible, random order
    id: Type.Number(), 
    chapterId: Type.Number(),

    /*  BB CCC VVV 
        Psalms 150:2 = 1 19 150 002
        Example: Psalms 150 = 119150001 - 11915006 */
    verseId: Type.Number(), 

    // most of the times, verse / line overlap. 
    // raw is the original, verse may include formatting and HTML
    verse: Type.Number(),
    verseText: Type.String(),
    rawText: Type.String(),
    
    // Psalms 150:2
    name: Type.String()
  },
  { $id: 'Verses', additionalProperties: false }
)
export const versesResolver = resolve({
  properties: {}
})

export const versesExternalResolver = resolve({
  properties: {}
})

export const versesDataSchema = Type.Pick(versesSchema, ['verse', 'text'], {
  $id: 'VersesData',
  additionalProperties: false
})
export const versesDataValidator = getDataValidator(versesDataSchema, dataValidator)
export const versesDataResolver = resolve({
  properties: {}
})

export const versesQueryProperties = Type.Pick(versesSchema, ['id', 'verse', 'text'], { additionalProperties: false })
export const versesQuerySchema = querySyntax(versesQueryProperties)
export const versesQueryValidator = getValidator(versesQuerySchema, queryValidator)
export const versesQueryResolver = resolve({
  properties: {}
})
