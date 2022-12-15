import { notes } from './notes/notes.js'
import { lines } from './lines/lines.js'
import { esv } from './esv/esv.js'
import { users } from './users/users.js'
import { verses } from './verses/verses.js'
import { books } from './books/books.js'
import { chapters } from './chapters/chapters.js'

export const services = (app) => {
  app.configure(notes)
  app.configure(lines)
  app.configure(esv)
  app.configure(users)
  app.configure(verses)
  app.configure(books)
  app.configure(chapters)
}
