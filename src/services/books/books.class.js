import { KnexService } from '@feathersjs/knex'

export class BooksService extends KnexService {}

export const getOptions = (app) => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('knex'),
    name: 'books'
  }
}
