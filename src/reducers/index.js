import { combineReducers } from 'redux'
import login from './login'
import products from './products'
import receipts from './receipts'
import users from './users'

const reducer = combineReducers({
  login,
  products,
  receipts,
  users
})

export default reducer