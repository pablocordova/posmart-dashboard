import React, { Component } from 'react'
import { connect } from 'react-redux'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import MonetizationOn from 'material-ui/svg-icons/editor/monetization-on';
import Group from 'material-ui/svg-icons/social/group';
import Assignment from 'material-ui/svg-icons/action/assignment';
import ShoppingCart from 'material-ui/svg-icons/action/shopping-cart';
import GridOn from 'material-ui/svg-icons/image/grid-on';

//import { Row, Grid, Col } from 'react-bootstrap'

const paperStyle = {
  display: 'inline-block',
  margin: '-25px 32px 0px 0px',
  height: '100vh'
};

class Reports extends Component {

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <Paper style = { paperStyle }>
            <Menu>
              <MenuItem
                primaryText = 'Ganancias'
                leftIcon = { <MonetizationOn /> }
                onClick = { e => console.log('hehehehe')}
              />
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
            </Menu>
          </Paper>
          <div className = 'display-inline-block'>
            <h1>Hello world</h1>
          </div>
        </div>
      </MuiThemeProvider>
    )
  }

}

const mapStateToProps = state => {
  return {
    state
  }
}

const mapDispatchToProps = dispatch => {
  return {
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Reports)
