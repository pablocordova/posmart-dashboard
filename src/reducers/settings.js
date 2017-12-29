const clients = (
  state = {
    printerId: '',
    ticketSetting: {
      title: '',
      head1Line: '',
      head2Line: '',
      Foot1Line: '',
      Foot2Line: ''
    }
  },
  action
) => {

  switch (action.type) {
    case 'LOAD_DATA_PRINTER': {
      return {
        ...state,
        googleLog: action.dataPrinter.googleLog,
        printerId: action.dataPrinter.printerId,
        ticketSetting: action.dataPrinter.ticketSetting
      }
    }
    case 'UPDATE_PRINTER_ID': {
      return {
        ...state,
        printerId: action.printerId
      }
    }
    case 'UPDATE_TICKET_SETTING': {
      return {
        ...state,
        ticketSetting: {
          ...state.ticketSetting,
          title: action.ticketTitle,
          head1Line: action.ticketHead1,
          head2Line: action.ticketHead2,
          Foot1Line: action.ticketFoot1,
          Foot2Line: action.ticketFoot2
        }
      }
    }
    default:
      return state
  }

}

export default clients