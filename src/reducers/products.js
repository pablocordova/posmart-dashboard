import _ from 'lodash'

const products = (
  state = {
    products: [],
    isVisibleCreateProducts: false,
    isVisibleCreatePrice: false,
    isVisibleViewCosts: false,
    productsFiltered: [],
    product: {
      id: '',
      name: '',
      minimumUnit: '',
      category: '',
      picture: 'defaulPictureByNow'
    },
    minimumUnits: [],
    categories: [],
    titleProduct: 'CREAR PRODUCTO',
    buttonProduct: 'CREAR',
    prices: [],
    price: {
      quantity: '',
      name: '',
      items: 0,
      price: 0,
      product: ''
    },
    productSelected: {
      prices: [],
      entries: []
    },
    inventory: {
      quantity: 0,
      unitCost: 0,
      product: ''
    },
    pricesViewCost: [],
    stateLoader: true
  },
  action
) => {

  switch (action.type) {
    case 'CHANGE_VIEW_COST':
      let cost = ''
      if (action.valueViewCost) {
        cost = parseFloat(action.valueViewCost)
      }
      return {
        ...state,
        pricesViewCost: state.pricesViewCost.map((price, index) => {
          return index === parseInt(action.indexViewCost, 10) ?
          cost : cost !== '' ?
          _.round((parseFloat(state.productSelected.prices[index].items) * cost) /
          parseFloat(state.productSelected.prices[action.indexViewCost].items), 10) : cost
        })
      }
    case 'LOAD_PRICES':
      return {
        ...state,
        prices: action.prices
      }
    case 'LOAD_PRODUCTS':
      return {
        ...state,
        products: action.products,
        productsFiltered: action.products,
        stateLoader: false
      }
    case 'SHOW_CREATE_PRODUCT':
      return {
        ...state,
        titleProduct: 'CREAR PRODUCTO',
        buttonProduct: 'CREAR',
        product: {
          ...state.product,
          id: '',
          name: '',
          minimumUnit: state.minimumUnits[0],
          category: state.categories[0],
          picture: 'defaulPictureByNow'
        },
        isVisibleCreateProducts: action.isVisibleCreateProducts
      }
    case 'FILTER_PRODUCTS':
      let productsCopy = state.products
      let wordsToSearch = action.string.toLowerCase().split(' ')
      for (let word of wordsToSearch) {
        productsCopy = productsCopy.filter(e =>{
          return e.name.toLowerCase().indexOf(word) !== -1
        })
      }
      return {
        ...state,
        productsFiltered: productsCopy
      }
    case 'LOAD_MINIMUN_UNITS':
      return {
        ...state,
        minimumUnits: action.minimumUnits,
        product: {
          ...state.product,
          minimumUnit: action.minimumUnits[0]
        }
      }
    case 'LOAD_CATEGORIES':
      return {
        ...state,
        categories: action.categories,
        product: {
          ...state.product,
          category: action.categories[0]
        }
      }
    case 'SHOW_MODIFY_PRODUCT': {
      let selected = state.products.filter( product =>
        product._id === action.idProduct
      ).pop()
      return {
        ...state,
        isVisibleCreateProducts: true,
        titleProduct: 'MODIFICAR PRODUCTO',
        buttonProduct: 'MODIFICAR',
        product: {
          ...state.product,
          id: selected._id,
          name: selected.name,
          minimumUnit: selected.minimumUnit,
          category: selected.category,
        }
      }
    }

    case 'SHOW_CREATE_PRICES':
      return {
        ...state,
        isVisibleCreatePrice: true,
        price: {
          ...state.price,
          product: action.idProduct,
          quantity: '1',
          name: 'unidad',
          items: 0,
          price: 0,

        },
        productSelected: state.products.filter( product =>
          product._id === action.idProduct
        ).pop()
      }
    case 'SHOW_COSTS':
      let product = state.products.filter( product =>
        product._id === action.idProduct
      ).pop()
      let prices = product.prices.map( price => {
        return _.round(price.items * product.unitCost, 10)
      })
      return {
        ...state,
        isVisibleViewCosts: true,
        pricesViewCost: prices,
        productSelected: product
      }
    case 'HIDE_CREATE_PRICE':
      return {
        ...state,
        isVisibleCreatePrice: false
      }
    case 'HIDE_COSTS':
      return {
        ...state,
        isVisibleViewCosts: false
      }
    case 'UPDATE_SELECTED_PRICES':
      return {
        ...state,
        products: action.products,
        productSelected: action.products.filter( product =>
          product._id === action.idProduct
        ).pop()
      }
    default:
      return state
  }

}

export default products