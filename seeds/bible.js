import { app } from '../src/app.js'
import { readFile } from 'fs/promises';

const knex = app.get('knex')
const log = (e) => {
  console.error('\x1b[31m', 'Error: ', e)
  console.log('\x1b[0m', '')
}

class DevelopSeedSource {
  getSeeds() {
    return Promise.resolve(['seed'])
  }

  getSeed() {
    return { 
      seed: async () => {
        const rawBookId = 19
        const bookId = this.idBuilder({ bookId: rawBookId }, 'BB')

        await knex
          .insert({
            bookId,
            book: 'Psalms',
            short: 'psa',
            testament: 'OT'
          })
          .into('books')
          .catch(log)

        const { text: psalms } = JSON.parse(await readFile("./seeds/data/psalms.json", "utf8"));
        
        for (const { text: verses, name } of psalms) {
          const [book, rawChapter] = name.split(' ')
          const chapterId = this.idBuilder({ bookId: rawBookId, chapterId: rawChapter }, 'BBCCC')

          const [{ id: primaryChapterId }] = await knex
            .insert({
              bookId: rawBookId,
              chapterId,
              chapter: rawChapter,
              name: `${ book } ${ rawChapter }`
            })
            .into('chapters')
            .returning('id')
            .catch(log)

          const verseIds = verses.map(v => parseInt(v.ID))
          const scopedVerseIds = []
          
          for (const { text, ID: verse } of verses) {
            const verseId = this.idBuilder({ 
              bookId: rawBookId,
              chapterId: rawChapter,
              verseId: parseInt(verse)
            }, 'BBCCCVVV')
            
            if (scopedVerseIds.includes(verseId)) continue;

            const verseData = {
              chapterId: primaryChapterId,
              verseId,
              verse,
              verseText: text,
              rawText: text,
              name: `${ book } ${ rawChapter }:${ verse }`
            }

            if (this.count(verseIds, verse) > 0) {
              const fullText = this.buildFullText(verses, verse)

              verseData.verseText = fullText
              verseData.rawText = fullText

              const [{ id }] = await knex
                .insert(verseData)
                .into('verses')
                .returning('id')
                .catch(log)

              const lines = this.linesBuilder(id, verses, verse)
              await knex.insert(lines).into('lines').catch(log)
            } else {
              await create(verseData)
            }

            scopedVerseIds.push(verseId)
            console.log(verseId, ' - added')
          }
        }
      }
    }
  }

  buildFullText(verses, verse) {
    const lines = verses.filter(v => v.ID == verse)
    let fullText = ''

    for (const { text } of lines) {
      fullText += (text + " ")
    }

    return fullText.trim()
  }

  linesBuilder(verseId, verses, verse) {
    const lines = verses.filter(v => v.ID == verse)
    const linesToCreate = []
    let lineIdx = 1
    
    for (const { text, ID } of lines) {
      linesToCreate.push({
        verseId,

        line: lineIdx,
        lineText: text,
        rawText: text,
      })

      lineIdx++
    }

    return linesToCreate
  }

  count(ary, idToCount) {
    return ary.reduce((total, id) => total+ (id == idToCount), 0)
  }

  idBuilder(data, fmt) {
    let id = '1'

    switch (fmt) {
      case 'BB': {
        const { bookId } = data
        const fmtId = `${ id }${ this.fmt(bookId, 2) }`
        return parseInt(fmtId)
      }
      case 'BBCCC': {
        const { bookId, chapterId } = data
        const fmtId = `${ id }${ this.fmt(bookId, 2) }${ this.fmt(chapterId, 3) }`
        return parseInt(fmtId)
      }
      case 'BBCCCVVV': {
        const { bookId, chapterId, verseId } = data
        const fmtId = `${ id }${ this.fmt(bookId, 2) }${ this.fmt(chapterId, 3) }${ this.fmt(verseId, 3) }`
        return parseInt(fmtId)
      }
    }
  }

  fmt(num, min) {
    const formattedNum = parseFloat(num)

    return formattedNum.toLocaleString('en-US', {
      minimumIntegerDigits: min,
      useGrouping: false
    })
  }
}

knex.seed.run({ seedSource: new DevelopSeedSource() })
