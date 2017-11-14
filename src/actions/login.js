import axios from 'axios'

const LOGIN_PATH = '/login'

const login = (email, pass) => {

  return () => {
    return axios.post(process.env.REACT_APP_SERVER_PATH + LOGIN_PATH, {
      email: email,
      password: pass
    })
      .then(response => {
        if (typeof response.data.token !== 'undefined') {
          localStorage.setItem('token', response.data.token)
          localStorage.setItem('username', response.data.username)
          window.location = '/sale'
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