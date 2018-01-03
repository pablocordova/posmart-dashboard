import { combineReducers } from 'redux'

import buys from './buys'
import login from './login'
import products from './products'
import receipts from './receipts'
import reports from './reports'
import settings from './settings'
import users from './users'

const reducer = combineReducers({
  buys,
  login,
  products,
  receipts,
  reports,
  settings,
  users
})

export default reducer