import React, { Component } from 'react'

import RaisedButton from 'material-ui/RaisedButton'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {
  Table,
  FormGroup,
  FormControl
} from 'react-bootstrap'
import { connect } from 'react-redux'
import { showCreateProduct } from '../actions/products'
import CreateProduct from '../containers/CreateProduct'

import 'font-awesome/css/font-awesome.min.css';

class Products extends Component {

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <h2>PRODUCTS</h2>
          <FormGroup>
            <FormControl
              type = 'text'
              placeholder = 'Buscar producto'
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
              <tr key = {1}>
                <td>2</td>
                <td>Saco</td>
                <td>Magia Blandca 333</td>
                <td>23.2</td>
                <td>46.4</td>
                <td>
                  <i className = 'fa fa-pencil'></i>
                  <i className = 'fa fa-usd'></i>
                  <i className = 'fa fa-cart-plus'></i>
                  <i className = 'fa fa-trash'></i>
                </td>
              </tr>
            </tbody>
          </Table>
          <CreateProduct />
        </div>
      </MuiThemeProvider>
    )
  }

}

const mapStateToProps = state => {
  return state
}

const mapDispatchToProps = dispatch => {
  return {
    showCreateProduct(state) {
      dispatch(showCreateProduct(state))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Products)
