import React, { Component } from 'react'

import RaisedButton from 'material-ui/RaisedButton'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { green500, black } from 'material-ui/styles/colors';
import {
  Grid,
  Row,
  Table
} from 'react-bootstrap'
import { connect } from 'react-redux'
import swal from 'sweetalert2'
import TextField from 'material-ui/TextField';

import {
  deleteProduct,
  filterProducts,
  loadProducts,
  modifyProduct,
  showCreateProduct,
  showCreatePrice,
  showCosts
} from '../actions/products'
import CreateProduct from '../containers/CreateProduct'
import CreatePrice from '../containers/CreatePrice'
import ViewCosts from '../containers/ViewCosts'

import _ from 'lodash'

import 'font-awesome/css/font-awesome.min.css';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: black,
    accent1Color: green500
  }
});

const underlineStyle =  {
  borderColor: green500
}

const floatingLabelStyle = {
  color: black
}

const buttonNewStyle = {
  marginLeft: '15px'
}

class Products extends Component {

  componentDidMount() {
    this.props.loadProducts()
  }

  render() {
    return (
      <Grid>
        <Row>
      <MuiThemeProvider muiTheme={ muiTheme }>
        <div>
          <TextField
            hintText="Descripcion del producto"
            floatingLabelText="FILTRAR PRODUCTO"
            underlineFocusStyle = { underlineStyle }
            floatingLabelStyle = { floatingLabelStyle }
            onChange = { e => this.props.filterProducts(e.target.value) }
          />
          <RaisedButton
            label = 'NUEVO'
            secondary = { true }
            style = { buttonNewStyle }
            onClick = { () =>
              this.props.showCreateProduct(true)
            }
          ></RaisedButton>
          <Table responsive>
            <thead>
              <tr className = 'text-center-header-table'>
                <th>Cantidad</th>
                <th>Paquete minimo</th>
                <th>Categoria</th>
                <th>Descripción</th>
                <th>Costo unitario</th>
                <th></th>
              </tr>
            </thead>
            <tbody className = 'row-table-selected'>
              {
                this.props.productsFiltered.map(product => {
                  return (
                    <tr key = { product._id } className = 'text-center'>
                      <td>{ product.quantity }</td>
                      <td>{ product.minimumUnit }</td>
                      <td>{ product.category }</td>
                      <td>{ product.name }</td>
                      <td>{ _.round(product.unitCost, 2) }</td>
                      <td className = 'spread-four-icons'>
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
                        } onClick = { (e) => {
                          if (product.prices.length > 0) {
                            this.props.showCosts(e.target.id)
                          }
                        }}></i>
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
          <ViewCosts />
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
    showCosts(idProduct) {
      dispatch(showCosts(idProduct))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Products)
