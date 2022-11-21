import assert from 'assert'
import { app } from '../../../src/app.js'

describe('verses service', () => {
  it('registered the service', () => {
    const service = app.service('verses')

    assert.ok(service, 'Registered the service')
  })
})
