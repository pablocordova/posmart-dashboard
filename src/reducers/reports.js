const clients = (
  state = {
    earningsBy: [],
    totalEarnBy: 0,
    typeBy: 'client',
    dataGraph: {}
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
      let labels = []
      let data = []
      switch(action.typeBy) {
        case 'client':
          for (const earning of action.earningsBy) {
            labels.push(earning.client)
            data.push(earning.total)
          }

          break
        default:
          for (const [index, value] of action.earningsBy.entries()) {
            labels.push(index + 1)
            data.push(value.total)
          }

          break
      }

      let dataGraph = {
        labels: labels,
        datasets: [
          {
            label: 'Ganancia',
            backgroundColor: 'rgba(255,99,132,0.2)',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
            data: data
          }
        ]
      };

      return {
        ...state,
        earningsBy: action.earningsBy,
        totalEarnBy: totalEarnBy,
        typeBy: action.typeBy === 'sale' ? 'sale' : 'client',
        dataGraph: dataGraph
      }
    }
    default:
      return state
  }

}

export default clients