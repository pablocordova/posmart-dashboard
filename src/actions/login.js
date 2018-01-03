import axios from 'axios'

const LOGIN_PATH = '/login/business'

let SERVER_PATH = ''
let BASE_URL = ''

switch (process.env.REACT_APP_ENV) {
  case 'production':
    SERVER_PATH = process.env.REACT_APP_SERVER_PATH_PRODUCTION;
    BASE_URL = process.env.REACT_APP_BASE_URL_PRODUCTION;
    break;
  case 'development':
    SERVER_PATH = process.env.REACT_APP_SERVER_PATH_DEVELOPMENT;
    BASE_URL = process.env.REACT_APP_BASE_URL_DEVELOPMENT;
    break;
  default:
    break;
}

const login = (email, pass) => {

  return dispatch => {
    return axios.post(SERVER_PATH + LOGIN_PATH, {
      email: email,
      password: pass
    })
      .then(response => {
        if (typeof response.data.token !== 'undefined') {
          localStorage.setItem('token', response.data.token)
          localStorage.setItem('username', response.data.username)
          localStorage.setItem('businessNameDashboard', response.data.businessName.toUpperCase())
          window.location = BASE_URL.concat('/products')
        } else {
          dispatch({
            type: 'SHOW_MESSAGE_ERROR',
            errorMessage: response.data.message,
          })
        }
      })
      .catch(error => {
        console.log(error)
      })
  }

}

const showError = (type) => {
  return ({
    type: 'SHOW_ERROR',
    typeError: type
  })
}

const removeError = (type) => {
  return ({
    type: 'REMOVE_ERROR',
    typeErrorToRemove: type
  })
}

export { login, showError, removeError }