import { app } from '../src/app.js'
import bcrypt from 'bcryptjs'

const knex = app.get('knex')
const hashPassword = async password => bcrypt.hash(password, 10)
const addUser = async (email, password) => {
  return {
    email,
    password: await hashPassword(password),
    status: 'active' 
  }
}
const log = (e) => {
  console.error('\x1b[31m', 'Error: ', e.detail)
  console.log('\x1b[0m', '')
}

class DevelopSeedSource {
  getSeeds() {
    return Promise.resolve(['seed'])
  }

  getSeed() {
    return { 
      seed: async (knex) => {
        await this.truncate()

        await knex
          .insert([ 
            await addUser('admin@example.com', 'admin'), 
            await addUser('user@example.com', 'user'),
            await addUser('viewer@example.com', 'viewer')
          ])
          .into('users')
          .catch(log)
        
        const { id: bookId } = await knex
          .insert([
            { name: 'Psalms', testament: 'New' }
          ])
          .into('books')
          .catch(log)

        process.exit(0)
      },

      truncate: async () => {
        await knex.truncate('users')
        await knex.truncate('books')
      }
    }
  }
}

knex.seed.run({ seedSource: new DevelopSeedSource() })
