import React, { Component } from 'react'

import RaisedButton from 'material-ui/RaisedButton'
import moment from 'moment'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { green500, black } from 'material-ui/styles/colors';
import Toggle from 'material-ui/Toggle';
import swal from 'sweetalert2'

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
  deleteReceipt,
  getReceipts,
  loadCredits,
  showCompleteReceipt
} from '../actions/receipts'

import ViewReceipt from './ViewReceipt'

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: black,
    accent1Color: green500
  }
});

const formControlSearchStyle = {
  width: '50%',
  display: 'inline-block',
  marginLeft: '20px'
}

const labelSearchStyle = {
  width: '5%'
}

const detailsButtonStyle =  {
  marginTop: '10px'
}

class Receipts extends Component {

  constructor() {
    super()
    this.state = {
      showMoreDetails: false
    }
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={ muiTheme }>
        <Grid>
          <Row>
            <div>
              <FormGroup>
                <ControlLabel style = { labelSearchStyle }>ID:</ControlLabel>
                <FormControl
                  type = 'text'
                  style = { formControlSearchStyle }
                  placeholder = 'ticket id'
                  onChange = { e =>
                    this.props.searchData.id = e.target.value
                  }
                />
              </FormGroup>
              <FormGroup>
                <ControlLabel style = { labelSearchStyle }>Dia:</ControlLabel>
                <FormControl
                  type = 'date'
                  style = { formControlSearchStyle }
                  onChange = { e =>
                    this.props.searchData.day = e.target.value
                  }
                />
              </FormGroup>
              <FormGroup>
                <ControlLabel style = { labelSearchStyle }>Cliente:</ControlLabel>
                <FormControl
                  type = 'text'
                  style = { formControlSearchStyle }
                  placeholder = 'Nombre del cliente'
                  onChange = { e =>
                    this.props.searchData.client = e.target.value
                  }
                />
              </FormGroup>
              <FormGroup>
                <ControlLabel style = { labelSearchStyle }>Vendedor:</ControlLabel>
                <FormControl
                  type = 'text'
                  style = { formControlSearchStyle }
                  placeholder = 'Nombre del vendedor'
                  onChange = { e =>
                    this.props.searchData.seller = e.target.value
                  }
                />
              </FormGroup>
              <FormGroup>
                <ControlLabel style = { labelSearchStyle }>Total:</ControlLabel>
                <FormControl
                  type = 'number'
                  style = { formControlSearchStyle }
                  placeholder = 'Total venta'
                  onChange = { e =>
                    this.props.searchData.total = e.target.value
                  }
                />
              </FormGroup>
              <FormGroup>
                <ControlLabel style = { labelSearchStyle }>Estado:</ControlLabel>
                <FormControl
                  componentClass = 'select'
                  style = { formControlSearchStyle }
                  defaultValue = 'todos'
                  onChange = { e =>
                    this.props.searchData.state = e.target.value
                  }
                >
                  <option value = 'all' key = 'all'>Todos</option>
                  <option value = 'Pendiente' key = 'Pendiente'>Pendiente</option>
                  <option value = 'Pagado' key = 'Pagado'>Pagado</option>
                  <option value = 'Credito' key = 'Credito'>Credito</option>
                </FormControl>
              </FormGroup>
              <RaisedButton
                label = 'Buscar'
                secondary = { true }
                onClick = { () =>
                  this.props.getReceipts(this.props.searchData)
                }
              ></RaisedButton>
              <div>
                <Toggle
                  label = 'Mas detalles'
                  style = { detailsButtonStyle }
                  labelPosition = 'right'
                  onToggle = { (event, isInputChecked) => {
                    this.setState({
                      showMoreDetails: isInputChecked
                    })
                  }}
                />
               </div>
              <div hidden = { !this.state.showMoreDetails }>
                <div>
                  Nro. Ventas con deudas:
                  {
                    this.props.numSaleDebts
                  }
                </div>
                <div>
                  Total Ventas con deudas:
                  {
                    this.props.totalSaleDebts
                  }
                </div>
              </div>
              <Table responsive>
                <thead>
                  <tr className = 'text-center-header-table'>
                    <th>ID</th>
                    <th>Fecha</th>
                    <th>Hora</th>
                    <th>Cliente</th>
                    <th>Vendedor</th>
                    <th>Total</th>
                    <th>Estado</th>
                    <th hidden = { !this.state.showMoreDetails }>Saldo</th>
                    <th hidden = { !this.state.showMoreDetails }>Deuda</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody className = 'row-table-selected'>
                  {
                    this.props.sales.map(sale => {
                      return (
                        <tr key = { sale._id } className = 'text-center'>
                          <td>{ String(sale._id).substring(0, 8) }</td>
                          <td>{ moment.utc(sale.date).format('DD/MM/YY') }</td>
                          <td>{ moment.utc(sale.date).format('hh:mm:ss a') }</td>
                          <td>{ sale.client }</td>
                          <td>{ sale.seller }</td>
                          <td>{ sale.total }</td>
                          <td className = {
                            (
                              sale.state === 'Pagado' ?
                              'green-color-bold' :
                              (sale.state === 'Credito' ? 'red-color-bold' : '')
                            )
                          }>
                            { sale.state }</td>
                          <td hidden = { !this.state.showMoreDetails }>{ sale.paidDebt }</td>
                          <td hidden = { !this.state.showMoreDetails }>{ sale.restDebt }</td>
                          <td className = 'spread-two-icons'>
                            <i className = 'fa fa-eye fa-lg' id = { sale._id } onClick = { (e) =>
                              this.props.showCompleteReceipt(e.target.id)
                            }></i>
                            <i className = 'fa fa-trash fa-lg' id = { sale._id } onClick = { (e) => {
                              let deleteReceiptMethod = this.props.deleteReceipt
                              let idSale = e.target.id
                              let searchAfterDelete = this.props.searchData
                              swal({
                                title: 'Esta seguro de eliminar esta venta?',
                                text: 'No será posible recuperarlo después!',
                                type: 'warning',
                                showCancelButton: true,
                                confirmButtonColor: '#3085d6',
                                cancelButtonColor: '#d33',
                                confirmButtonText: 'Si, borrarlo!',
                                cancelButtonText: 'Cancelar'
                              }).then(function (result) {
                                if (result.value) {
                                  deleteReceiptMethod(idSale, searchAfterDelete)
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
              <ViewReceipt />
            </div>
          </Row>
        </Grid>
      </MuiThemeProvider>
    )
  }

}

const mapStateToProps = state => {
  console.log(state.receipts.sales)
  return {
    numSaleDebts: state.receipts.numSaleDebts,
    totalSaleDebts: state.receipts.totalSaleDebts,
    sales: state.receipts.sales,
    searchData: state.receipts.searchData
  }
}

const mapDispatchToProps = dispatch => {
  return {
    deleteReceipt(idReceipt, searchAfterDelete) {
      dispatch(deleteReceipt(idReceipt))
        .then(() => dispatch(getReceipts(searchAfterDelete)))
    },
    getReceipts(data) {
      dispatch(getReceipts(data))
    },
    showCompleteReceipt(idReceipt) {
      dispatch(showCompleteReceipt(idReceipt))
        .then(() => dispatch(loadCredits(idReceipt)))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Receipts)
