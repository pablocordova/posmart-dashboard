import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Modal, FormGroup, FormControl, ControlLabel, Table } from 'react-bootstrap'
import RaisedButton from 'material-ui/RaisedButton'
import {
  createPrice,
  deletePrice,
  hideCreatePrice,
  loadProducts,
  updateSelectedPrices
} from '../actions/products'

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
                <option value = '1/4' key = '3'>1/4</option>
                <option value = '1/2' key = '6'>1/2</option>
                <option value = '3/4' key = '9'>3/4</option>

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
              label = 'CREAR'
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
                  this.props.createPrice(this.props.price, this.props.productSelected._id)
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
                  this.props.productSelected.prices.map((price, index) => {
                    return (
                      <tr key = { index } >
                        <td>{ price.quantity }</td>
                        <td>{ price.name }</td>
                        <td>{ price.price }</td>
                        <td>{ price.items }</td>
                        <td>
                          <i className = 'fa fa-trash' id = { index } onClick = { (e) =>
                            this.props.deletePrice(this.props.productSelected._id, e.target.id)
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
              label = 'CERRAR'
              onClick = { () => {
                this.props.hideCreatePrice()
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
    productSelected: state.products.productSelected
  }
}

const mapDispatchToProps = dispatch => {
  return {
    deletePrice(idProduct, indexPrice) {
      dispatch(deletePrice(idProduct, indexPrice))
        .then(() => dispatch(loadProducts())
          .then(() =>dispatch(updateSelectedPrices(idProduct)))
        )
    },
    hideCreatePrice(state) {
      dispatch(hideCreatePrice(state))
    },
    createPrice(price, idProduct) {
      dispatch(createPrice(price))
        .then(() => dispatch(loadProducts())
          .then(() =>dispatch(updateSelectedPrices(idProduct)))
        )
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