const sale = ( state = {
  validEmail: null,
  validPass: null
}, action) => {

  switch (action.type) {
    case 'SHOW_ERROR': {

      let validEmail = null
      let validPass = null

      switch (action.typeError) {
        case 'email': {
          validEmail = 'error'
          validPass = state.validPass
          break
        }
        case 'pass': {
          validPass = 'error'
          validEmail = state.validEmail
          break
        }
        default:
          break
      }
      return {
        ...state,
        validEmail: validEmail,
        validPass: validPass
      }
    }
    case 'SHOW_MESSAGE_ERROR': {

      let validEmail = null
      let validPass = null

      switch (action.errorMessage) {
        case 'User doesnt exits': {
          validEmail = 'error'
          break
        }
        case 'Incorrect password': {
          validPass = 'error'
          break
        }
        default:
          break
      }
      return {
        ...state,
        validEmail: validEmail,
        validPass: validPass
      }
    }
    case 'REMOVE_ERROR': {

      let validEmail = null
      let validPass = null

      switch (action.typeErrorToRemove) {
        case 'email': {
          validPass = state.validPass
          break
        }
        case 'pass': {
          validEmail = state.validEmail
          break
        }
        default:
          break
      }
      return {
        ...state,
        validEmail: validEmail,
        validPass: validPass
      }
    }
    default:
      return state
  }

}

export default sale