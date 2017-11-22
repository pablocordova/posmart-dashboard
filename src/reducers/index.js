import { combineReducers } from 'redux'
import login from './login'
import products from './products'
import users from './users'

const reducer = combineReducers({
  login,
  products,
  users
})

export default reducer