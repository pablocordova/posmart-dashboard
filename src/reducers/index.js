import { combineReducers } from 'redux'
import products from './products'
import receipts from './receipts'
import users from './users'
import buys from './buys'
import reports from './reports'

const reducer = combineReducers({
  buys,
  products,
  receipts,
  users,
  reports
})

export default reducer