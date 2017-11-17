const products = (
  state = {
    products: [],
    isVisibleCreateProducts: false,
    productsFiltered: [],
    product: {
      name: '',
      minimumUnit: '',
      category: '',
      picture: 'defaulPictureByNow'
    },
    minimumUnits: [],
    categories: []
  },
  action
) => {

  switch (action.type) {
    case 'LOAD_PRODUCTS':
      return {
        ...state,
        products: action.products,
        productsFiltered: action.products
      }
    case 'SHOW_CREATE_PRODUCT':
      return {
        ...state,
        isVisibleCreateProducts: action.isVisibleCreateProducts
      }
    case 'FILTER_PRODUCTS':
      return {
        ...state,
        productsFiltered: state.products.filter(e =>{
          return e.name.toLowerCase().indexOf(action.string.toLowerCase()) !== -1
        })
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
    default:
      return state
  }

}

export default products