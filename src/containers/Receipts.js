import React, { Component } from 'react'

import RaisedButton from 'material-ui/RaisedButton'
import moment from 'moment'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import {
  ControlLabel,
  Table,
  FormGroup,
  FormControl,
  Grid,
  Row
} from 'react-bootstrap'
import { connect } from 'react-redux'

import 'font-awesome/css/font-awesome.min.css';

// -- Own Modules
import {
  getReceipts,
  showCompleteReceipt
} from '../actions/receipts'

import ViewReceipt from './ViewReceipt'
import '../styles/Receipts.css'

class Receipts extends Component {

  render() {
    return (
      <MuiThemeProvider>
        <Grid>
          <Row>
            <div>
              <h2>RECIBOS</h2>
              <FormGroup>
                <ControlLabel>ID:</ControlLabel>
                <FormControl
                  type = 'text'
                  placeholder = 'ticket id'
                  onChange = { e =>
                    this.props.searchData.id = e.target.value
                  }
                />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Dia:</ControlLabel>
                <FormControl
                  type = 'date'
                  onChange = { e =>
                    this.props.searchData.day = e.target.value
                  }
                />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Cliente:</ControlLabel>
                <FormControl
                  type = 'text'
                  placeholder = 'Nombre del cliente'
                  onChange = { e =>
                    this.props.searchData.client = e.target.value
                  }
                />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Vendedor:</ControlLabel>
                <FormControl
                  type = 'text'
                  placeholder = 'Nombre del vendedor'
                  onChange = { e =>
                    this.props.searchData.seller = e.target.value
                  }
                />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Total:</ControlLabel>
                <FormControl
                  type = 'number'
                  placeholder = 'Total venta'
                  onChange = { e =>
                    this.props.searchData.total = e.target.value
                  }
                />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Estado:</ControlLabel>
                <FormControl
                  componentClass = 'select'
                  defaultValue = 'todos'
                  onChange = { e =>
                    this.props.searchData.state = e.target.value
                  }
                >
                  <option value = 'all' key = 'all'>todos</option>
                  <option value = 'pending' key = 'pending'>pendiente</option>
                  <option value = 'paid' key = 'paid'>pagado</option>
                  <option value = 'debt' key = 'debt'>deuda</option>
                </FormControl>
              </FormGroup>
              <RaisedButton
                label = 'Buscar'
                primary = { true }
                onClick = { () =>
                  this.props.getReceipts(this.props.searchData)
                }
              ></RaisedButton>
              <Table responsive>
                <thead>
                  <tr className = 'center-text-head'>
                    <th>ID</th>
                    <th>Fecha</th>
                    <th>Hora</th>
                    <th>Cliente</th>
                    <th>Vendedor</th>
                    <th>Total</th>
                    <th>Estado</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {
                    this.props.sales.map(sale => {
                      return (
                        <tr key = { sale._id } className = 'center-text'>
                          <td>{ String(sale._id).substring(0, 8) }</td>
                          <td>{ moment.utc(sale.date).format('DD/MM/YY') }</td>
                          <td>{ moment.utc(sale.date).format('hh:mm:ss a') }</td>
                          <td>{ sale.client }</td>
                          <td>{ sale.seller }</td>
                          <td>{ sale.total }</td>
                          <td>{ sale.state }</td>
                          <td className = 'spread-items'>
                            <i className = 'fa fa-eye fa-lg' id = { sale._id } onClick = { (e) =>
                              this.props.showCompleteReceipt(e.target.id)
                            }></i>
                          </td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </Table>
              <ViewReceipt />
            </div>
          </Row>
        </Grid>
      </MuiThemeProvider>
    )
  }

}

const mapStateToProps = state => {
  return {
    sales: state.receipts.sales,
    searchData: state.receipts.searchData
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getReceipts(data) {
      dispatch(getReceipts(data))
    },
    showCompleteReceipt(idReceipt) {
      dispatch(showCompleteReceipt(idReceipt))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Receipts)
