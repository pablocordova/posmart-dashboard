import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Modal, FormGroup, FormControl, ControlLabel } from 'react-bootstrap'
import RaisedButton from 'material-ui/RaisedButton'
import {
  showCreateProduct,
  createProduct,
  loadMinimunUnits,
  loadCategories,
  loadProducts,
  updateProduct
} from '../actions/products'

const headerModalStyle = {
  textAlign: 'center',
  background: '#000000',
  color: 'white',
  paddingBottom: '10px',
  paddingTop: '15px'
}

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
          <Modal.Header style = { headerModalStyle}>
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
              onClick = { () =>
                this.props.showCreateProduct(false)
              }
            />
            <RaisedButton
              label = { this.props.buttonProduct }
              secondary = { true }
              onClick = { () => {
                if (this.props.product.id === '') {
                  this.props.createProduct(this.props.product)
                } else {
                  this.props.updateProduct(this.props.product)
                }
                this.props.showCreateProduct(false)
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
        .then(() =>dispatch(loadProducts()))
    },
    loadMinimunUnits() {
      dispatch(loadMinimunUnits())
    },
    loadCategories() {
      dispatch(loadCategories())
    },
    loadProducts() {
      dispatch(loadProducts())
    },
    showCreateProduct(state) {
      dispatch(showCreateProduct(state))
    },
    createProduct(product) {
      dispatch(createProduct(product))
        .then(() =>dispatch(loadProducts()))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateProduct)