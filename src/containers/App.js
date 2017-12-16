import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { Nav, Navbar, NavItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { connect } from 'react-redux'

import Products from './Products'
import Receipts from './Receipts'
import Users from './Users'
import Setting from './Setting'
import Login from './Login'

let BASE_URL = ''

switch (process.env.REACT_APP_ENV) {
  case 'production':
    BASE_URL = process.env.REACT_APP_BASE_URL_PRODUCTION;
    break;
  case 'development':
    BASE_URL = process.env.REACT_APP_BASE_URL_DEVELOPMENT;
    break;
  default:
    break;
}

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
          <LinkContainer to = '/receipts'>
            <NavItem eventKey = {2}>Recibos</NavItem>
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
      <BrowserRouter basename = { BASE_URL }>
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
          <Route path = '/receipts' component = { Receipts } />
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