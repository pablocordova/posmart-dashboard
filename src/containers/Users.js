import React, { Component } from 'react'

import RaisedButton from 'material-ui/RaisedButton'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { green500, black } from 'material-ui/styles/colors';
import TextField from 'material-ui/TextField';
import {
  Table,
  Grid,
  Row
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

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: black,
    accent1Color: green500
  }
});

const underlineStyle =  {
  borderColor: green500
}

const floatingLabelStyle = {
  color: black
}

class Users extends Component {

  componentDidMount() {
    this.props.loadUsers()
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={ muiTheme }>
      <Grid>
        <Row>
          <div>
            <div>
              <TextField
                hintText="Nombre del usuario"
                floatingLabelText="FILTRAR USUARIO"
                underlineFocusStyle = { underlineStyle }
                floatingLabelStyle = { floatingLabelStyle }
                onChange = { e => this.props.filterUsers(e.target.value) }
              />
            </div>
            <RaisedButton
              label = 'NUEVO'
              secondary = { true }
              onClick = { () =>
                this.props.showCreateUser(true)
              }
            ></RaisedButton>
            <Table responsive>
              <thead>
                <tr className = 'text-center-header-table'>
                  <th>Username</th>
                  <th>Email</th>
                  <th></th>
                </tr>
              </thead>
              <tbody className = 'row-table-selected'>
                {
                  this.props.usersFiltered.map(user => {
                    return (
                      <tr key = { user._id } className = 'text-center'>
                        <td>{ user.username }</td>
                        <td>{ user.email }</td>
                        <td className = 'spread-two-icons'>
                          <i className = 'fa fa-pencil fa-lg' id = { user._id } onClick = { (e) =>
                            this.props.showModifyUser(e.target.id)
                          }></i>
                          <i className = 'fa fa-trash fa-lg' id = { user._id } onClick = { (e) => {
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
        </Row>
      </Grid>
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
