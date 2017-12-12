import axios from 'axios'

const LOGIN_PATH = '/login'

let SERVER_PATH = ''

switch (process.env.REACT_APP_ENV) {
  case 'production':
    SERVER_PATH = process.env.REACT_APP_SERVER_PATH_PRODUCTION;
    break;
  case 'development':
    SERVER_PATH = process.env.REACT_APP_SERVER_PATH_DEVELOPMENT;
    break;
  default:
    break;
}

const login = (email, pass) => {

  return () => {
    return axios.post(SERVER_PATH + LOGIN_PATH, {
      email: email,
      password: pass,
      type: 'DASHBOARD'
    })
      .then(response => {
        if (typeof response.data.token !== 'undefined') {
          localStorage.setItem('token', response.data.token)
          localStorage.setItem('username', response.data.username)
          window.location = '/products'
        } else {
          console.log('Error login data')
        }
      })
      .catch(error => {
        console.log(error)
      })
  }

}

export { login }