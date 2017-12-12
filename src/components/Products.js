import React, { Component } from 'react'

import RaisedButton from 'material-ui/RaisedButton'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {
  FormControl,
  FormGroup,
  Grid,
  Row,
  Table
} from 'react-bootstrap'
import { connect } from 'react-redux'
import swal from 'sweetalert2'

import {
  deleteProduct,
  filterProducts,
  loadProducts,
  modifyProduct,
  showCreateProduct,
  showCreatePrice,
  showInventory
} from '../actions/products'
import CreateProduct from '../containers/CreateProduct'
import CreatePrice from '../containers/CreatePrice'
import OperationsInventory from '../containers/OperationsInventory'

import 'font-awesome/css/font-awesome.min.css';
import '../styles/Products.css'

class Products extends Component {

  componentDidMount() {
    this.props.loadProducts()
  }

  render() {
    return (
      <Grid>
        <Row>
      <MuiThemeProvider>
        <div>
          <h2>PRODUCTS</h2>
          <FormGroup>
            <FormControl
              type = 'text'
              placeholder = 'Buscar producto'
              onChange = { e =>
                this.props.filterProducts(e.target.value)
              }
            />
          </FormGroup>
          <FormGroup>
            <RaisedButton
              label = 'NUEVO'
              primary = { true }
              onClick = { () =>
                this.props.showCreateProduct(true)
              }
            ></RaisedButton>
          </FormGroup>
          <Table responsive>
            <thead>
              <tr className = 'center-text-head'>
                <th>Cantidad</th>
                <th>Paquete minimo</th>
                <th>Categoria</th>
                <th>Descripción</th>
                <th>Costo unitario</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {
                this.props.productsFiltered.map(product => {
                  return (
                    <tr key = { product._id } className = 'center-text'>
                      <td>{ product.quantity }</td>
                      <td>{ product.minimumUnit }</td>
                      <td>{ product.category }</td>
                      <td>{ product.name }</td>
                      <td>{ product.unitCost }</td>
                      <td className = 'spread-items'>
                        <i className = 'fa fa-pencil fa-lg' id = { product._id } onClick = { (e) =>
                          this.props.modifyProduct(e.target.id)
                        }></i>
                        <i className = {
                          'fa fa-usd fa-lg ' +
                          (product.prices.length > 0 ? 'green-color' : 'red-color')
                        } id = { product._id } onClick = { (e) =>
                          this.props.showCreatePrice(e.target.id)
                        }></i>
                        <i className = 'fa fa-cart-plus fa-lg' id = {
                          product._id
                        } onClick = { (e) =>
                          this.props.showInventory(e.target.id)
                        }></i>
                        <i className = 'fa fa-trash fa-lg' id = { product._id } onClick = { (e) => {
                          let deleteProductMethod = this.props.deleteProduct
                          let idProduct = e.target.id
                          swal({
                            title: 'Esta seguro de eliminar el producto?',
                            text: 'No será posible recuperarlo después!',
                            type: 'warning',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Si, borrarlo!',
                            cancelButtonText: 'Cancelar'
                          }).then(function (result) {
                            if (result.value) {
                              deleteProductMethod(idProduct)
                            }
                          })
                        }}
                        ></i>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </Table>
          <CreateProduct />
          <CreatePrice />
          <OperationsInventory />
        </div>
      </MuiThemeProvider>
        </Row>
      </Grid>
    )
  }

}

const mapStateToProps = state => {
  return {
    products: state.products.products,
    productsFiltered: state.products.productsFiltered
  }
}

const mapDispatchToProps = dispatch => {
  return {
    deleteProduct(idProduct) {
      dispatch(deleteProduct(idProduct))
        .then(() =>dispatch(loadProducts()))
    },
    modifyProduct(idProduct) {
      dispatch(modifyProduct(idProduct))
    },
    filterProducts(string) {
      dispatch(filterProducts(string))
    },
    loadProducts() {
      dispatch(loadProducts())
    },
    showCreateProduct(state) {
      dispatch(showCreateProduct(state))
    },
    showCreatePrice(idProduct) {
      dispatch(showCreatePrice(idProduct))
    },
    showInventory(idProduct) {
      dispatch(showInventory(idProduct))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Products)
