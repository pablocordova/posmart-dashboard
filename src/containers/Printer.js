import React, { Component } from 'react'
import { connect } from 'react-redux'

import RaisedButton from 'material-ui/RaisedButton'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { green500, black } from 'material-ui/styles/colors';

import {
  ControlLabel,
  FormGroup,
  FormControl
} from 'react-bootstrap'

import {
  getDataPrinter,
  getTokenGoogle,
  getUrlGoogleToken,
  saveSettingPrinter,
  updatePrinterId,
  updateTicketSetting
} from '../actions/settings'

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: black,
    accent1Color: green500
  }
});

const idPrinterStyle = {
  width: '25%'
}

const labelStyle = {
  width: '7%'
}

const formLabelStyle = {
  width: '50%',
  display: 'inline-block',
  marginLeft: '20px'
}

class Printer extends Component {

  componentDidMount() {
    // Get url to use in login
    this.props.getUrlGoogleToken()
    // Load data settings for printer
    this.props.getDataPrinter()
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={ muiTheme }>
        <div>
          <h4>Permisos</h4>
          <p>La impresora debe estar conectada a Google cloud print(GCP),
          por la cual necesita dar permiso a su cuenta de google el uso de GCP.</p>
          <RaisedButton
            label = 'Permiso'
            secondary = { true }
            onClick = { () =>
              this.props.getTokenGoogle()
            }
          ></RaisedButton>
          <h4>Identificador</h4>
          <p>Cuando añade una impresora a su cuenta de GCP, obtendra un <b>ID de impresora</b>,
           agrege este id para que el sistema sepa a que impresora se enviará los tickets.</p>
          <FormControl
            type = 'text'
            style = { idPrinterStyle }
            value = { this.props.printerId }
            placeholder = 'ID de impresora'
            disabled = { !this.props.googleLog }
            onChange = { e => {
              this.props.updatePrinterId(e.target.value)
            }}
          />
          <h4>Ticket</h4>
          <p>Configuraciones del ticket a imprimir</p>
          <FormGroup>
            <ControlLabel style = { labelStyle }>Título:</ControlLabel>
            <FormControl
              type = 'text'
              style = { formLabelStyle }
              value = { this.props.ticketSetting.title }
              placeholder = 'Nombre de la empresa'
              disabled = { !this.props.googleLog }
              onChange = { e => {
                this.props.updateTicketSetting(
                  e.target.value,
                  this.props.ticketSetting.head1Line,
                  this.props.ticketSetting.head2Line,
                  this.props.ticketSetting.Foot1Line,
                  this.props.ticketSetting.Foot2Line
                )
              }}
            />
          </FormGroup>
          <ControlLabel>Encabezado:</ControlLabel>
          <FormGroup>
            <ControlLabel style = { labelStyle }>1ra Linea</ControlLabel>
            <FormControl
              type = 'text'
              style = { formLabelStyle }
              value = { this.props.ticketSetting.head1Line }
              placeholder = 'Dirección'
              disabled = { !this.props.googleLog }
              onChange = { e => {
                this.props.updateTicketSetting(
                  this.props.ticketSetting.title,
                  e.target.value,
                  this.props.ticketSetting.head2Line,
                  this.props.ticketSetting.Foot1Line,
                  this.props.ticketSetting.Foot2Line
                )
              }}
            />
          </FormGroup>
          <FormGroup>
            <ControlLabel style = { labelStyle }>2da Linea</ControlLabel>
            <FormControl
              type = 'text'
              style = { formLabelStyle }
              value = { this.props.ticketSetting.head2Line }
              placeholder = 'Telefonos'
              disabled = { !this.props.googleLog }
              onChange = { e => {
                this.props.updateTicketSetting(
                  this.props.ticketSetting.title,
                  this.props.ticketSetting.head1Line,
                  e.target.value,
                  this.props.ticketSetting.Foot1Line,
                  this.props.ticketSetting.Foot2Line
                )
              }}
            />
          </FormGroup>
          <ControlLabel>Pie de pagina:</ControlLabel>
          <FormGroup>
            <ControlLabel style = { labelStyle }>1ra Linea</ControlLabel>
            <FormControl
              type = 'text'
              style = { formLabelStyle }
              value = { this.props.ticketSetting.Foot1Line }
              placeholder = 'Mensaje'
              disabled = { !this.props.googleLog }
              onChange = { e => {
                this.props.updateTicketSetting(
                  this.props.ticketSetting.title,
                  this.props.ticketSetting.head1Line,
                  this.props.ticketSetting.head2Line,
                  e.target.value,
                  this.props.ticketSetting.Foot2Line
                )
              }}
            />
          </FormGroup>
          <FormGroup>
            <ControlLabel style = { labelStyle }>2da Linea</ControlLabel>
            <FormControl
              type = 'text'
              style = { formLabelStyle }
              value = { this.props.ticketSetting.Foot2Line }
              placeholder = 'Mensaje adicional'
              disabled = { !this.props.googleLog }
              onChange = { e => {
                this.props.updateTicketSetting(
                  this.props.ticketSetting.title,
                  this.props.ticketSetting.head1Line,
                  this.props.ticketSetting.head2Line,
                  this.props.ticketSetting.Foot1Line,
                  e.target.value
                )
              }}
            />
          </FormGroup>
          <RaisedButton
            label = 'GUARDAR'
            secondary = { true }
            disabled = { !this.props.googleLog }
            onClick = { () => {
              this.props.saveSettingPrinter(this.props.printerId, this.props.ticketSetting)
            }}
          ></RaisedButton>
        </div>
      </MuiThemeProvider>
    )
  }

}

const mapStateToProps = state => {
  return {
    googleLog: state.settings.googleLog,
    printerId: state.settings.printerId,
    ticketSetting: state.settings.ticketSetting
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getDataPrinter() {
      dispatch(getDataPrinter())
    },
    getTokenGoogle() {
      dispatch(getTokenGoogle())
    },
    getUrlGoogleToken() {
      dispatch(getUrlGoogleToken())
    },
    saveSettingPrinter(printerId, ticketSetting) {
      dispatch(saveSettingPrinter(printerId, ticketSetting))
    },
    updatePrinterId(printerId) {
      dispatch(updatePrinterId(printerId))
    },
    updateTicketSetting(title, head1, head2, foot1, foot2) {
      dispatch(updateTicketSetting(title, head1, head2, foot1, foot2))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Printer)
