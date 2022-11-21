import assert from 'assert'
import { app } from '../../../src/app.js'

describe('lines service', () => {
  it('registered the service', () => {
    const service = app.service('lines')

    assert.ok(service, 'Registered the service')
  })
})
