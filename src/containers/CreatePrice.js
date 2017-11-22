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

class CreatePrice extends Component {

  render() {
    return (
      <div>
        <Modal show = { this.props.isVisibleCreatePrice }>
          <Modal.Header>
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
                <option value = 'docena' key = 'docena'>docena</option>
                <option value = 'caja' key = 'caja'>caja</option>
                <option value = 'bolsa' key = 'bolsa'>bolsa</option>
                <option value = 'saco' key = 'saco'>saco</option>

              </FormControl>
            </FormGroup>

            <FormGroup>
              <ControlLabel>Precio</ControlLabel>
              <FormControl
                type = 'number'
                onChange = { e =>
                  this.props.price.price = e.target.value
                }
              />
            </FormGroup>

            <FormGroup>
              <ControlLabel>Equivale a:</ControlLabel>
              <FormControl
                type = 'number'
                onChange = { e =>
                  this.props.price.items = e.target.value
                }
              />
              <label>{ this.props.productSelected.minimumUnit }</label>
            </FormGroup>

            <RaisedButton
              label = 'CREAR'
              primary = { true }
              onClick = { () => {
                this.props.createPrice(this.props.price)
                this.props.loadProducts()
                this.props.updateSelectedPrices(this.props.productSelected._id)
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
                          <i className = 'fa fa-trash' id = { index } onClick = { (e) => {
                            this.props.deletePrice(this.props.productSelected._id, e.target.id)
                            this.props.loadProducts()
                            this.props.updateSelectedPrices(this.props.productSelected._id)
                          }}
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
              label = 'OK'
              primary = { true }
              onClick = { () =>
                this.props.hideCreatePrice()
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
    isVisibleCreatePrice: state.products.isVisibleCreatePrice,
    price: state.products.price,
    productSelected: state.products.productSelected
  }
}

const mapDispatchToProps = dispatch => {
  return {
    deletePrice(idProduct, indexPrice) {
      dispatch(deletePrice(idProduct, indexPrice))
    },
    hideCreatePrice(state) {
      dispatch(hideCreatePrice(state))
    },
    createPrice(price) {
      dispatch(createPrice(price))
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