import assert from 'assert'
import { app } from '../../../src/app.js'

describe('chapters service', () => {
  it('registered the service', () => {
    const service = app.service('chapters')

    assert.ok(service, 'Registered the service')
  })
})
