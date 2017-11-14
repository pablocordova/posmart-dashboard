import React from 'react'
import { createStore, applyMiddleware } from 'redux'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

import App from './containers/App'
import reducer from './reducers/index'

const store = createStore(reducer, applyMiddleware(thunk))

render(
  <Provider store = { store }>
    <App />
  </Provider>,
  document.getElementById('root')
)
