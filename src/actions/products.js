import axios from 'axios'
import swal from 'sweetalert2'

const GET_PRODUCTS_PATH = '/products'
const POST_PRODUCTS_PATH = '/products'
const GET_MIN_UNITS_PATH = '/products/all/min_units'
const GET_CATEGORIES_PATH = '/products/all/categories'
const PRODUCTS_PATH = '/products'
const PRICES_PATH = '/prices'
const POST_INVENTORY_PATH = '/entry'
const UNIT_COST_PATH = '/cost'
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

const loadPrices = (product) => {
  return dispatch => {
    return axios.get(
      SERVER_PATH + PRODUCTS_PATH + '/' + product.id + PRICES_PATH
    )
      .then(response => {
        dispatch({
          type: 'LOAD_PRICES',
          prices: response.data.result
        })
      })
  }
}

const changeViewCost = (index, value) => {
  return ({
    type: 'CHANGE_VIEW_COST',
    indexViewCost: index,
    valueViewCost: value
  })
}

const createPrices = (pricesTmp, idProduct) => {

  return () => {
    return axios.post(
      SERVER_PATH + PRODUCTS_PATH + '/' + idProduct + PRICES_PATH,
      {
        pricesTmp
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

const addPrice = (price) => {
  return ({
    type: 'ADD_PRICE',
    priceToAdd: price
  })
}

const createInventory = (inventory) => {
  return () => {
    return axios.post(
      SERVER_PATH + PRODUCTS_PATH + POST_INVENTORY_PATH, inventory
    )
      .then(response => {
        console.log(response.data)
      })
  }
}

const loadProducts = () => {
  return dispatch => {
    return axios.get(SERVER_PATH + GET_PRODUCTS_PATH)
      .then(response => {
        dispatch({
          type: 'LOAD_PRODUCTS',
          products: response.data.result,
        })
      })
  }
}

const createProduct = (product) => {
  return () => {
    return axios.post(SERVER_PATH + POST_PRODUCTS_PATH, product)
      .then(response => {
        console.log(response.data)
      })
  }
}

const updateProduct = product => {
  return () => {
    return axios.put(
      SERVER_PATH + PRODUCTS_PATH + '/' + product.id, product
    )
      .then(response => {
        console.log(response.date)
      })
  }
}

const showCreateProduct = (state) => {
  return ({
    type: 'SHOW_CREATE_PRODUCT',
    isVisibleCreateProducts: state
  })
}

const showCreatePrice = (idProduct) => {
  return ({
    type: 'SHOW_CREATE_PRICES',
    idProduct
  })
}

const showCosts= (idProduct) => {
  return ({
    type: 'SHOW_COSTS',
    idProduct
  })
}

const hideCreatePrice = () => {
  return ({
    type: 'HIDE_CREATE_PRICE'
  })
}

const hideCosts = () => {
  return ({
    type: 'HIDE_COSTS'
  })
}

const loadMinimunUnits = () => {
  return dispatch => {
    return axios.get(SERVER_PATH + GET_MIN_UNITS_PATH)
      .then(response => {
        dispatch({
          type: 'LOAD_MINIMUN_UNITS',
          minimumUnits: response.data.result
        })
      })
  }
}

const loadCategories = () => {
  return dispatch => {
    return axios.get(SERVER_PATH + GET_CATEGORIES_PATH)
      .then(response => {
        dispatch({
          type: 'LOAD_CATEGORIES',
          categories: response.data.result
        })
      })
  }
}

const filterProducts = (string) => {
  return ({
    type: 'FILTER_PRODUCTS',
    string: string
  })
}

const modifyProduct = (idProduct) => {
  return ({
    type: 'SHOW_MODIFY_PRODUCT',
    idProduct
  })
}

const updateSelectedPrices = (idProduct) => {
  return dispatch => {
    return axios.get(SERVER_PATH + GET_PRODUCTS_PATH)
      .then(response => {
        dispatch({
          type: 'UPDATE_SELECTED_PRICES',
          products: response.data.result,
          idProduct
        })
      })
  }
}

const updateUnitCost = (unitCost, idProduct) => {

  return () => {
    return axios.put(
      SERVER_PATH + PRODUCTS_PATH + '/' + idProduct + UNIT_COST_PATH,
      {
        unitCost: unitCost
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

const deletePrice = (indexPrice) => {
  return ({
    type: 'DELETE_PRICE',
    indexPrice
  })
}

const deleteProduct = (idProduct) => {
  return () => {
    return axios.delete(SERVER_PATH + PRODUCTS_PATH + '/' + idProduct)
      .then(response => {
        if (response.data.result !== 'ERROR') {
          swal(
            'Excelente!',
            response.data.message,
            'success'
          )
        } else {
          swal(
            'Oops...',
            response.data.message,
            'error'
          )
        }
      })
  }
}

export {
  changeViewCost,
  createInventory,
  createPrices,
  addPrice,
  createProduct,
  deletePrice,
  deleteProduct,
  filterProducts,
  hideCreatePrice,
  hideCosts,
  loadCategories,
  loadMinimunUnits,
  loadPrices,
  loadProducts,
  modifyProduct,
  showCreateProduct,
  showCreatePrice,
  showCosts,
  updateProduct,
  updateSelectedPrices,
  updateUnitCost
}