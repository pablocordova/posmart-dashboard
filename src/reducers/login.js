const login = ( state = { username: '', token: '' }, action ) => {

  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        username: action.username,
        token: action.token
      }
    default:
      return state
  }

}

export default login