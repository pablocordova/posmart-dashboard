import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import _ from 'lodash'
import { VictoryBar, VictoryChart, VictoryTheme } from 'victory';

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

          <RaisedButton
            label = 'ANALIZAR'
            secondary = { true }
            onClick = { e => {
              this.props.getAnalizeEarning(this.state.from, this.state.to, this.state.type)
            }}
          />

          <h2>TOTAL: { _.round(this.props.totalEarnBy, 2) }</h2>
          <VictoryChart
            domainPadding = { 20 }
            theme = { VictoryTheme.material }
          >
            <VictoryBar
              data = { this.props.dataGraph }
              // data accessor for x values
              x = { this.props.nameTypeBy }
              // data accessor for y values
              y = 'Ganancia'
            />
          </VictoryChart>
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
    nameTypeBy: state.reports.nameTypeBy,
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
