import axios from 'axios'

const GET_PRODUCTS_PATH = '/products'
const POST_PRODUCTS_PATH = '/products'
const GET_MIN_UNITS_PATH = '/products/all/min_units'
const GET_CATEGORIES_PATH = '/products/all/categories'
const PUT_PRODUCTS_PATH = '/products'

axios.defaults.headers.common['Authorization'] = 'JWT ' + localStorage.getItem('token')

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
      process.env.REACT_APP_SERVER_PATH + PUT_PRODUCTS_PATH + '/' + product.id, product
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

export {
  loadProducts,
  createProduct,
  showCreateProduct,
  loadMinimunUnits,
  loadCategories,
  filterProducts,
  modifyProduct,
  updateProduct
}