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
  properties: {
    notes: async (_value, verse, { app }) => {
      const { id } = verse
      const query = { verseId: id, $select: ['id', 'note', 'createdAt'] }
      return await app.service('notes').find({ query, paginate: false })
    }
  }
})

export const versesExternalResolver = resolve({
  properties: {}
})

export const versesDataSchema = Type.Pick(versesSchema, ['verse', 'verseText', 'createdAt', 'notes'], {
  $id: 'VersesData',
  additionalProperties: false
})
export const versesDataValidator = getDataValidator(versesDataSchema, dataValidator)
export const versesDataResolver = resolve({
  properties: {}
})

export const versesQueryProperties = Type.Pick(versesSchema, ['id', 'verse', 'verseText', 'createdAt', 'notes'], { additionalProperties: false })
export const versesQuerySchema = querySyntax(versesQueryProperties)
export const versesQueryValidator = getValidator(versesQuerySchema, queryValidator)
export const versesQueryResolver = resolve({
  properties: {}
})
