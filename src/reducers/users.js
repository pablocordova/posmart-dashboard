const users = (
  state = {
    buttonUser: 'DEFAULT_NAME',
    isVisibleCreateModifyUsers: false,
    titleUser: '',
    user: {
      email: '',
      id: '',
      password: '',
      repeatPassword: '',
      permissions: {
        customers: true,
        products: true,
        sales: true,
        settings: true,
        users: true
      },
      username: ''
    },
    users: [],
    usersFiltered: [],
    permissionDiscount: 'Permit'
  },
  action
) => {

  switch (action.type) {
    case 'FILTER_USERS':
      return {
        ...state,
        usersFiltered: state.users.filter(e =>{
          return e.username.toLowerCase().indexOf(action.string.toLowerCase()) !== -1
        })
      }
    case 'HIDE_CREATE_MODIFY_USERS':
      return {
        ...state,
        isVisibleCreateModifyUsers: false
      }
    case 'LOAD_USERS':
      return {
        ...state,
        users: action.users,
        usersFiltered: action.users
      }
    case 'SHOW_CREATE_USER':
      return {
        ...state,
        buttonUser: 'CREAR',
        isVisibleCreateModifyUsers: true,

        user: {
          ...state.user,
          email: '',
          id: '',
          username: '',
          permissions: {
            customers: true,
            products: true,
            sales: true,
            settings: true,
            users: true
          }
        },
        titleUser: 'CREAR',
        permissionDiscount: 'Permit'
      }
    case 'SHOW_MODIFY_USER': {
      let selected = state.users.filter(user =>
        user._id === action.idUser
      ).pop()
      return {
        ...state,
        buttonUser: 'MODIFICAR',

        isVisibleCreateModifyUsers: true,
        titleUser: 'MODIFICAR',
        user: {
          ...state.user,
          email: selected.email,
          id: selected._id,
          username: selected.username,
          permissions: {
            customers: selected.permissions.customers,
            products: selected.permissions.products,
            sales: selected.permissions.sales,
            settings: selected.permissions.settings,
            users: selected.permissions.users
          }
        },
        permissionDiscount: selected.permissionDiscount
      }
    }
    case 'UPDATE_PERMISSION_DISCOUNT':
      return {
        ...state,
        permissionDiscount: action.typePermission
      }
    default:
      return state
  }

}

export default users