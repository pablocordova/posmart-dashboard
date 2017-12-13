import axios from 'axios'

const ADVANCED_SEARCH = '/search/advanced'
const SALES_PATH = '/sales'
const SETTINGS_PATH = '/settings'
const PRINT_PATH = '/print/sale'
const PROCESSED_SALES_PATH = '/processed'

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

const hideCompleteReceipt = () => {
  return ({
    type: 'HIDE_COMPLETE_RECEIPT'
  })
}

const getReceipts = (data) => {
  console.log(data)
  return dispatch => {
    return axios.post(
      SERVER_PATH + SALES_PATH + ADVANCED_SEARCH,
      {
        id: data.id,
        day: data.day,
        client: data.client,
        seller: data.seller,
        total: data.total,
        state: data.state
      },
      {
        headers: {
          'Authorization': 'JWT ' + localStorage.getItem('token')
        }
      }
    )
      .then(response => {
        dispatch({
          type: 'LOAD_RECEIPTS',
          receipts: response.data.result,
        })
      })
  }

}

const showCompleteReceipt = (idReceipt) => {

  return dispatch => {
    return axios.get(
      SERVER_PATH + SALES_PATH + PROCESSED_SALES_PATH + '/' + idReceipt,
      {
        headers: {
          'Authorization': 'JWT ' + localStorage.getItem('token')
        }
      }
    )
      .then(response => {
        dispatch({
          type: 'SHOW_COMPLETE_RECEIPT',
          saleSelected: response.data.result,
        })
      })
  }

}

const printSale = (idReceipt) => {

  return () => {
    return axios.post(
      SERVER_PATH + SETTINGS_PATH + PRINT_PATH,
      {
        saleID: idReceipt
      },
      {
        headers: {
          'Authorization': 'JWT ' + localStorage.getItem('token')
        }
      }
    )
      .then(res => {
        console.log(res)
      })
      .catch(err=> {
        console.log(err)
      })
  }

}

export {
  hideCompleteReceipt,
  getReceipts,
  showCompleteReceipt,
  printSale
}