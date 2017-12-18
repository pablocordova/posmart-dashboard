import axios from 'axios'

const REGISTER_PATH = '/register'

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

const register = (business, email, pass, passRepeat) => {

  return () => {
    return axios.post(SERVER_PATH + REGISTER_PATH, {
      business: business,
      email: email,
      password: pass,
      passwordRepeat: passRepeat
    })
      .then(response => {
        console.log(response.data)
      })
      .catch(error => {
        console.log(error)
      })
  }

}

export { register }