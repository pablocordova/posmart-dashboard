
// -- Exteral modules

// Main module
import React, { Component } from 'react'
// Other modules
import { Modal, Table } from 'react-bootstrap'
import { connect } from 'react-redux'
import {
  FormControl,
  FormGroup,
  ControlLabel
} from 'react-bootstrap'

//import moment from 'moment'
import RaisedButton from 'material-ui/RaisedButton'
//import _ from 'lodash'

// -- Own Modules
import {
  addProductBuy,
  changeCompanyViewBuy,
  changeDateViewBuy,
  changeIdViewBuy,
  deleteProductItem,
  hideCompleteBuy,
  saveBuy,
  updatePrices
} from '../actions/buys'

import swal from 'sweetalert2'

const columnStyle = {
  width: '130px'
}

const headerModalStyle = {
  textAlign: 'center',
  background: '#000000',
  color: 'white',
  paddingBottom: '10px',
  paddingTop: '15px'
}

class ViewBuy extends Component {

  constructor() {
    super()
    this.state = {
      MeasureRealIndex: 0,
      validation: {
        quantity: null,
        total: null
      }
    }
  }

  cleanValidations() {
    this.setState(prevState  => ({
      validation: {
        ...prevState.validation,
        quantity: null,
        total: null
      }
    }))
  }

  render() {
    return (
      <div>
        <Modal bsSize = 'large' show = { this.props.isVisibleFormBuy }>
          <Modal.Header style = { headerModalStyle}>
            <Modal.Title>COMPRA
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormGroup>
              <ControlLabel>ID:&ensp;</ControlLabel>
              <label hidden = { !this.props.onlyShowBuy }>{ this.props.buySelected.id }</label>
              <label hidden = { this.props.onlyShowBuy }>
                <FormControl
                  type = 'text'
                  value = { this.props.idViewBuy }
                  onChange = { e =>
                    this.props.changeIdViewBuy(e.target.value)
                  }
                />
              </label>
            </FormGroup>
            <FormGroup>
              <ControlLabel>Dia:&ensp;</ControlLabel>
              <label hidden = { !this.props.onlyShowBuy }>{ this.props.buySelected.date }</label>
              <label hidden = { this.props.onlyShowBuy }>
                <FormControl
                  type = 'date'
                  value = { this.props.dateViewBuy }
                  onChange = { e =>
                    this.props.changeDateViewBuy(e.target.value)
                  }
                />
              </label>
            </FormGroup>
            <FormGroup>
              <ControlLabel>Empresa:&ensp;</ControlLabel>
              <label hidden = { !this.props.onlyShowBuy }>{ this.props.buySelected.company }</label>
              <label hidden = { this.props.onlyShowBuy }>
                <FormControl
                  type = 'text'
                  value = { this.props.companyViewBuy }
                  onChange = { e =>
                    this.props.changeCompanyViewBuy(e.target.value)
                  }
                />
              </label>
            </FormGroup>
            <Table responsive>
              <thead>
                <tr className = 'text-center-header-table'>
                  <th>Descripcion</th>
                  <th style = { columnStyle }>Cantidad</th>
                  <th style = { columnStyle }>Medida</th>
                  <th style = { columnStyle }>Total</th>
                  <th hidden = { this.props.onlyShowBuy } ></th>
                </tr>
              </thead>
              <tbody>
                <tr key = { 1 } hidden = { this.props.onlyShowBuy } >
                  <td>
                    <FormControl
                      componentClass = 'select'
                      onChange = { e => {
                        this.setState({
                          MeasureRealIndex: 0
                        })
                        this.props.formChoseProduct.itemsPricesChosen =
                        this.props.allProducts[e.target.value].prices[0].items
                        this.props.formChoseProduct.measure =
                        this.props.allProducts[e.target.value].prices[0].name
                        this.props.formChoseProduct.pricesProductChosen =
                        this.props.allProducts[e.target.value].prices
                        this.props.formChoseProduct.idProductChosen =
                        this.props.allProducts[e.target.value]._id
                        this.props.formChoseProduct.description =
                        this.props.allProducts[e.target.value].name

                        this.props.updatePrices(this.props.allProducts[e.target.value].prices)
                      }}
                    >
                      {
                        this.props.allProducts.map((product, index) => {
                          return (
                            <option
                              value = { index } key = { index }
                            >
                              { product.name }
                            </option>
                          )
                        })
                      }
                    </FormControl>
                  </td>
                  <td>
                    <FormGroup validationState = { this.state.validation.quantity }>
                      <FormControl
                        type = 'number'
                        onChange = { e => {
                        // Validations
                          let stateQuantity = null
                          if (e.target.value <= 0) {
                            stateQuantity = 'error'
                          }
                          this.setState(prevState  => ({
                            validation: {
                              ...prevState.validation,
                              quantity: stateQuantity
                            }
                          }))
                          //
                          this.props.formChoseProduct.quantity = e.target.value
                        }}
                      />
                    </FormGroup>
                  </td>
                  <td>
                    <FormControl
                      componentClass = 'select'
                      value = { this.state.MeasureRealIndex }
                      onChange = { e => {
                        this.setState({
                          MeasureRealIndex: e.target.value
                        })
                        this.props.formChoseProduct.itemsPricesChosen =
                        this.props.formChoseProduct.pricesProductChosen[e.target.value].items
                        this.props.formChoseProduct.measure =
                        this.props.formChoseProduct.pricesProductChosen[e.target.value].name
                      }}
                    >
                      {
                        this.props.formChoseProduct.pricesProductChosen.map((price, index) => {
                          return (
                            <option
                              value = { index } key = { index }
                            >
                              { price.name }
                            </option>
                          )
                        })
                      }
                    </FormControl>
                  </td>
                  <td>
                    <FormGroup validationState = { this.state.validation.total }>
                      <FormControl
                        type = 'number'
                        onChange = { e => {
                        //
                          let stateTotal = null
                          if (e.target.value <= 0) {
                            stateTotal = 'error'
                          }
                          this.setState(prevState  => ({
                            validation: {
                              ...prevState.validation,
                              total: stateTotal
                            }
                          }))
                          //
                          this.props.formChoseProduct.total = e.target.value
                        }}
                      />
                    </FormGroup>
                  </td>
                  <td hidden = { this.props.onlyShowBuy } >
                    <RaisedButton
                      label = '+'
                      secondary = { true }
                      onClick = { () => {

                        const quantity = this.state.validation.quantity
                        const total = this.state.validation.total
                        const quantityForm = this.props.formChoseProduct.quantity
                        const totalForm = this.props.formChoseProduct.total
                        // Only if there are not error in forms
                        if (quantityForm <= 0) {
                          this.setState(prevState  => ({
                            validation: {
                              ...prevState.validation,
                              quantity: 'error'
                            }
                          }))
                        }

                        if (totalForm <= 0) {
                          this.setState(prevState  => ({
                            validation: {
                              ...prevState.validation,
                              total: 'error'
                            }
                          }))
                        }

                        if (quantityForm > 0 && totalForm > 0 &&quantity !== 'error' &&
                        total !== 'error')
                        {
                          this.props.addProductBuy(
                            this.props.formChoseProduct
                          )
                        }

                      }}
                    ></RaisedButton>
                  </td>
                </tr>
                {
                  this.props.productsBuy.map((product, index) => {
                    return (
                      <tr key = { index } className = 'text-center'>
                        <td>{ product.description }</td>
                        <td>{ product.quantity }</td>
                        <td>{ product.measure }</td>
                        <td>{ product.total }</td>
                        <td hidden = { this.props.onlyShowBuy } >
                          <i className = 'fa fa-trash fa-lg' id = { index } onClick = { e =>
                            this.props.deleteProductItem(e.target.id)
                          }
                          ></i>
                        </td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </Table>
            <div className = 'pull-right'>
              <label>TOTAL: { this.props.totalViewBuy }</label>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <label hidden = { this.props.onlyShowBuy }>
              <RaisedButton
                label = 'GUARDAR'
                secondary = { true }
                disabled = { this.props.productsBuy.length === 0 }
                onClick = { () => {
                  let saveBuyMethod = this.props.saveBuy
                  let hideCompleteBuyMethod = this.props.hideCompleteBuy
                  this.cleanValidations()
                  // Reset
                  this.setState({
                    MeasureRealIndex: 0
                  })
                  this.props.formChoseProduct.itemsPricesChosen =
                    this.props.formChoseProduct.pricesProductChosen[0].items
                  this.props.formChoseProduct.measure =
                    this.props.formChoseProduct.pricesProductChosen[0].name
                  //--------------------------
                  let id = this.props.idViewBuy
                  let date = this.props.dateViewBuy
                  let company = this.props.companyViewBuy
                  let total = this.props.totalViewBuy
                  let product = this.props.productsBuy
                  swal({
                    title: 'Ha revizado que todo este correcto?',
                    text: 'No será posible borralo después',
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Si, Guardarlo!',
                    cancelButtonText: 'Cancelar'
                  }).then(function (result) {
                    if (result.value) {
                      saveBuyMethod(
                        id,
                        date,
                        company,
                        total,
                        product
                      )
                      hideCompleteBuyMethod()
                    }
                  })
                }}
              />
            </label>
            <RaisedButton
              label = 'CANCELAR'
              onClick = { () => {
                this.props.hideCompleteBuy()
                this.cleanValidations()
                this.setState({
                  MeasureRealIndex: 0
                })
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
    allProducts: state.buys.allProducts,
    buySelected: state.buys.buySelected,
    isVisibleFormBuy: state.buys.isVisibleFormBuy,
    productsBuy: state.buys.productsBuy,
    idViewBuy:  state.buys.idViewBuy,
    dateViewBuy: state.buys.dateViewBuy,
    companyViewBuy: state.buys.companyViewBuy,
    onlyShowBuy: state.buys.onlyShowBuy,
    totalViewBuy: state.buys.totalViewBuy,
    formChoseProduct: state.buys.formChoseProduct
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addProductBuy(allForm) {
      dispatch(addProductBuy(allForm))
    },
    changeCompanyViewBuy(text) {
      dispatch(changeCompanyViewBuy(text))
    },
    changeDateViewBuy(text) {
      dispatch(changeDateViewBuy(text))
    },
    changeIdViewBuy(text) {
      dispatch(changeIdViewBuy(text))
    },
    deleteProductItem(index) {
      dispatch(deleteProductItem(index))
    },
    hideCompleteBuy() {
      dispatch(hideCompleteBuy())
    },
    saveBuy(id, date, company, total, products) {
      dispatch(saveBuy(id, date, company, total, products))
    },
    updatePrices(prices) {
      dispatch(updatePrices(prices))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewBuy)