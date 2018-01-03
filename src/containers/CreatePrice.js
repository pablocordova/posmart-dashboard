import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Modal, FormGroup, FormControl, ControlLabel, Table } from 'react-bootstrap'
import RaisedButton from 'material-ui/RaisedButton'
import {
  addPrice,
  createPrices,
  deletePrice,
  hideCreatePrice,
  loadProducts,
  updateSelectedPrices
} from '../actions/products'

import swal from 'sweetalert2'

const headerModalStyle = {
  textAlign: 'center',
  background: '#000000',
  color: 'white',
  paddingBottom: '10px',
  paddingTop: '15px'
}

class CreatePrice extends Component {

  constructor() {
    super()
    this.state = {
      validation: {
        price: null,
        unit: null
      }
    }
  }

  cleanValidations() {
    this.setState(prevState  => ({
      validation: {
        ...prevState.validation,
        price: null,
        unit: null
      }
    }))
  }

  render() {
    return (
      <div>
        <Modal show = { this.props.isVisibleCreatePrice }>
          <Modal.Header style = { headerModalStyle}>
            <Modal.Title>CREAR PRECIO - { this.props.productSelected.name }</Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <FormGroup>
              <ControlLabel>Cantidad</ControlLabel>
              <FormControl
                componentClass = 'select'
                defaultValue = '1'
                onChange = { e =>
                  this.props.price.quantity = e.target.value
                }
              >
                <option value = '1' key = '1'>1</option>
              </FormControl>
            </FormGroup>

            <FormGroup>
              <ControlLabel>Nombre</ControlLabel>
              <FormControl
                componentClass = 'select'
                defaultValue = 'unidad'
                onChange = { e =>
                  this.props.price.name = e.target.value
                }
              >
                <option value = 'unidad' key = 'unidad'>unidad</option>
                <option value = 'kilo' key = 'kilo'>kilo</option>
                <option value = 'paquete' key = 'paquete'>paquete</option>
                <option value = 'plancha' key = 'plancha'>plancha</option>
                <option value = 'docena' key = 'docena'>docena</option>
                <option value = 'caja' key = 'caja'>caja</option>
                <option value = 'bolsa' key = 'bolsa'>bolsa</option>
                <option value = 'display' key = 'display'>display</option>
                <option value = 'tira' key = 'tira'>tira</option>
                <option value = 'saco' key = 'saco'>saco</option>
                <option value = 'litro' key = 'litro'>litro</option>
              </FormControl>
            </FormGroup>

            <FormGroup validationState = { this.state.validation.price }>
              <ControlLabel>Precio</ControlLabel>
              <FormControl
                type = 'number'
                onChange = { e => {
                  this.props.price.price = e.target.value
                  // Validations
                  let statePrice= null
                  if (e.target.value <= 0) {
                    statePrice = 'error'
                  }
                  this.setState(prevState  => ({
                    validation: {
                      ...prevState.validation,
                      price: statePrice
                    }
                  }))
                }}
              />
            </FormGroup>

            <FormGroup validationState = { this.state.validation.unit }>
              <ControlLabel>Equivale a:</ControlLabel>
              <FormControl
                type = 'number'
                onChange = { e => {
                  this.props.price.items = e.target.value
                  // Validations
                  let stateUnit= null
                  if (e.target.value <= 0) {
                    stateUnit = 'error'
                  }
                  this.setState(prevState  => ({
                    validation: {
                      ...prevState.validation,
                      unit: stateUnit
                    }
                  }))
                }}
              />
              <label>{ this.props.productSelected.minimumUnit }</label>
            </FormGroup>

            <RaisedButton
              label = 'AÑADIR'
              secondary = { true }
              onClick = { () => {

                const unit = this.state.validation.unit
                const price = this.state.validation.price
                const itemsForm = parseFloat(this.props.price.items)
                const priceForm = parseFloat(this.props.price.price)

                if (priceForm === 0) {
                  this.setState(prevState  => ({
                    validation: {
                      ...prevState.validation,
                      price: 'error'
                    }
                  }))
                }

                if (itemsForm === 0) {
                  this.setState(prevState  => ({
                    validation: {
                      ...prevState.validation,
                      unit: 'error'
                    }
                  }))
                }

                if (unit !== 'error' && price !== 'error' && priceForm !== 0 && itemsForm !== 0) {
                  // First verify is quantity and name not is repeated in at least two in array tmp
                  let isPriceDuplicated = false
                  for (let priceTmp of this.props.pricesTmp) {
                    if (priceTmp.quantity === this.props.price.quantity &&
                      priceTmp.name === this.props.price.name
                    ) {
                      isPriceDuplicated = true
                      break
                    }
                  }

                  if (!isPriceDuplicated) {
                    // Add price to temporary array
                    this.props.addPrice(this.props.price)
                  } else {
                    swal(
                      'Oops...',
                      'La cantidad y nombre ya existen',
                      'error'
                    )
                  }
                }
              }}
            />

            <Table responsive>
              <thead>
                <tr>
                  <th>Cantidad</th>
                  <th>Nombre</th>
                  <th>Precio</th>
                  <th>Items</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {
                  this.props.pricesTmp.map((price, index) => {
                    return (
                      <tr key = { index } >
                        <td>{ price.quantity }</td>
                        <td>{ price.name }</td>
                        <td>{ price.price }</td>
                        <td>{ price.items }</td>
                        <td>
                          <i className = 'fa fa-trash' id = { index } onClick = { (e) =>
                            this.props.deletePrice(e.target.id)
                          }
                          ></i>
                        </td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </Table>

          </Modal.Body>
          <Modal.Footer>

            <RaisedButton
              label = 'CANCELAR'
              onClick = { () => {
                this.props.hideCreatePrice()
                this.cleanValidations()
              }}
            />
            <RaisedButton
              label = 'GUARDAR'
              secondary = { true }
              onClick = { () => {
                this.props.hideCreatePrice()
                this.props.createPrices(this.props.pricesTmp, this.props.productSelected._id)
                this.cleanValidations()
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
    isVisibleCreatePrice: state.products.isVisibleCreatePrice,
    price: state.products.price,
    productSelected: state.products.productSelected,
    pricesTmp: state.products.pricesTmp
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createPrices(pricesTmp, idProduct) {
      dispatch(createPrices(pricesTmp, idProduct))
        .then(() => dispatch(loadProducts())
        )
    },
    deletePrice(indexPrice) {
      dispatch(deletePrice(indexPrice))
    },
    hideCreatePrice(state) {
      dispatch(hideCreatePrice(state))
    },
    addPrice(price) {
      dispatch(addPrice(price))
    },
    loadProducts() {
      dispatch(loadProducts())
    },
    updateSelectedPrices(idProduct) {
      dispatch(updateSelectedPrices(idProduct))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreatePrice)