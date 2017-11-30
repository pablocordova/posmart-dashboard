import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { Nav, Navbar, NavItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { connect } from 'react-redux'

import Products from '../components/Products'
import Users from '../containers/Users'
import Setting from '../containers/Setting'
import Login from '../containers/Login'

class App extends Component {

  constructor(){
    super()
    this.state = {
      token: '',
      username: ''
    }
  }

  logout() {
    localStorage.removeItem('token')
    window.location = '/'
  }

  render() {

    let navbarOptions = null

    if (localStorage.getItem('token') === null) {
      navbarOptions = (
        <Nav pullRight>
          <LinkContainer to = '/login'>
            <NavItem eventKey = {1}>Login</NavItem>
          </LinkContainer>
        </Nav>
      )
    } else {
      navbarOptions = (
        <Nav pullRight>
          <LinkContainer to = '/products'>
            <NavItem eventKey = {1}>Products</NavItem>
          </LinkContainer>
          <LinkContainer to = '/users'>
            <NavItem eventKey = {2}>Usuarios</NavItem>
          </LinkContainer>
          <LinkContainer to = '/setting'>
            <NavItem eventKey = {3}>Configuración</NavItem>
          </LinkContainer>
          <NavItem eventKey = {4} onClick = { this.logout }>Salir</NavItem>
        </Nav>
      )
    }

    return (
      <BrowserRouter>
        <div>
          <Navbar inverse collapseOnSelect>
            <Navbar.Header>
              <Navbar.Brand>
                <a href='/'>POSMART</a>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              { navbarOptions }
            </Navbar.Collapse>
          </Navbar>

          <Route path = '/login' component = { Login } />
          <Route path = '/setting' component = { Setting } />
          <Route path = '/products' component = { Products } />
          <Route path = '/users' component = { Users } />
        </div>
      </BrowserRouter>

    )
  }

}

const mapStateToProps = state => {
  return {
    username: state.login.username,
    token: state.login.token
  }
}

export default connect(
  mapStateToProps
)(App)