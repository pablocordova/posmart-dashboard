const receipts = ( state = {
  sales: [],
  saleSelected: {
    products: [],
    client: {
      name: ''
    }
  },
  searchData: {
    id: '',
    day: '',
    client: '',
    seller: '',
    total: '',
    state: ''
  },
  isVisibleCompleteReceipt: false
}, action) => {

  switch (action.type) {
    case 'HIDE_COMPLETE_RECEIPT':
      return {
        ...state,
        isVisibleCompleteReceipt: false
      }
    case 'LOAD_RECEIPTS':
      return {
        ...state,
        sales: action.receipts
      }
    case 'SHOW_COMPLETE_RECEIPT':
      return {
        ...state,
        isVisibleCompleteReceipt: true,
        saleSelected: action.saleSelected
      }
    default:
      return state
  }

}

export default receipts