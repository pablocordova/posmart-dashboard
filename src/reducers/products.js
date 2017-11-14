const products = (
  state = {
    products: [],
    modal: false,
    productsFiltered: [],
    selectedProduct: ''
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
    case 'SHOW_DETAIL_PRODUCT':
      return {
        ...state,
        modal: action.modal,
        selectedProduct: action.selectedProduct
      }
    case 'FILTER_PRODUCTS':
      return {
        ...state,
        productsFiltered: state.products.filter(e =>{
          return e.name.toLowerCase().indexOf(action.string.toLowerCase()) !== -1
        })
      }
    default:
      return state
  }

}

export default products