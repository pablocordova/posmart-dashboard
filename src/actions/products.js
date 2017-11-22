import axios from 'axios'

const GET_PRODUCTS_PATH = '/products'
const POST_PRODUCTS_PATH = '/products'
const GET_MIN_UNITS_PATH = '/products/all/min_units'
const GET_CATEGORIES_PATH = '/products/all/categories'
const PRODUCTS_PATH = '/products'
const GET_PRICES_PATH_POST = '/prices'
const POST_PRICE_PATH = '/price'
const POST_INVENTORY_PATH = '/entry'

axios.defaults.headers.common['Authorization'] = 'JWT ' + localStorage.getItem('token')

const loadPrices = (product) => {
  return dispatch => {
    return axios.get(
      process.env.REACT_APP_SERVER_PATH + PRODUCTS_PATH + '/' + product.id + GET_PRICES_PATH_POST
    )
      .then(response => {
        dispatch({
          type: 'LOAD_PRICES',
          prices: response.data.result
        })
      })
  }
}

const createPrice = (price) => {
  return () => {
    return axios.post(process.env.REACT_APP_SERVER_PATH + PRODUCTS_PATH + POST_PRICE_PATH, price)
      .then(response => {
        console.log(response.data)
      })
  }
}

const createInventory = (inventory) => {
  return () => {
    return axios.post(
      process.env.REACT_APP_SERVER_PATH + PRODUCTS_PATH + POST_INVENTORY_PATH, inventory
    )
      .then(response => {
        console.log(response.data)
      })
  }
}

const loadProducts = () => {
  return dispatch => {
    return axios.get(process.env.REACT_APP_SERVER_PATH + GET_PRODUCTS_PATH)
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
    return axios.post(process.env.REACT_APP_SERVER_PATH + POST_PRODUCTS_PATH, product)
      .then(response => {
        console.log(response.data)
      })
  }
}

const updateProduct = product => {
  return () => {
    return axios.put(
      process.env.REACT_APP_SERVER_PATH + PRODUCTS_PATH + '/' + product.id, product
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

const showInventory= (idProduct) => {
  return ({
    type: 'SHOW_INVENTORY',
    idProduct
  })
}

const hideCreatePrice = () => {
  return ({
    type: 'HIDE_CREATE_PRICE'
  })
}

const hideInventory = () => {
  return ({
    type: 'HIDE_INVENTORY'
  })
}

const loadMinimunUnits = () => {
  return dispatch => {
    return axios.get(process.env.REACT_APP_SERVER_PATH + GET_MIN_UNITS_PATH)
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
    return axios.get(process.env.REACT_APP_SERVER_PATH + GET_CATEGORIES_PATH)
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
    return axios.get(process.env.REACT_APP_SERVER_PATH + GET_PRODUCTS_PATH)
      .then(response => {
        dispatch({
          type: 'UPDATE_SELECTED_PRICES',
          products: response.data.result,
          idProduct
        })
      })
  }
}

const deletePrice = (idProduct, indexPrice) => {
  return () => {
    return axios.delete(
      process.env.REACT_APP_SERVER_PATH +
      PRODUCTS_PATH + '/' +
      idProduct +
      GET_PRICES_PATH_POST + '/' +
      indexPrice
    )
      .then(response => {
        console.log(response)
      })
  }
}

export {
  createInventory,
  createPrice,
  createProduct,
  deletePrice,
  filterProducts,
  hideCreatePrice,
  hideInventory,
  loadCategories,
  loadMinimunUnits,
  loadPrices,
  loadProducts,
  modifyProduct,
  showCreateProduct,
  showCreatePrice,
  showInventory,
  updateProduct,
  updateSelectedPrices
}