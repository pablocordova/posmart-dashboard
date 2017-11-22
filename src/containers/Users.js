import React, { Component } from 'react'

import RaisedButton from 'material-ui/RaisedButton'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {
  Table,
  FormGroup,
  FormControl
} from 'react-bootstrap'
import { connect } from 'react-redux'
import swal from 'sweetalert2'

import {
  deleteUser,
  filterUsers,
  loadUsers,
  showCreateUser,
  showModifyUser
} from '../actions/users'

import CreateUser from '../containers/CreateUser'

import 'font-awesome/css/font-awesome.min.css';

class Users extends Component {

  componentDidMount() {
    this.props.loadUsers()
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <h2>USUARIOS</h2>
          <FormGroup>
            <FormControl
              type = 'text'
              placeholder = 'Buscar usuario'
              onChange = { e =>
                this.props.filterUsers(e.target.value)
              }
            />
          </FormGroup>
          <RaisedButton
            label = 'NUEVO'
            primary = { true }
            onClick = { () =>
              this.props.showCreateUser(true)
            }
          ></RaisedButton>
          <Table responsive>
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {
                this.props.usersFiltered.map(user => {
                  return (
                    <tr key = { user._id } >
                      <td>{ user.username }</td>
                      <td>{ user.email }</td>
                      <td>
                        <i className = 'fa fa-pencil' id = { user._id } onClick = { (e) =>
                          this.props.showModifyUser(e.target.id)
                        }></i>
                        <i className = 'fa fa-trash' id = { user._id } onClick = { (e) => {
                          let deleteUserMethod = this.props.deleteUser
                          let idUser = e.target.id
                          swal({
                            title: 'Esta seguro de eliminar el usuario?',
                            type: 'warning',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Si, borrarlo!',
                            cancelButtonText: 'Cancelar'
                          }).then(function (result) {
                            if (result.value) {
                              deleteUserMethod(idUser)
                            }
                          })
                        }}
                        ></i>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </Table>
          <CreateUser />
        </div>
      </MuiThemeProvider>
    )
  }

}

const mapStateToProps = state => {
  return {
    usersFiltered: state.users.usersFiltered
  }
}

const mapDispatchToProps = dispatch => {
  return {
    deleteUser(idUser) {
      dispatch(deleteUser(idUser))
        .then(() =>dispatch(loadUsers()))
    },
    filterUsers(string) {
      dispatch(filterUsers(string))
    },
    loadUsers() {
      dispatch(loadUsers())
    },
    showCreateUser(state) {
      dispatch(showCreateUser(state))
    },
    showModifyUser(idUser) {
      dispatch(showModifyUser(idUser))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Users)
