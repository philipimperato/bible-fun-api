import { feathers } from '@feathersjs/feathers'
import authenticationClient from '@feathersjs/authentication-client'
const linesServiceMethods = ['find', 'get', 'create', 'update', 'patch', 'remove']

const esvServiceMethods = ['find']

const versesServiceMethods = ['find', 'get', 'create', 'update', 'patch', 'remove']

const booksServiceMethods = ['find', 'get', 'create', 'update', 'patch', 'remove']

const chaptersServiceMethods = ['find', 'get', 'create', 'update', 'patch', 'remove']

export {}

const userServiceMethods = ['find', 'get', 'create', 'update', 'patch', 'remove']

/**
 * Returns a  client for the api app.
 *
 * @param connection The REST or Socket.io Feathers client connection
 * @param authenticationOptions Additional settings for the authentication client
 * @see https://dove.feathersjs.com/api/client.html
 * @returns The Feathers client application
 */
export const createClient = (connection, authenticationOptions = {}) => {
  const client = feathers()

  client.configure(connection)
  client.configure(authenticationClient(authenticationOptions))

  client.use('users', connection.service('users'), {
    methods: userServiceMethods
  })

  client.use('chapters', connection.service('chapters'), {
    methods: chaptersServiceMethods
  })

  client.use('books', connection.service('books'), {
    methods: booksServiceMethods
  })

  client.use('verses', connection.service('verses'), {
    methods: versesServiceMethods
  })

  client.use('esv', connection.service('esv'), {
    methods: esvServiceMethods
  })

  client.use('lines', connection.service('lines'), {
    methods: linesServiceMethods
  })

  return client
}
