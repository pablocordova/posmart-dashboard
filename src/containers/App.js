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
import Register from './Register'

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

  logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('businessNameDashboard')
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
          <LinkContainer to = '/register'>
            <NavItem eventKey = {1}>Register</NavItem>
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
                <a href=''>{ localStorage.getItem('businessNameDashboard') }</a>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              { navbarOptions }
            </Navbar.Collapse>
          </Navbar>

          <Route path = '/login' component = { Login } />
          <Route path = '/register' component = { Register } />
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
  return state
}

export default connect(
  mapStateToProps
)(App)