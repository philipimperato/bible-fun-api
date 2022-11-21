import assert from 'assert'
import { app } from '../../../src/app.js'

describe('esv service', () => {
  it('registered the service', () => {
    const service = app.service('esv')

    assert.ok(service, 'Registered the service')
  })
})
