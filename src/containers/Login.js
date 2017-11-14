import React, { Component } from 'react'
import { connect } from 'react-redux'
import { login } from '../actions/login'
import { FormControl, ControlLabel, FormGroup } from 'react-bootstrap'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import RaisedButton from 'material-ui/RaisedButton'

class Login extends Component {

  constructor() {
    super()
    this.state = {
      email: '',
      pass: ''
    }
  }

  render() {
    return (
      <div>
        <h2>INICIAR SESIÓN</h2>
        <MuiThemeProvider>
          <form>
            <FormGroup>
              <ControlLabel>Correo:</ControlLabel>
              <FormControl
                type = 'text'
                placeholder = 'Ingrese Correo'
                onChange = { (event) => {
                  this.setState({
                    email: event.target.value
                  })
                }}
              />
            </FormGroup>
            <FormGroup>
              <ControlLabel>Contraseña</ControlLabel>
              <FormControl
                type = 'password'
                placeholder = 'Ingrese Contraseña'
                onChange = { (event) => {
                  this.setState({
                    pass: event.target.value
                  })
                }}
              />
            </FormGroup>
            <FormGroup>
              <RaisedButton
                label = 'Entrar'
                primary = { true }
                onClick = { () => { this.props.login(this.state.email, this.state.pass) } }
              />
            </FormGroup>
          </form>
        </MuiThemeProvider>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return state
}

const mapDispatchToProps = dispatch => {
  return {
    login(email, pass) {
      dispatch(login(email, pass))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)