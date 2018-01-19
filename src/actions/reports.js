import axios from 'axios'

const REPORTS_PATH = '/reports'
const EARNINGS_PATH = '/earnings'
let SERVER_PATH = ''

axios.defaults.headers.common['Authorization'] =
  'JWT ' + localStorage.getItem(process.env.REACT_APP_TOKEN_NAME)

switch (process.env.REACT_APP_ENV) {
  case 'production':
    SERVER_PATH = process.env.REACT_APP_SERVER_PATH_PRODUCTION;
    break;
  case 'development':
    SERVER_PATH = process.env.REACT_APP_SERVER_PATH_DEVELOPMENT;
    break;
  default:
    break;
}

const getAnalizeEarning = (dateFrom, dateTo, type) => {
  return dispatch => {
    return axios.post(
      SERVER_PATH + REPORTS_PATH + EARNINGS_PATH + '/' + type,
      {
        from: dateFrom,
        to: dateTo
      }
    )
      .then(response => {
        dispatch({
          type: 'LOAD_EARNINGS_BY',
          earningsBy: response.data.result,
          typeBy: type
        })
      })
  }
}

export {
  getAnalizeEarning
}