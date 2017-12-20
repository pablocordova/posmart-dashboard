import React, { Component } from 'react'

import RaisedButton from 'material-ui/RaisedButton'
import moment from 'moment'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
//import swal from 'sweetalert2'

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
  getBuys,
  showCompleteBuy,
  showCreateBuy
} from '../actions/buys'

import ViewBuy from './ViewBuy'

const formControlSearchStyle = {
  width: '50%',
  display: 'inline-block',
  marginLeft: '20px'
}

class Buys extends Component {

  render() {
    return (
      <MuiThemeProvider>
        <Grid>
          <Row>
            <div>
              <h2>COMPRAS</h2>
              <FormGroup>
                <ControlLabel>ID:</ControlLabel>
                <FormControl
                  type = 'text'
                  style = { formControlSearchStyle }
                  placeholder = 'Identificador'
                  onChange = { e =>
                    this.props.searchData.id = e.target.value
                  }
                />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Dia:</ControlLabel>
                <FormControl
                  type = 'date'
                  style = { formControlSearchStyle }
                  onChange = { e =>
                    this.props.searchData.day = e.target.value
                  }
                />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Empresa:</ControlLabel>
                <FormControl
                  type = 'text'
                  style = { formControlSearchStyle }
                  placeholder = 'Empresa a quien compro'
                  onChange = { e =>
                    this.props.searchData.company = e.target.value
                  }
                />
              </FormGroup>
              <RaisedButton
                label = 'Buscar'
                primary = { true }
                onClick = { () =>
                  this.props.getBuys(this.props.searchData)
                }
              ></RaisedButton>
              <RaisedButton
                label = 'Nuevo'
                primary = { true }
                onClick = { () =>
                  this.props.showCreateBuy()
                }
              ></RaisedButton>
              <Table responsive>
                <thead>
                  <tr className = 'text-center-header-table'>
                    <th>ID</th>
                    <th>Dia</th>
                    <th>Total</th>
                    <th>Empresa</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody className = 'row-table-selected'>
                  {
                    this.props.buys.map((buy, index) => {
                      return (
                        <tr key = { buy._id } className = 'text-center'>
                          <td>{ buy.id }</td>
                          <td>{ moment.utc(buy.date).format('DD/MM/YY') }</td>
                          <td>{ buy.total }</td>
                          <td>{ buy.company }</td>
                          <td className = 'spread-two-icons'>
                            <i className = 'fa fa-eye fa-lg' id = { index } onClick = { (e) =>
                              this.props.showCompleteBuy(e.target.id)
                            }></i>
                          </td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </Table>
              <ViewBuy />
            </div>
          </Row>
        </Grid>
      </MuiThemeProvider>
    )
  }

}

const mapStateToProps = state => {
  return {
    buys: state.buys.buys,
    searchData: state.buys.searchData
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getBuys(data) {
      dispatch(getBuys(data))
    },
    showCompleteBuy(indexBuy) {
      dispatch(showCompleteBuy(indexBuy))
    },
    showCreateBuy() {
      dispatch(showCreateBuy())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Buys)
