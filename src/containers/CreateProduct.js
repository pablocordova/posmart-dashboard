import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Modal, FormGroup, FormControl, ControlLabel } from 'react-bootstrap'
import RaisedButton from 'material-ui/RaisedButton'
import {
  filterProducts,
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

  constructor() {
    super()
    this.state = {
      validation: {
        name: null
      }
    }
  }

  cleanValidations() {
    this.setState(prevState  => ({
      validation: {
        ...prevState.validation,
        name: null
      }
    }))
  }

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
            <FormGroup validationState = { this.state.validation.name }>
              <ControlLabel>Nombre</ControlLabel>
              <FormControl
                type = 'text'
                defaultValue = { this.props.product.name }
                onChange = { e => {
                  this.props.product.name = e.target.value
                  // Validations
                  let stateName = null
                  if (e.target.value.trim() === '') {
                    stateName = 'error'
                  }
                  this.setState(prevState  => ({
                    validation: {
                      ...prevState.validation,
                      name: stateName
                    }
                  }))
                }}
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
              onClick = { () => {
                this.props.showCreateProduct(false)
                this.cleanValidations()
              }}
            />
            <RaisedButton
              label = { this.props.buttonProduct }
              secondary = { true }
              onClick = { () => {
                const name = this.state.validation.name
                if (name !== 'error' && this.props.product.name.trim() !== '') {
                  if (this.props.product.id === '') {
                    this.props.createProduct(this.props.product, this.props.stringToFilter)
                  } else {
                    this.props.updateProduct(this.props.product, this.props.stringToFilter)
                  }
                  this.props.showCreateProduct(false)
                } else {
                  this.setState(prevState  => ({
                    validation: {
                      ...prevState.validation,
                      name: 'error'
                    }
                  }))
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
    buttonProduct: state.products.buttonProduct,
    stringToFilter: state.products.stringToFilter
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateProduct(product, string) {
      dispatch(updateProduct(product))
        .then(() =>dispatch(loadProducts()))
        .then(() =>dispatch(filterProducts(string)))
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
    createProduct(product, string) {
      dispatch(createProduct(product))
        .then(() =>dispatch(loadProducts()))
        .then(() =>dispatch(filterProducts(string)))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateProduct)