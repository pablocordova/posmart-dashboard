import { combineReducers } from 'redux'
import login from './login'
import products from './products'

const reducer = combineReducers({
  login,
  products
})

export default reducer