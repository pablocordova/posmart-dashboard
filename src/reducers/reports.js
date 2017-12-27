const clients = (
  state = {
    earningsBy: [],
    totalEarnBy: 0,
    typeBy: 'client',
    nameTypeBy: '',
    dataGraph: []
  },
  action
) => {

  switch (action.type) {
    case 'LOAD_EARNINGS_BY': {
      let totalEarnBy = 0

      for (let earn of action.earningsBy) {
        totalEarnBy += earn.total
      }
      // Information for graphic
      let dataGraph = []
      let nameTypeBy = ''
      switch(action.typeBy) {
        case 'client':
          nameTypeBy = 'Clientes'
          for (const earning of action.earningsBy) {
            dataGraph.push({
              Clientes: earning.client,
              Ganancia: earning.total
            })
          }

          break
        default:
          nameTypeBy = 'Ventas'
          for (const [index, value] of action.earningsBy.entries()) {
            let obj = {
              Ventas: index + 1,
              Ganancia: value.total
            }
            dataGraph.push(obj)
          }

          break
      }

      

      return {
        ...state,
        earningsBy: action.earningsBy,
        totalEarnBy: totalEarnBy,
        typeBy: action.typeBy === 'sale' ? 'sale' : 'client',
        nameTypeBy: nameTypeBy,
        dataGraph: dataGraph
      }
    }
    default:
      return state
  }

}

export default clients