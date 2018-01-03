import React, { Component } from 'react'
import { connect } from 'react-redux'
import { login, showError, removeError } from '../actions/login'
import { FormControl, ControlLabel, FormGroup, Row, Grid, Col } from 'react-bootstrap'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import RaisedButton from 'material-ui/RaisedButton'

const errorTextStyle = {
  color: '#A94442'
}

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
        <Grid>
          <Row>
            <Col xs = { 4 } xsOffset = { 4 }>
              <h2>INICIAR SESIÓN</h2>
              <MuiThemeProvider>
                <form>
                  <FormGroup validationState = { this.props.validEmail }>
                    <ControlLabel>Correo:</ControlLabel>
                    <FormControl
                      type = 'text'
                      placeholder = 'Ingrese Correo'
                      onChange = { (event) => {
                        this.props.removeError('email')
                        this.setState({
                          email: event.target.value
                        })
                      }}
                    />
                    <div
                      hidden = { this.props.validEmail !== 'error' ||
                        this.state.email.trim() === ''
                      }
                      style = { errorTextStyle }
                    >
                      No existe Usuario
                    </div>
                  </FormGroup>
                  <FormGroup validationState = { this.props.validPass }>
                    <ControlLabel>Contraseña</ControlLabel>
                    <FormControl
                      type = 'password'
                      placeholder = 'Ingrese Contraseña'
                      onChange = { (event) => {
                        this.props.removeError('pass')
                        this.setState({
                          pass: event.target.value
                        })
                      }}
                    />
                    <div
                      hidden = { this.props.validPass !== 'error'  ||
                        this.state.pass.trim() === ''
                      }
                      style = { errorTextStyle }
                    >
                      Contraseña incorrecta
                    </div>
                  </FormGroup>
                  <FormGroup>
                    <RaisedButton
                      label = 'Entrar'
                      primary = { true }
                      onClick = { () => {

                        let email = this.state.email.trim()
                        let pass = this.state.pass.trim()

                        if (email === '') {
                          this.props.showError('email')
                        }
                        if (pass === '') {
                          this.props.showError('pass')
                        }

                        if (email !== '' && pass !== '') {
                          this.props.login(this.state.email, this.state.pass)
                        }

                      }}
                    />
                  </FormGroup>
                </form>
              </MuiThemeProvider>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    validEmail: state.login.validEmail,
    validPass: state.login.validPass
  }
}

const mapDispatchToProps = dispatch => {
  return {
    login(email, pass) {
      dispatch(login(email, pass))
    },
    showError(type) {
      dispatch(showError(type))
    },
    removeError(type) {
      dispatch(removeError(type))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)