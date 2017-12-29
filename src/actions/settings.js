import axios from 'axios'
import open from 'oauth-open'
import swal from 'sweetalert2'

const GET_ACCESSTOKEN_PATH = '/googletoken'
const DATA_PRINTER_PATH = '/printer'
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

const getDataPrinter = () => {

  return dispatch => {
    return axios.get(
      SERVER_PATH + SETTINGS_PATH + DATA_PRINTER_PATH,
      {
        headers: {
          'Authorization': 'JWT ' + localStorage.getItem('token')
        }
      }
    )
      .then(response => {
        dispatch({
          type: 'LOAD_DATA_PRINTER',
          dataPrinter: response.data.result
        })
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
        localStorage.setItem('googleURLToken', response.data.result.googleURLToken)
      })
  }
}

const saveSettingPrinter = (printerId, ticketSetting) => {

  return () => {
    return axios.post(
      SERVER_PATH + SETTINGS_PATH + DATA_PRINTER_PATH,
      {
        printerId: printerId,
        ticketSetting: ticketSetting
      },
      {
        headers: {
          'Authorization': 'JWT ' + localStorage.getItem('token')
        }
      }
    )
      .then(response => {
        swal(
          'Excelente!',
          response.data.message,
          'success'
        )
      })
  }
}

const updatePrinterId = (printerId) => {
  return ({
    type: 'UPDATE_PRINTER_ID',
    printerId
  })
}

const updateTicketSetting = (title, head1, head2, foot1, foot2) => {
  return ({
    type: 'UPDATE_TICKET_SETTING',
    ticketTitle: title,
    ticketHead1: head1,
    ticketHead2: head2,
    ticketFoot1: foot1,
    ticketFoot2: foot2
  })
}

export {
  getDataPrinter,
  getTokenGoogle,
  getUrlGoogleToken,
  saveSettingPrinter,
  updatePrinterId,
  updateTicketSetting
}