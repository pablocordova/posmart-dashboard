import React, { Component } from 'react'
import { connect } from 'react-redux'
import { register } from '../actions/register'
import { FormControl, ControlLabel, FormGroup, Row, Grid, Col } from 'react-bootstrap'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import RaisedButton from 'material-ui/RaisedButton'

class Register extends Component {

  constructor() {
    super()
    this.state = {
      business: '',
      email: '',
      pass: '',
      passRepeat: '',
      code: ''
    }
  }

  render() {
    return (
      <div>
        <Grid>
          <Row>
            <Col xs = { 4 } xsOffset = { 4 }>
              <h2>REGISTRAR</h2>
              <MuiThemeProvider>
                <form>
                  <FormGroup>
                    <ControlLabel>Nombre de la empresa:</ControlLabel>
                    <FormControl
                      type = 'text'
                      onChange = { (event) => {
                        this.setState({
                          business: event.target.value
                        })
                      }}
                    />
                  </FormGroup>
                  <FormGroup>
                    <ControlLabel>Correo:</ControlLabel>
                    <FormControl
                      type = 'text'
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
                    <ControlLabel>Repetir Contraseña</ControlLabel>
                    <FormControl
                      type = 'password'
                      placeholder = 'Repetir Contraseña'
                      onChange = { (event) => {
                        this.setState({
                          passRepeat: event.target.value
                        })
                      }}
                    />
                  </FormGroup>
                  <FormGroup>
                    <ControlLabel>Codigo</ControlLabel>
                    <FormControl
                      type = 'text'
                      onChange = { (event) => {
                        this.setState({
                          code: event.target.value
                        })
                      }}
                    />
                  </FormGroup>
                  <FormGroup>
                    <RaisedButton
                      label = 'Registrar'
                      primary = { true }
                      onClick = { () => {
                        if (this.state.code === 'pablo1598') {
                          this.props.register(
                            this.state.business,
                            this.state.email,
                            this.state.pass,
                            this.state.passRepeat
                          ) 
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
  return state
}

const mapDispatchToProps = dispatch => {
  return {
    register(business, email, pass, passRepeat) {
      dispatch(register(business, email, pass, passRepeat))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register)