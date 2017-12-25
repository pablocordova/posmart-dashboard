import axios from 'axios'

const REPORTS_PATH = '/reports'
const EARNINGS_PATH = '/earnings'
const BYCLIENTS_PATH = '/byclient'
let SERVER_PATH = ''

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

const getEarningByClients = () => {
  return dispatch => {
    return axios.get(
      SERVER_PATH + REPORTS_PATH + EARNINGS_PATH + BYCLIENTS_PATH,
      {
        headers: {
          'Authorization': 'JWT ' + localStorage.getItem('token')
        }
      }
    )
      .then(response => {
        dispatch({
          type: 'LOAD_EARNINGS_BY_CLIENT',
          earningsByClient: response.data.result,
        })
      })
  }
}

export {
  getEarningByClients
}