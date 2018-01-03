import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Print from 'material-ui/svg-icons/action/print';
import Https from 'material-ui/svg-icons/action/https';

import {
  LinkContainer
} from 'react-router-bootstrap'

import Printer from '../containers/Printer'
import Security from '../containers/Security'

const paperStyle = {
  display: 'inline-block',
  margin: '-25px 32px 0px 0px',
  height: '100vh'
};

class Settings extends Component {

  isUserLogin() {
    return localStorage.getItem('token') ? true : false
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <Paper style = { paperStyle }>
            <Menu>
              <LinkContainer to = '/settings/printer'>
                <MenuItem
                  primaryText = 'Impresora'
                  leftIcon = { <Print /> }
                />
              </LinkContainer>
              <LinkContainer to = '/settings/security'>
                <MenuItem
                  primaryText = 'Seguridad'
                  leftIcon = { <Https /> }
                />
              </LinkContainer>
            </Menu>
          </Paper>
          <div className = 'display-inline-block-top'>
            <Route path = '/settings/printer' render = { () => (
              this.isUserLogin() ? (
                <Printer />
              ) :
                <Redirect to = '/login'/>
            )} />
            <Route path = '/settings/security' render = { () => (
              this.isUserLogin() ? (
                <Security />
              ) :
                <Redirect to = '/login'/>
            )} />
          </div>
        </div>
      </MuiThemeProvider>
    )
  }

}

export default Settings
