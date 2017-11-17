import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Modal, FormGroup, FormControl, ControlLabel } from 'react-bootstrap'
import RaisedButton from 'material-ui/RaisedButton'
import {
  showCreateProduct,
  createProduct,
  loadMinimunUnits,
  loadCategories
} from '../actions/products'

class CreateProduct extends Component {

  componentDidMount() {
    // Load all Minimum Units
    this.props.loadMinimunUnits()
    this.props.loadCategories()
  }

  render() {
    return (
      <div>
        <Modal show = { this.props.isVisibleCreateProducts }>
          <Modal.Header>
            <Modal.Title>CREAR PRODUCTO</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormGroup>
              <ControlLabel>Nombre</ControlLabel>
              <FormControl
                type = 'text'
                onChange = { e =>
                  this.props.product.name = e.target.value
                }
              />
            </FormGroup>
            <FormGroup>
              <ControlLabel>Minima unidad</ControlLabel>
              <FormControl
                componentClass = 'select'
                onChange = { e =>
                  this.props.product.minimumUnit = e.target.value
                }
              >
                {
                  this.props.minimumUnits.map( minimumUnit => {
                    return (
                      <option value = { minimumUnit } key = { minimumUnit }>{ minimumUnit }</option>
                    )
                  })
                }
              </FormControl>
            </FormGroup>
            <FormGroup>
              <ControlLabel>Categoria</ControlLabel>
              <FormControl
                componentClass = 'select'
                onChange = { e =>
                  this.props.product.category = e.target.value
                }
              >
                {
                  this.props.categories.map( category => {
                    return (
                      <option value = { category } key = { category }>{ category }</option>
                    )
                  })
                }
              </FormControl>
            </FormGroup>
          </Modal.Body>
          <Modal.Footer>
            <RaisedButton
              label = 'CANCELAR'
              primary = { true }
              onClick = { () =>
                this.props.showCreateProduct(false)
              }
            />
            <RaisedButton
              label = 'CREAR'
              secondary = { true }
              onClick = { () =>
                this.props.createProduct(this.props.product)
              }
            />
          </Modal.Footer>
        </Modal>
      </div>
    )
  }

}

const mapStateToProps = state => {
  return {
    product: state.products.product,
    isVisibleCreateProducts: state.products.isVisibleCreateProducts,
    minimumUnits: state.products.minimumUnits,
    categories: state.products.categories
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadMinimunUnits() {
      dispatch(loadMinimunUnits())
    },
    loadCategories() {
      dispatch(loadCategories())
    },
    showCreateProduct(state) {
      dispatch(showCreateProduct(state))
    },
    createProduct(product) {
      dispatch(createProduct(product))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateProduct)