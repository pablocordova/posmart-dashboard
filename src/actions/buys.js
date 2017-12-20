import axios from 'axios'

const BUYS_PATH = '/buys'
const PRODUCTS_PATH = '/products'
const SEARCH_ADVANCED_PATH = 'search/advanced'

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

const addProductBuy = (allForm) => {
  return ({
    type: 'ADD_PRODUCT_BUY',
    allForm
  })
}

const changeCompanyViewBuy = (companyViewBuy) => {
  return ({
    type: 'CHANGE_COMPANY_VIEW_BUY',
    companyViewBuy
  })
}

const changeDateViewBuy = (dateViewBuy) => {
  return ({
    type: 'CHANGE_DATE_VIEW_BUY',
    dateViewBuy
  })
}

const changeIdViewBuy = (idViewBuy) => {
  return ({
    type: 'CHANGE_ID_VIEW_BUY',
    idViewBuy
  })
}

const deleteProductItem = (index) => {
  return ({
    type: 'DELETE_PRODUCT_ITEM',
    indexProduct: index
  })
}

const hideCompleteBuy = () => {
  return ({
    type: 'HIDE_COMPLETE_BUY'
  })
}

const getBuys = (data) => {
  return dispatch => {
    return axios.post(
      SERVER_PATH + BUYS_PATH + '/' + SEARCH_ADVANCED_PATH,
      {
        id: data.id,
        day: data.day,
        company: data.company,
      },
      {
        headers: {
          'Authorization': 'JWT ' + localStorage.getItem('token')
        }
      }
    )
      .then(response => {
        dispatch({
          type: 'LOAD_BUYS',
          buys: response.data.result,
        })
      })
  }
}

const saveBuy = (id, date, company, total, products) => {
  return dispatch => {
    return axios.post(
      SERVER_PATH + BUYS_PATH,
      {
        id: id,
        date: date,
        company: company,
        total: total,
        products: products
      },
      {
        headers: {
          'Authorization': 'JWT ' + localStorage.getItem('token')
        }
      }
    )
      .then(response => {
        console.log(response.data)
      })
  }
}

const showCompleteBuy = (indexBuy) => {
  return ({
    type: 'SHOW_COMPLETE_BUY',
    indexBuy
  })
}

const showCreateBuy = () => {

  return dispatch => {
    return axios.get(
      SERVER_PATH + PRODUCTS_PATH,
      {
        headers: {
          'Authorization': 'JWT ' + localStorage.getItem('token')
        }
      }
    )
      .then(response => {
        // Filter only that have prices
        let productsWithPrices = response.data.result.filter(product => {
          return product.prices.length > 0
        })
        dispatch({
          type: 'SHOW_CREATE_BUY',
          allProducts: productsWithPrices
        })
      })
  }

}

const updatePrices = prices => {
  return ({
    type: 'UPDATE_PRICES_FORM_VIEW',
    pricesFormView: prices
  })
}
export {
  addProductBuy,
  changeCompanyViewBuy,
  changeDateViewBuy,
  changeIdViewBuy,
  deleteProductItem,
  hideCompleteBuy,
  getBuys,
  saveBuy,
  showCompleteBuy,
  showCreateBuy,
  updatePrices
}