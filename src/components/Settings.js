import React, { Component } from 'react'
import { Route } from 'react-router-dom'

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
            <Route path = '/settings/printer' component = { Printer } />
            <Route path = '/settings/security' component = { Security } />
          </div>
        </div>
      </MuiThemeProvider>
    )
  }

}

export default Settings
