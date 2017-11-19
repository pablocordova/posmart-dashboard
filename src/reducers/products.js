const products = (
  state = {
    products: [],
    isVisibleCreateProducts: false,
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
    buttonProduct: 'CREAR'
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
    case 'SHOW_MODIFY_PRODUCT':
      return {
        ...state,
        isVisibleCreateProducts: true,
        titleProduct: 'MODIFICAR PRODUCTO',
        buttonProduct: 'MODIFICAR',
        product: {
          ...state.product,
          id: action.idProduct,
          minimumUnit: state.products.filter( product =>
            product._id === action.idProduct
          ).pop().minimumUnit,
          category: state.products.filter( product =>
            product._id === action.idProduct
          ).pop().category,
          name: state.products.filter( product =>
            product._id === action.idProduct
          ).pop().name
        }
      }
    default:
      return state
  }

}

export default products