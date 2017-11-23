import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Modal, FormGroup, FormControl, ControlLabel, Checkbox } from 'react-bootstrap'
import RaisedButton from 'material-ui/RaisedButton'
import swal from 'sweetalert2'

import {
  createUser,
  hideCreateModifyUsers,
  loadUsers,
  updateUser
} from '../actions/users'

class CreateUser extends Component {

  render() {
    return (
      <div>
        <Modal show = { this.props.isVisibleCreateModifyUsers }>
          <Modal.Header>
            <Modal.Title>{ this.props.titleUser }</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormGroup>
              <ControlLabel>Username</ControlLabel>
              <FormControl
                type = 'text'
                defaultValue = { this.props.user.username }
                onChange = { e =>
                  this.props.user.username = e.target.value
                }
              />
            </FormGroup>
            <FormGroup>
              <ControlLabel>Email</ControlLabel>
              <FormControl
                type = 'text'
                defaultValue = { this.props.user.email }
                onChange = { e =>
                  this.props.user.email = e.target.value
                }
              />
            </FormGroup>
            <FormGroup>
              <ControlLabel>Contraseña</ControlLabel>
              <FormControl
                type = 'password'
                defaultValue = { this.props.user.password }
                disabled = { this.props.user.id !== '' }
                onChange = { e =>
                  this.props.user.password = e.target.value
                }
              />
            </FormGroup>
            <FormGroup>
              <ControlLabel>Repetir contraseña</ControlLabel>
              <FormControl
                type = 'password'
                defaultValue = { this.props.user.repeatPassword }
                disabled = { this.props.user.id !== '' }
                onChange = { e =>
                  this.props.user.repeatPassword = e.target.value
                }
              />
            </FormGroup>
            <FormGroup>
              <ControlLabel>Permisos</ControlLabel>
              <div>
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
            </FormGroup>
            <FormGroup>
              <ControlLabel>Tipo de usuario</ControlLabel>
              <FormControl
                componentClass = 'select'
                defaultValue = 'APP'
                onChange = { e =>
                  this.props.user.type = e.target.value
                }
              >
                <option value = 'APP' key = 'APP'>APP</option>
                <option value = 'DASHBOARD' key = 'DASHBOARD'>DASHBOARD</option>
              </FormControl>
            </FormGroup>
          </Modal.Body>
          <Modal.Footer>
            <RaisedButton
              label = 'CANCELAR'
              primary = { true }
              onClick = { () =>
                this.props.hideCreateModifyUsers(false)
              }
            />
            <RaisedButton
              label = { this.props.buttonUser }
              secondary = { true }
              onClick = { () => {
                // validation, TODO: find a better validation focus on UX
                if (this.props.user.id === '') {
                  if (this.props.user.password !== this.props.user.repeatPassword) {
                    swal(
                      'Oops...',
                      'Las contraseñas deben coincidir',
                      'error'
                    )
                  } else {
                    this.props.createUser(this.props.user)
                    this.props.hideCreateModifyUsers(false)
                  }
                } else {
                  this.props.updateUser(this.props.user)
                  this.props.hideCreateModifyUsers(false)
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
    buttonUser: state.users.buttonUser
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createUser(user) {
      dispatch(createUser(user))
        .then(() =>dispatch(loadUsers()))
    },
    hideCreateModifyUsers() {
      dispatch(hideCreateModifyUsers())
    },
    updateUser(user) {
      dispatch(updateUser(user))
        .then(() =>dispatch(loadUsers()))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateUser)