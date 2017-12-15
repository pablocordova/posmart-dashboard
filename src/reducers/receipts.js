const receipts = ( state = {
  sales: [],
  saleSelected: {
    products: [],
    state: 'Pendiente',
    client: {
      name: ''
    }
  },
  saleSelectedCredits: [],
  searchData: {
    id: '',
    day: '',
    client: '',
    seller: '',
    total: '',
    state: ''
  },
  isVisibleCompleteReceipt: false,
  isVisibleFormDebt: false,
  stateSale: '',
  sumCredits: 0
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
    case 'LOAD_CREDITS': {
      let credits = []
      let sumCredits = 0
      if (action.credits) {
        credits = action.credits
      }
      for (let credit of credits) {
        sumCredits += parseFloat(credit.amount)
      }
      return {
        ...state,
        saleSelectedCredits: credits,
        sumCredits: sumCredits
      }
    }
    case 'SHOW_COMPLETE_RECEIPT': {
      let showFormDebt = false
      if (action.saleSelected.state === 'Credito') {
        showFormDebt = true
      }
      return {
        ...state,
        isVisibleCompleteReceipt: true,
        saleSelected: action.saleSelected,
        stateSale: action.saleSelected.state,
        isVisibleFormDebt: showFormDebt
      }
    }
    case 'VISIBLE_FORM_DEBT': {
    return {
        ...state,
        isVisibleFormDebt: action.isVisibleFormDebt,
        stateSale: action.optionState
      }
    }
    default:
      return state
  }

}

export default receipts