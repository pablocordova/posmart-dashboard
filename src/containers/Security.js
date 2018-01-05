import React, { Component } from 'react'
import { connect } from 'react-redux'

import RaisedButton from 'material-ui/RaisedButton'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { green500, black } from 'material-ui/styles/colors';

import {
  FormControl
} from 'react-bootstrap'

// generate Earnings only is temporary, is to generate earnings in sales
// Now each sale generated, have its own earning, but temporary I will have this method
// Maybe I need to correct again

import {
  generateEarnings,
  getPermissionPin,
  updatePermissionPin,
  savePermissionPin
} from '../actions/settings'

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: black,
    accent1Color: green500
  }
});

const pinStyle = {
  width: '25%'
}

class Security extends Component {

  componentDidMount() {
    this.props.getPermissionPin()
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={ muiTheme }>
        <div>
          <h4>PIN de seguridad</h4>
          <p>codigo para ejecutar tareas en usuarios de ventas</p>
          <FormControl
            type = 'number'
            style = { pinStyle }
            value = { this.props.permissionPin }
            placeholder = 'PIN'
            onChange = { e => {
              this.props.updatePermissionPin(e.target.value)
            }}
          />
          <RaisedButton
            label = 'GUARDAR'
            secondary = { true }
            onClick = { () =>
              this.props.savePermissionPin(this.props.permissionPin)
            }
          ></RaisedButton>
          <div hidden>
            <RaisedButton
              label = 'TMP'
              secondary = { true }
              onClick = { () =>
                this.props.generateEarnings()
              }
            ></RaisedButton>
          </div>
        </div>
      </MuiThemeProvider>
    )
  }

}

const mapStateToProps = state => {
  return {
    permissionPin: state.settings.permissionPin
  }
}

const mapDispatchToProps = dispatch => {
  return {
    generateEarnings() {
      dispatch(generateEarnings())
    },
    getPermissionPin() {
      dispatch(getPermissionPin())
    },
    updatePermissionPin(pin) {
      dispatch(updatePermissionPin(pin))
    },
    savePermissionPin(pin) {
      dispatch(savePermissionPin(pin))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Security)
