const clients = (
  state = {
    earningsByClient: [],
    totalEarnByClient: 0
  },
  action
) => {

  switch (action.type) {
    case 'LOAD_EARNINGS_BY_CLIENT': {
      let totalEarnByClient = 0
      for (let earn of action.earningsByClient) {
        totalEarnByClient += earn.total
      }
      return {
        ...state,
        earningsByClient: action.earningsByClient,
        totalEarnByClient: totalEarnByClient
      }
    }
    default:
      return state
  }

}

export default clients