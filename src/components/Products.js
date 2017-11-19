import React, { Component } from 'react'

import RaisedButton from 'material-ui/RaisedButton'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {
  Table,
  FormGroup,
  FormControl
} from 'react-bootstrap'
import { connect } from 'react-redux'
import { showCreateProduct, loadProducts, filterProducts, modifyProduct } from '../actions/products'
import CreateProduct from '../containers/CreateProduct'

import 'font-awesome/css/font-awesome.min.css';

class Products extends Component {

  componentDidMount() {
    this.props.loadProducts()
  }

  render() {
    return (
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
          <RaisedButton
            label = 'NUEVO'
            primary = { true }
            onClick = { () =>
              this.props.showCreateProduct(true)
            }
          ></RaisedButton>
          <Table responsive>
            <thead>
              <tr>
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
                    <tr key = { product._id } >
                      <td>{ product.quantity }</td>
                      <td>{ product.minimumUnit }</td>
                      <td>{ product.category }</td>
                      <td>{ product.name }</td>
                      <td>{ product.unitCost }</td>
                      <td>
                        <i className = 'fa fa-pencil' id = { product._id } onClick = { (e) =>
                          this.props.modifyProduct(e.target.id)
                        }></i>
                        <i className = 'fa fa-usd' id = { product._id } onClick = { (e) =>
                          this.props.createNewPrice(e.target.id)
                        }></i>
                        <i className = 'fa fa-cart-plus' id = { product._id } onClick = { (e) =>
                          this.props.addInventory(e.target.id)
                        }></i>
                        <i className = 'fa fa-trash' id = { product._id } onClick = { (e) =>
                          this.props.deleteProduct(e.target.id)
                        }></i>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </Table>
          <CreateProduct />
        </div>
      </MuiThemeProvider>
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
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Products)
