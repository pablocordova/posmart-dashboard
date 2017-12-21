
// -- Exteral modules

// Main module
import React, { Component } from 'react'
// Other modules
import { Modal } from 'react-bootstrap'
import { connect } from 'react-redux'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import RaisedButton from 'material-ui/RaisedButton'
import _ from 'lodash'

import {
  FormControl
} from 'react-bootstrap'

// -- Own Modules
import {
  changeViewCost,
  hideCosts,
  updateUnitCost
} from '../actions/products'

class ViewCosts extends Component {

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <Modal show = { this.props.isVisibleViewCosts }>
            <Modal.Header>
              <Modal.Title>COSTOS - { this.props.productSelected.name } </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {
                this.props.pricesViewCost.map( (price, index) => {
                  return(
                    <div id = { index } key = { index }>
                      { this.props.productSelected.prices.length > 0 ?
                        this.props.productSelected.prices[index].name : ''
                      } :
                      <FormControl
                        type = 'number'
                        value = { price }
                        onChange = { e => {
                          this.props.changeViewCost(e.target.parentNode.id, e.target.value)
                        }}
                      />
                    </div>
                  )
                })
              }
            <RaisedButton
              label = 'GRABAR'
              primary = { true }
              onClick = { () => {
                let unitCost = _.round(
                  this.props.pricesViewCost[0] / this.props.productSelected.prices[0].items,
                  10
                )
                this.props.updateUnitCost(
                  unitCost,
                  this.props.productSelected._id
                )
              }}
            />
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
    pricesViewCost: state.products.pricesViewCost,
    isVisibleViewCosts: state.products.isVisibleViewCosts,
    pricesViewCosts: state.products.pricesViewCosts,
    productSelected: state.products.productSelected
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changeViewCost(index, value) {
      dispatch(changeViewCost(index, value))
    },
    hideCosts() {
      dispatch(hideCosts())
    },
    updateUnitCost(unitCost, idProduct) {
      dispatch(updateUnitCost(unitCost, idProduct))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewCosts)