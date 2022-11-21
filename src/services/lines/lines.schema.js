import { Type, getDataValidator } from '@feathersjs/typebox'
import { dataValidator } from '../../schemas/validators.js'

export const linesSchema = Type.Object(
  {
    id: Type.Number(),
    verseId: Type.Number(),

    /*  1 VVV LL 
        line (some verses cover more than 1 line) of  the chapter, think Psalms 
        Example: Psalms 61:1 1 061 01, 1 061 02 1 061 03 */
    lineId: Type.Number(),
    line: Type.Number(),

    verseText: Type.String(),
    rawText: Type.String()
  },
  { $id: 'Lines', additionalProperties: false }
)

export const linesDataSchema = Type.Pick(linesSchema, ['verseId', 'lineId', 'text', 'rawText'], {
  $id: 'LinesData',
  additionalProperties: false
})
export const linesDataValidator = getDataValidator(linesDataSchema, dataValidator)