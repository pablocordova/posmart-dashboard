import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Modal, FormGroup, FormControl, ControlLabel, Checkbox, Radio } from 'react-bootstrap'
import RaisedButton from 'material-ui/RaisedButton'
import swal from 'sweetalert2'

import {
  createUser,
  hideCreateModifyUsers,
  loadUsers,
  updateUser,
  updatePermissionDiscount
} from '../actions/users'

const headerModalStyle = {
  textAlign: 'center',
  background: '#000000',
  color: 'white',
  paddingBottom: '10px',
  paddingTop: '15px'
}

class CreateUser extends Component {

  constructor() {
    super()
    this.state = {
      validation: {
        username: null,
        email: null,
        pass: null,
        passRepeat: null
      }
    }
  }

  cleanValidations() {
    this.setState(prevState  => ({
      validation: {
        ...prevState.validation,
        username: null,
        email: null,
        pass: null,
        passRepeat: null
      }
    }))
  }

  render() {
    return (
      <div>
        <Modal show = { this.props.isVisibleCreateModifyUsers }>
          <Modal.Header style = { headerModalStyle}>
            <Modal.Title>{ this.props.titleUser }</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormGroup validationState = { this.state.validation.username }>
              <ControlLabel>Username</ControlLabel>
              <FormControl
                type = 'text'
                defaultValue = { this.props.user.username }
                onChange = { e => {
                  let username = e.target.value.trim()
                  this.props.user.username = username
                  // Validations
                  let stateUsername = null
                  if (username === '' || username.length < 2) {
                    stateUsername = 'error'
                  }
                  this.setState(prevState  => ({
                    validation: {
                      ...prevState.validation,
                      username: stateUsername
                    }
                  }))
                }}
              />
            </FormGroup>
            <FormGroup validationState = { this.state.validation.email }>
              <ControlLabel>Email</ControlLabel>
              <FormControl
                type = 'text'
                defaultValue = { this.props.user.email }
                onChange = { e => {
                  let email = e.target.value.trim()
                  this.props.user.email = email
                  // Validations
                  let stateEmail = null
                  if (email === '') {
                    stateEmail = 'error'
                  }
                  this.setState(prevState  => ({
                    validation: {
                      ...prevState.validation,
                      name: stateEmail
                    }
                  }))
                }}
              />
            </FormGroup>
            <FormGroup validationState = { this.state.validation.pass }>
              <ControlLabel>Contraseña</ControlLabel>
              <FormControl
                type = 'password'
                defaultValue = { this.props.user.password }
                disabled = { this.props.user.id !== '' }
                onChange = { e => {
                  let pass = e.target.value
                  this.props.user.password = pass
                  // Validations
                  let statePass = null
                  if (pass === '' || pass.length < 8) {
                    statePass = 'error'
                  }
                  this.setState(prevState  => ({
                    validation: {
                      ...prevState.validation,
                      pass: statePass
                    }
                  }))
                }}
              />
            </FormGroup>
            <FormGroup  validationState = { this.state.validation.passRepeat }>
              <ControlLabel>Repetir contraseña</ControlLabel>
              <FormControl
                type = 'password'
                defaultValue = { this.props.user.repeatPassword }
                disabled = { this.props.user.id !== '' }
                onChange = { e => {
                  let passRepeat = e.target.value
                  this.props.user.repeatPassword  = passRepeat
                  // Validations
                  let statePassRepeat = null
                  if (passRepeat === '' || passRepeat.length < 8) {
                    statePassRepeat = 'error'
                  }
                  this.setState(prevState  => ({
                    validation: {
                      ...prevState.validation,
                      passRepeat: statePassRepeat
                    }
                  }))
                }}
              />
            </FormGroup>
            <FormGroup>
              <h4>PERMISOS</h4>
              <div hidden>
                <Checkbox
                  inline
                  defaultChecked={ this.props.user.permissions.customers }
                  onClick = { e =>
                    this.props.user.permissions.customers = e.target.checked
                  }
                >
                  Clientes
                </Checkbox>
                {' '}
                <Checkbox
                  inline
                  defaultChecked={ this.props.user.permissions.products }
                  onClick = { e =>
                    this.props.user.permissions.products = e.target.checked
                  }
                >
                  Productos
                </Checkbox>
                {' '}
                <Checkbox
                  inline
                  defaultChecked={ this.props.user.permissions.sales }
                  onClick = { e =>
                    this.props.user.permissions.sales = e.target.checked
                  }
                >
                  Ventas
                </Checkbox>
                {' '}
                <Checkbox
                  inline
                  defaultChecked={ this.props.user.permissions.settings }
                  onClick = { e =>
                    this.props.user.permissions.settings = e.target.checked
                  }
                >
                  Configuraciones
                </Checkbox>
                {' '}
                <Checkbox
                  inline
                  defaultChecked={ this.props.user.permissions.users }
                  onClick = { e =>
                    this.props.user.permissions.users = e.target.checked
                  }
                >
                  Usuarios
                </Checkbox>
              </div>
              <h5>Descuentos</h5>
              <p>Para cualquier opcion de descuentos, caso el descuento disminuya o
              iguale el costo del producto, solo aparecerá una ventana de advertencia.</p>
              <FormGroup className = 'text-center'>
                <Radio
                  name = 'radioGroup'
                  inline
                  defaultChecked = { this.props.permissionDiscount === 'NoPermit' }
                  onClick = { () =>
                    this.props.updatePermissionDiscount('NoPermit')
                  }
                >
                  No permitir
                </Radio>
                {' '}
                <Radio
                  name = 'radioGroup'
                  inline
                  defaultChecked = { this.props.permissionDiscount === 'PermitPIN' }
                  onClick = { () =>
                    this.props.updatePermissionDiscount('PermitPIN')
                  }
                >
                  Permitir con PIN de seguridad
                </Radio>
                {' '}
                <Radio
                  name = 'radioGroup'
                  inline
                  defaultChecked = { this.props.permissionDiscount === 'Permit' }
                  onClick = { () =>
                    this.props.updatePermissionDiscount('Permit')
                  }
                >
                  Permitir
                </Radio>
              </FormGroup>
            </FormGroup>
          </Modal.Body>
          <Modal.Footer>
            <RaisedButton
              label = 'CANCELAR'
              onClick = { () => {
                this.props.hideCreateModifyUsers(false)
                this.cleanValidations()
              }}
            />
            <RaisedButton
              label = { this.props.buttonUser }
              secondary = { true }
              onClick = { () => {
                const username = this.state.validation.username
                const email = this.state.validation.email
                const pass = this.state.validation.pass
                const passRepeat = this.state.validation.passRepeat
                // validation, TODO: find a better validation focus on UX
                if (username !== 'error' && email !== 'error' && pass !== 'error' &&
                  passRepeat !== 'error')
                {
                  if (this.props.user.id === '') {
                    if (this.props.user.password !== this.props.user.repeatPassword) {
                      swal(
                        'Oops...',
                        'Las contraseñas deben coincidir',
                        'error'
                      )
                    } else {
                      this.props.createUser(this.props.user, this.props.permissionDiscount)
                      this.props.hideCreateModifyUsers(false)
                    }
                  } else {
                    this.props.updateUser(this.props.user, this.props.permissionDiscount)
                    this.props.hideCreateModifyUsers(false)
                  }
                }
              }}
            />
          </Modal.Footer>
        </Modal>
      </div>
    )
  }

}

const mapStateToProps = state => {
  return {
    user: state.users.user,
    isVisibleCreateModifyUsers: state.users.isVisibleCreateModifyUsers,
    titleUser: state.users.titleUser,
    buttonUser: state.users.buttonUser,
    permissionDiscount: state.users.permissionDiscount
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createUser(user, permissionDiscount) {
      dispatch(createUser(user, permissionDiscount))
        .then(() =>dispatch(loadUsers()))
    },
    hideCreateModifyUsers() {
      dispatch(hideCreateModifyUsers())
    },
    updateUser(user, permissionDiscount) {
      dispatch(updateUser(user, permissionDiscount))
        .then(() =>dispatch(loadUsers()))
    },
    updatePermissionDiscount(typePermission) {
      dispatch(updatePermissionDiscount(typePermission))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateUser)