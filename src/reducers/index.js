import { combineReducers } from 'redux'
import products from './products'
import receipts from './receipts'
import users from './users'
import buys from './buys'

const reducer = combineReducers({
  buys,
  products,
  receipts,
  users
})

export default reducer