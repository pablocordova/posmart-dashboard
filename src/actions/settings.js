import axios from 'axios'
import open from 'oauth-open'

const GET_PRINTER_DATA_PATH = '/printerinfo'
const GET_ACCESSTOKEN_PATH = '/googletoken'
const GET_GOOGLE_URL_PATH = '/googleurl'
const SETTINGS_PATH = '/settings'

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

const getUrlGoogleToken = () => {

  return () => {
    return axios.get(
      SERVER_PATH + SETTINGS_PATH + GET_GOOGLE_URL_PATH,
      {
        headers: {
          'Authorization': 'JWT ' + localStorage.getItem('token')
        }
      }
    )
      .then(response => {
        console.log('response to obtains google url data')
        console.log(response)
        localStorage.setItem('googleURLToken', response.data.result.googleURLToken)
      })
  }
}

const getTokenGoogle = () => {
  return () => {

    const url = localStorage.getItem('googleURLToken')

    // Pop up for google autorization
    open(url, function(err, data) {

      if (err) throw err;

      axios.post(
        SERVER_PATH + SETTINGS_PATH + GET_ACCESSTOKEN_PATH,
        {
          code: data.code
        },
        {
          headers: {
            'Authorization': 'JWT ' + localStorage.getItem('token')
          }
        }
      )
        .then(response => {
          console.log('response to obtains real token to comunicate with google, for 1 hour')
          console.log(response)
          //localStorage.setItem('googleToken', response.data.result.googleToken)
        })
    });

  }
}

const getPrinterData = () => {

  return () => {

    return axios.get(
      SERVER_PATH + SETTINGS_PATH + GET_PRINTER_DATA_PATH,
      {
        headers: {
          'Authorization': 'JWT ' + localStorage.getItem('token')
        }
      }
    )
      .then(response => {
        console.log('Printer info')
        console.log(response.data.result)
      })
  }

}

export { getPrinterData, getTokenGoogle, getUrlGoogleToken }