import axios from 'axios';

const formatParams = ({ book, chapter, verse }) => `${ book }+${ chapter }`

export class EsvService {
  constructor(options) {
    this.options = options
  }

  async find(_params) {
    const options = {
      'include-headings': false,
      'include-passage-references': false,
      'include-footnotes': false,
      'include-headings': false,
      'include-footnote-body': false,
      'include-short-copyright': false,
    }
    const paramsString = formatParams(_params.query)
    const token = '1bbe9b239755b788b1eeeca847c9f5cbfdf00d9f'
    const esvURL = 'https://api.esv.org/v3/passage/text/?q='
    const optionsString = new URLSearchParams(options).toString()
    const queryString = `${ esvURL }${ paramsString }&${optionsString}`
    const config = {
      headers: { Authorization: `Token ${ token }` }
    };
   
    return axios
      .get(queryString, config)
      .then(response => {
        // const headerDate = response.headers && response.headers.date ? response.headers.date : 'no response date';
        return [{ id: 'tmp', ...response.data }]
      })
      .catch(err => {
        console.log('Error: ', err);
        return []
      })
  }
}

export const getOptions = (app) => {
  return { app }
}
