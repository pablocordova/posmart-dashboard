import React, { Component } from 'react'
import { BrowserRouter, Route, Redirect } from 'react-router-dom'
import { Nav, Navbar, NavItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { connect } from 'react-redux'

import Products from './Products'
import Reports from '../components/Reports'
import Receipts from './Receipts'
import Buys from './Buys'
import Users from './Users'
import Setting from '../components/Settings'
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

const backgroundNavbarStyle = {
  background: '#000000',
  color: 'white'
}

class App extends Component {

  logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('businessNameDashboard')
    window.location = '/'
  }

  isUserLogin() {
    return localStorage.getItem('token') ? true : false
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
            <NavItem eventKey = {2}>Register</NavItem>
          </LinkContainer>
        </Nav>
      )
    } else {
      navbarOptions = (
        <Nav pullRight>
          <LinkContainer to = '/reports'>
            <NavItem eventKey = {0}>
              <i className = 'fa fa-area-chart'></i>&ensp; Reportes
            </NavItem>
          </LinkContainer>
          <LinkContainer to = '/products'>
            <NavItem eventKey = {1}>
              <i className = 'fa fa-cubes'></i>&ensp; Productos
            </NavItem>
          </LinkContainer>
          <LinkContainer to = '/receipts'>
            <NavItem eventKey = {2}>
              <i className = 'fa fa-list'></i>&ensp; Recibos
            </NavItem>
          </LinkContainer>
          <LinkContainer to = '/buys'>
            <NavItem eventKey = {3}>
              <i className = 'fa fa-shopping-cart'></i>&ensp; Compras
            </NavItem>
          </LinkContainer>
          <LinkContainer to = '/users'>
            <NavItem eventKey = {4}>
              <i className = 'fa fa-users'></i>&ensp; Usuarios
            </NavItem>
          </LinkContainer>
          <LinkContainer to = '/settings'>
            <NavItem eventKey = {5}>
              <i className = 'fa fa-cogs'></i>&ensp; Configuracion
            </NavItem>
          </LinkContainer>
          <NavItem eventKey = {6} onClick = { this.logout }>
            <i className = 'fa fa-sign-out'></i>&ensp; Salir
          </NavItem>
        </Nav>
      )
    }

    return (
      <BrowserRouter basename = { BASE_URL }>
        <div>
          <Navbar collapseOnSelect style = { backgroundNavbarStyle }>
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
          <Route path = '/settings' render = { () => (
            this.isUserLogin() ? (
              <Setting />
            ) :
              <Redirect to = '/login'/>
          )} />
          <Route path = '/reports'  render = { () => (
            this.isUserLogin() ? (
              <Reports />
            ) :
              <Redirect to = '/login'/>
          )} />
          <Route path = '/products' render = { () => (
            this.isUserLogin() ? (
              <Products />
            ) :
              <Redirect to = '/login'/>
          )} />
          <Route path = '/receipts' render = { () => (
            this.isUserLogin() ? (
              <Receipts />
            ) :
              <Redirect to = '/login'/>
          )} />
          <Route path = '/buys' render = { () => (
            this.isUserLogin() ? (
              <Buys />
            ) :
              <Redirect to = '/login'/>
          )} />
          <Route path = '/users' render = { () => (
            this.isUserLogin() ? (
              <Users />
            ) :
              <Redirect to = '/login'/>
          )} />
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