import { resolve } from '@feathersjs/schema'
import { Type, getDataValidator, getValidator, querySyntax } from '@feathersjs/typebox'
import { dataValidator, queryValidator } from '../../schemas/validators.js'

export const booksSchema = Type.Object(
  {
    id: Type.Number(),
    bookId: Type.Number(),
    name: Type.String(),
    short: Type.String(),
    testament: Type.String(),
  },
  { $id: 'Books', additionalProperties: false }
)
export const booksResolver = resolve({
  properties: {}
})

export const booksExternalResolver = resolve({
  properties: {}
})

export const booksDataSchema = Type.Pick(booksSchema, ['text'], {
  $id: 'BooksData',
  additionalProperties: false
})
export const booksDataValidator = getDataValidator(booksDataSchema, dataValidator)
export const booksDataResolver = resolve({
  properties: {}
})

export const booksQueryProperties = Type.Pick(booksSchema, ['id', 'text'], { additionalProperties: false })
export const booksQuerySchema = querySyntax(booksQueryProperties)
export const booksQueryValidator = getValidator(booksQuerySchema, queryValidator)
export const booksQueryResolver = resolve({
  properties: {}
})
