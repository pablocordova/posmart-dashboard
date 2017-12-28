import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import _ from 'lodash'
import { Bar } from 'react-chartjs-2';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import RaisedButton from 'material-ui/RaisedButton'
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { green500, black } from 'material-ui/styles/colors';

import {
  ControlLabel,
  FormControl,
  Table
} from 'react-bootstrap'

import {
  getAnalizeEarning
} from '../actions/reports'

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: black,
    accent1Color: green500
  }
});

class Earnings extends Component {

  constructor() {
    super()
    // Inial variables for search
    this.state = {
      from: moment().format('YYYY-MM-DD'),
      to: moment().format('YYYY-MM-DD'),
      type: 'client'
    }
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={ muiTheme }>
        <div>
          <div className = 'text-center'>
            <div className = 'options-reports'>
              <ControlLabel>Desde:&ensp;</ControlLabel>
              <label>
                <FormControl
                  type = 'date'
                  defaultValue = { moment().format('YYYY-MM-DD')}
                  onChange = { e => {
                    this.setState({
                      from: e.target.value
                    })
                  }}
                />
              </label>
            </div>
            <div className = 'options-reports'>
              <ControlLabel>Hasta:&ensp;</ControlLabel>
              <label>
                <FormControl
                  type = 'date'
                  defaultValue = { moment().format('YYYY-MM-DD')}
                  onChange = { e => {
                    this.setState({
                      to: e.target.value
                    })
                  }}
                />
              </label>
            </div>
            <div className = 'options-reports'>
              <ControlLabel>Tipo:&ensp;</ControlLabel>
              <label>
                <FormControl
                  componentClass = 'select'
                  onChange = { e => {
                    this.setState({
                      type: e.target.value
                    })
                  }}
                >
                  <option value = 'client'>Cliente</option>
                  <option value = 'sale'>Venta</option>
                </FormControl>
              </label>
            </div>
            <div className = 'options-reports'>
              <RaisedButton
                label = 'ANALIZAR'
                secondary = { true }
                onClick = { () => {
                  this.props.getAnalizeEarning(this.state.from, this.state.to, this.state.type)
                }}
              />
            </div>
          </div>
          <h2>TOTAL: { _.round(this.props.totalEarnBy, 2) }</h2>
          <Bar
            data = { this.props.dataGraph }
            width = { 100 }
            height = { 50 }
            options = {{
              maintainAspectRatio: true
            }}
          />
          <Table responsive>
            <thead>
              <tr className = 'text-center-header-table'>
                <th>Nro.</th>
                <th hidden = { this.props.typeBy !== 'sale' } >Fecha</th>
                <th hidden = { this.props.typeBy !== 'sale' }>Estado</th>
                <th>Cliente</th>
                <th>Ganancia</th>
              </tr>
            </thead>
            <tbody className = 'row-table-selected'>
              {
                this.props.earningsBy.map((earningBy, index) => {
                  return (
                    <tr key = { index } className = 'text-center'>
                      <td>{ index + 1 }</td>
                      <td
                        hidden = { this.props.typeBy !== 'sale' }
                      >
                        { moment(earningBy.date).format('DD/MM/YY') }
                      </td>
                      <td
                        hidden = { this.props.typeBy !== 'sale' }
                      >
                        { earningBy.state }
                      </td>
                      <td>{ earningBy.client }</td>
                      <td>{ earningBy.total }</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </Table>
        </div>
      </MuiThemeProvider>
    )
  }

}

const mapStateToProps = state => {
  return {
    earningsBy: state.reports.earningsBy,
    totalEarnBy: state.reports.totalEarnBy,
    typeBy: state.reports.typeBy,
    dataGraph: state.reports.dataGraph
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAnalizeEarning(dateFrom, dateTo ,type) {
      dispatch(getAnalizeEarning(dateFrom, dateTo ,type))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Earnings)
