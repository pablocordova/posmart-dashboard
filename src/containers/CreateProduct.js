import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Modal, FormGroup, FormControl, ControlLabel } from 'react-bootstrap'
import RaisedButton from 'material-ui/RaisedButton'
import {
  showCreateProduct,
  createProduct,
  loadMinimunUnits,
  loadCategories,
  updateProduct
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
            <Modal.Title>{ this.props.titleProduct }</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormGroup>
              <ControlLabel>Nombre</ControlLabel>
              <FormControl
                type = 'text'
                defaultValue = { this.props.product.name }
                onChange = { e =>
                  this.props.product.name = e.target.value
                }
              />
            </FormGroup>
            <FormGroup>
              <ControlLabel>Minima unidad</ControlLabel>
              <FormControl
                componentClass = 'select'
                defaultValue = { this.props.product.minimumUnit }
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
                defaultValue = { this.props.product.category }
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
              label = { this.props.buttonProduct }
              secondary = { true }
              onClick = { () => {
                console.log('here taking decitions')
                console.log(this.props.product.id)
                if (this.props.product.id === '') {
                  this.props.createProduct(this.props.product)
                } else {
                  this.props.updateProduct(this.props.product)
                }
              }}
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
    categories: state.products.categories,
    titleProduct: state.products.titleProduct,
    buttonProduct: state.products.buttonProduct
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateProduct(product) {
      dispatch(updateProduct(product))
    },
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