
// -- Exteral modules

// Main module
import React, { Component } from 'react'
// Other modules
import { Modal, Table } from 'react-bootstrap'
import { connect } from 'react-redux'
import {
  ControlLabel,
  FormGroup,
  FormControl
} from 'react-bootstrap'

import moment from 'moment'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import RaisedButton from 'material-ui/RaisedButton'

// -- Own Modules
import {
  hideCosts
} from '../actions/products'

class ViewCosts extends Component {

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <Modal show = { this.props.isVisibleViewCosts }>
            <Modal.Header>
              <Modal.Title>COSTOS </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {
                this.props.productSelected.prices.map( (price, index) => {
                  let cost = price.items * this.props.productSelected.unitCost
                  let name = price.name
                  return(
                    <div key = { index }>{ name } : { cost }</div>
                  )
                })
              }
            </Modal.Body>
            <Modal.Footer>
              <RaisedButton
                label = 'OK'
                primary = { true }
                onClick = { () =>
                  this.props.hideCosts()
                }
              />
            </Modal.Footer>
          </Modal>
        </div>
      </MuiThemeProvider>
    )
  }

}

const mapStateToProps = state => {
  return {
    productSelected: state.products.productSelected,
    isVisibleViewCosts: state.products.isVisibleViewCosts
  }
}

const mapDispatchToProps = dispatch => {
  return {
    hideCosts() {
      dispatch(hideCosts())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewCosts)