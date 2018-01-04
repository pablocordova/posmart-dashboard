
// -- Exteral modules

// Main module
import React, { Component } from 'react'
// Other modules
import { Modal, Table } from 'react-bootstrap'
import { connect } from 'react-redux'
import {
  ControlLabel,
  FormGroup,
  FormControl
} from 'react-bootstrap'

import moment from 'moment'
import RaisedButton from 'material-ui/RaisedButton'
import _ from 'lodash'

// -- Own Modules
import {
  addAdvancePay,
  deleteCredit,
  getReceipts,
  hideCompleteReceipt,
  loadCredits,
  printSale,
  updateStateSale,
  visibleFormDebt
} from '../actions/receipts'

const selectStateStyle = {
  width: '25%',
  display: 'inline-block',
  marginLeft: '20px'
}

const headerModalStyle = {
  textAlign: 'center',
  background: '#000000',
  color: 'white',
  paddingBottom: '10px',
  paddingTop: '15px'
}

class ViewReceipt extends Component {

  constructor() {
    super()
    this.state = {
      datePay: moment().format('YYYY-MM-DD'),
      amountPay: 0
    }
  }

  render() {
    return (
      <div>
        <Modal show = { this.props.isVisibleCompleteReceipt }>
          <Modal.Header style = { headerModalStyle}>
            <Modal.Title>NOTA DE VENTA
              <RaisedButton
                label = 'IMPRIMIR'
                className = 'pull-right'
                onClick = { () => {
                  this.props.printSale(this.props.saleSelected._id)
                  this.props.hideCompleteReceipt()
                }}
              ></RaisedButton>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>Vendedor: { this.props.saleSelected.seller }</div>
            <div>Fecha: { moment.utc(this.props.saleSelected.date).format('DD/MM/YY') }</div>
            <div>Hora: { moment.utc(this.props.saleSelected.date).format('hh:mm:ss a') }</div>
            <div>Cliente: { this.props.saleSelected.client.name }</div>
            <h3>TOTAL: { this.props.saleSelected.total }</h3>
            <FormGroup>
              <ControlLabel>Estado:</ControlLabel>
              <FormControl
                componentClass = 'select'
                value = { this.props.stateSale }
                style = { selectStateStyle }
                onChange = { e => {
                  let status = false
                  if (e.target.value === 'Credito') {
                    status = true
                  }
                  this.props.visibleFormDebt(status, e.target.value)
                  this.props.updateStateSale(this.props.saleSelected._id, e.target.value)
                }
                }
              >
                <option value = 'Pendiente' key = 'Pendiente'>Pendiente</option>
                <option value = 'Pagado' key = 'Pagado'>Pagado</option>
                <option value = 'Credito' key = 'Credito'>Credito</option>
              </FormControl>
            </FormGroup>
            <div hidden = { !this.props.isVisibleFormDebt }>
              <Table responsive>
                <thead>
                  <tr className = 'text-center-header-table'>
                    <th>Fecha</th>
                    <th>Monto</th>
                    <th className = 'red-color'>
                      <h4>
                        {
                          _.round(parseFloat(this.props.saleSelected.total) -
                            this.props.sumCredits, 1)
                        }
                      </h4>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr key = { 1 }>
                    <td>
                      <FormControl
                        type = 'date'
                        defaultValue = { moment().format('YYYY-MM-DD') }
                        onChange = { e => {
                          this.setState({
                            datePay: e.target.value
                          })
                        }}
                      />
                    </td>
                    <td>
                      <FormControl
                        type = 'number'
                        placeholder = 'Adelanto'
                        onChange = { e =>
                          this.setState({
                            amountPay: e.target.value
                          })
                        }
                      />
                    </td>
                    <td>
                      <RaisedButton
                        label = 'Agregar'
                        secondary = { true }
                        onClick = { () => {
                          this.props.addAdvancePay(
                            this.state.datePay,
                            this.state.amountPay,
                            this.props.saleSelected._id
                          )
                        }}
                      ></RaisedButton>
                    </td>
                  </tr>
                  {
                    this.props.saleSelectedCredits.map((credit, index) => {
                      return (
                        <tr key = { index } className = 'text-center'>
                          <td>{ credit.date.split('T')[0] }</td>
                          <td>{ credit.amount }</td>
                          <td>
                            <i className = 'fa fa-trash fa-lg' id = { index } onClick = { e =>
                              this.props.deleteCredit(this.props.saleSelected._id, e.target.id)
                            }
                            ></i>
                          </td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </Table>
            </div>
            <Table responsive>
              <thead>
                <tr>
                  <th>Cant.</th>
                  <th>Med.</th>
                  <th>Descripcion</th>
                  <th>P.Unit</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {
                  this.props.saleSelected.products.map(product => {
                    let unitPrice = product.total / product.quantity;
                    return (
                      <tr key = { product.id } >
                        <td>{ product.quantity }</td>
                        <td>{ product.measure }</td>
                        <td>{ product.name }</td>
                        <td>{ _.round(unitPrice, 2) }</td>
                        <td>{ product.total }</td>
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
              secondary = { true }
              onClick = { () => {
                this.props.hideCompleteReceipt()
                this.setState({
                  datePay: moment().format('YYYY-MM-DD'),
                  amountPay: 0
                })
                // Make the search again
                this.props.getReceipts(this.props.dataToSearch)
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
    isVisibleCompleteReceipt: state.receipts.isVisibleCompleteReceipt,
    saleSelected: state.receipts.saleSelected,
    saleSelectedCredits: state.receipts.saleSelectedCredits,
    isVisibleFormDebt: state.receipts.isVisibleFormDebt,
    stateSale: state.receipts.stateSale,
    sumCredits: state.receipts.sumCredits,
    dataToSearch: state.receipts.dataToSearch
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addAdvancePay(date, amount, idSale) {
      dispatch(addAdvancePay(date, amount, idSale))
        .then(() => dispatch(loadCredits(idSale)))
    },
    deleteCredit(idSale, index) {
      dispatch(deleteCredit(idSale, index))
        .then(() => dispatch(loadCredits(idSale)))
    },
    getReceipts(data) {
      dispatch(getReceipts(data))
    },
    hideCompleteReceipt() {
      dispatch(hideCompleteReceipt())
    },
    printSale(idReceipt) {
      dispatch(printSale(idReceipt))
    },
    updateStateSale(idSale, state) {
      dispatch(updateStateSale(idSale, state))
    },
    visibleFormDebt(state, option) {
      dispatch(visibleFormDebt(state, option))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewReceipt)