import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import MonetizationOn from 'material-ui/svg-icons/editor/monetization-on';
//import Group from 'material-ui/svg-icons/social/group';
//import Assignment from 'material-ui/svg-icons/action/assignment';
//import ShoppingCart from 'material-ui/svg-icons/action/shopping-cart';
//import GridOn from 'material-ui/svg-icons/image/grid-on';

import {
  LinkContainer
} from 'react-router-bootstrap'

import Earnings from '../containers/Earnings'

const paperStyle = {
  display: 'inline-block',
  margin: '-25px 32px 0px 0px',
  height: '100vh'
};

class Reports extends Component {

  isUserLogin() {
    return localStorage.getItem('token') ? true : false
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <Paper style = { paperStyle }>
            <Menu>
              <LinkContainer to = '/reports/earnings'>
                <MenuItem
                  primaryText = 'Ganancias'
                  leftIcon = { <MonetizationOn /> }
                />
              </LinkContainer>
              {/*
              <MenuItem
                primaryText = 'Ventas'
                leftIcon = { <Assignment /> }
              />
              <MenuItem
                primaryText = 'Compras'
                leftIcon = { <ShoppingCart /> }
              />
              <MenuItem
                primaryText = 'Productos'
                leftIcon = { <GridOn /> }
              />
              <MenuItem
                primaryText = 'Clientes'
                leftIcon = { <Group /> }
              />
              */}
            </Menu>
          </Paper>
          <div className = 'display-inline-block-top'>
            <Route path = '/reports/earnings' render = { () => (
              this.isUserLogin() ? (
                <Earnings />
              ) :
                <Redirect to = '/login'/>
            )} />
          </div>
        </div>
      </MuiThemeProvider>
    )
  }

}

export default Reports
