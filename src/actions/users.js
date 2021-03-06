import axios from 'axios'
import swal from 'sweetalert2'

const USERS_PATH = '/users'
let SERVER_PATH = ''

axios.defaults.headers.common['Authorization'] =
  'JWT ' + localStorage.getItem(process.env.REACT_APP_TOKEN_NAME)

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

const createUser = (user, permissionDiscount) => {
  user['permissionDiscount'] = permissionDiscount
  return () => {
    return axios.post(SERVER_PATH + USERS_PATH, user)
      .then(response => {
        console.log(response.data)
      })
  }
}

const deleteUser = (idUser) => {
  return () => {
    return axios.delete(SERVER_PATH + USERS_PATH + '/' + idUser)
      .then(response => {
        if (response.status === 200) {
          swal(
            'Excelente!',
            response.data.message,
            'success'
          )
        } else {
          swal(
            'Oops...',
            response.data.message,
            'error'
          )
        }
      })
  }
}

const filterUsers = (string) => {
  return ({
    type: 'FILTER_USERS',
    string: string
  })
}

const hideCreateModifyUsers = () => {
  return ({
    type: 'HIDE_CREATE_MODIFY_USERS'
  })
}

const loadUsers = () => {
  return dispatch => {
    return axios.get(SERVER_PATH + USERS_PATH)
      .then(response => {
        dispatch({
          type: 'LOAD_USERS',
          users: response.data.result,
        })
      })
  }
}

const showCreateUser = () => {
  return ({
    type: 'SHOW_CREATE_USER'
  })
}

const showModifyUser = (idUser) => {
  return ({
    type: 'SHOW_MODIFY_USER',
    idUser
  })
}

const updateUser = (user, permissionDiscount) => {
  user['permissionDiscount'] = permissionDiscount
  return () => {
    return axios.put(
      SERVER_PATH + USERS_PATH + '/' + user.id, user
    )
      .then(response => {
        console.log(response.date)
      })
  }
}

const updatePermissionDiscount = (typePermission) => {
  return ({
    type: 'UPDATE_PERMISSION_DISCOUNT',
    typePermission
  })
}

export {
  createUser,
  deleteUser,
  filterUsers,
  hideCreateModifyUsers,
  loadUsers,
  showCreateUser,
  showModifyUser,
  updateUser,
  updatePermissionDiscount
}