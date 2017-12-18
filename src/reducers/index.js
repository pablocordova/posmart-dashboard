import { combineReducers } from 'redux'
import products from './products'
import receipts from './receipts'
import users from './users'

const reducer = combineReducers({
  products,
  receipts,
  users
})

export default reducer