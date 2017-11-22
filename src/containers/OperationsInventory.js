import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Modal, FormGroup, FormControl, ControlLabel, Table } from 'react-bootstrap'
import RaisedButton from 'material-ui/RaisedButton'
import swal from 'sweetalert2'

import {
  createInventory,
  hideInventory,
  loadProducts,
  updateSelectedPrices
} from '../actions/products'

class OperationInventory extends Component {

  render() {
    return (
      <div>
        <Modal show = { this.props.isVisibleOperationsInventory}>
          <Modal.Header>
            <Modal.Title>INVENTARIO - { this.props.productSelected.name }</Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <FormGroup>
              <ControlLabel>Cantidad</ControlLabel>
              <FormControl
                type = 'number'
                onChange = { e =>
                  this.props.inventory.quantity = e.target.value
                }
              />
            </FormGroup>

            <FormGroup>
              <ControlLabel>Precio</ControlLabel>
              <FormControl
                type = 'number'
                onChange = { e =>
                  this.props.inventory.unitCost = e.target.value
                }
              />
            </FormGroup>

            <RaisedButton
              label = 'AGREGAR'
              primary = { true }
              onClick = { () => {
                let createInventoryMethod = this.props.createInventory
                let inventory = this.props.inventory;
                let product = this.props.productSelected
                swal({
                  title: 'Crear ' + inventory.quantity + ' ' +
                    product.minimumUnit +
                    ' cuyo precio por cada ' +
                    product.minimumUnit + ' es ' +
                    inventory.unitCost,
                  text: 'Una vez creado no podra borrar el inventario,' +
                    'solo disminuirlo mediante ventas',
                  type: 'warning',
                  showCancelButton: true,
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                  confirmButtonText: 'Si, agregar!',
                  cancelButtonText: 'Cancelar',
                  allowOutsideClick: false
                }).then(function (result) {
                  if (result.value) {
                    createInventoryMethod(inventory, product._id)
                  }
                })
              }}
            />

            <Table responsive>
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Cantidad</th>
                  <th>Precio unitario</th>
                </tr>
              </thead>
              <tbody>
                {
                  this.props.productSelected.entries.map((entry, index) => {
                    return (
                      <tr key = { index } >
                        <td>{ entry.date }</td>
                        <td>{ entry.quantity }</td>
                        <td>{ entry.unitCost }</td>
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
                this.props.hideInventory()
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
    isVisibleOperationsInventory: state.products.isVisibleOperationsInventory,
    inventory: state.products.inventory,
    productSelected: state.products.productSelected
  }
}

const mapDispatchToProps = dispatch => {
  return {
    hideInventory(state) {
      dispatch(hideInventory(state))
    },
    createInventory(price, idProduct) {
      dispatch(createInventory(price))
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
)(OperationInventory)