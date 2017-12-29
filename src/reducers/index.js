import { combineReducers } from 'redux'

import buys from './buys'
import products from './products'
import receipts from './receipts'
import reports from './reports'
import settings from './settings'
import users from './users'

const reducer = combineReducers({
  buys,
  products,
  receipts,
  reports,
  settings,
  users
})

export default reducer