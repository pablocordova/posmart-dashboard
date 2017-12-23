import moment from 'moment'

const receipts = ( state = {
  allProducts: [],
  buys: [],
  buySelected: {
    id: '',
    date: '',
    company: ''
  },
  isVisibleFormBuy: false,
  productsBuy: [],
  idViewBuy:  '',
  dateViewBuy: '',
  companyViewBuy: '',
  totalViewBuy: 0,
  formChoseProduct: {
    itemsPricesChosen: '',
    pricesProductChosen: [],
    idProductChosen: '',
    quantity: 0,
    measure: '',
    description: '',
    total: 0
  },
  searchData: {
    id: '',
    day: '',
    company: ''
  },
  onlyShowBuy: false

}, action) => {

  switch (action.type) {
    case 'ADD_PRODUCT_BUY':
      let product = {
        quantity: action.allForm.quantity,
        measure: action.allForm.measure,
        description: action.allForm.description,
        total: action.allForm.total,
        itemsPricesChosen: action.allForm.itemsPricesChosen,
        idProductChosen: action.allForm.idProductChosen
      }

      return {
        ...state,
        productsBuy: state.productsBuy.concat(product),
        totalViewBuy: state.totalViewBuy + parseFloat(action.allForm.total)
      }
    case 'CHANGE_COMPANY_VIEW_BUY':
      return {
        ...state,
        companyViewBuy: action.companyViewBuy
      }
    case 'CHANGE_DATE_VIEW_BUY':
      return {
        ...state,
        dateViewBuy: action.dateViewBuy
      }
    case 'CHANGE_ID_VIEW_BUY':
      return {
        ...state,
        idViewBuy: action.idViewBuy
      }
    case 'DELETE_PRODUCT_ITEM':
      return {
        ...state,
        totalViewBuy: state.totalViewBuy - state.productsBuy[action.indexProduct].total,
        productsBuy: state.productsBuy.filter((product, index) =>
          index !== parseInt(action.indexProduct, 10)
        )
      }
    case 'HIDE_COMPLETE_BUY':
      return {
        ...state,
        isVisibleFormBuy: false
      }
    case 'LOAD_BUYS':
      return {
        ...state,
        buys: action.buys
      }
    case 'SHOW_COMPLETE_BUY': {
      let date = ''
      if (state.buys[action.indexBuy].date) {
        date = state.buys[action.indexBuy].date.split('T')[0]
      }
      let buySelected = {
        id: state.buys[action.indexBuy].id,
        date: date,
        company: state.buys[action.indexBuy].company
      }
      return {
        ...state,
        isVisibleFormBuy: true,
        onlyShowBuy: true,
        productsBuy: state.buys[action.indexBuy].products,
        buySelected: buySelected,
        totalViewBuy: state.buys[action.indexBuy].total
      }
    }
    case 'SHOW_CREATE_BUY': {
    return {
        ...state,
        isVisibleFormBuy: true,
        allProducts: action.allProducts,
        productsBuy: [],
        onlyShowBuy: false,
        totalViewBuy: 0,
        idViewBuy:  '',
        dateViewBuy: moment().format('YYYY-MM-DD'),
        companyViewBuy: '',
        formChoseProduct: {
          ...state.formChoseProduct,
          itemsPricesChosen: action.allProducts[0].prices[0].items,
          pricesProductChosen: action.allProducts[0].prices,
          idProductChosen: action.allProducts[0]._id,
          quantity: 0,
          measure: action.allProducts[0].prices[0].name,
          description: action.allProducts[0].name,
          total: 0
        }
      }
    }
    case 'UPDATE_PRICES_FORM_VIEW':
      return {
        ...state,
        formChoseProduct: {
          ...state.formChoseProduct,
          pricesProductChosen: action.pricesFormView
        }
      }
    default:
      return state
  }

}

export default receipts