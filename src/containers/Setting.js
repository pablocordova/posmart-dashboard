import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'

import { getTokenGoogle, getUrlGoogleToken } from '../actions/settings'

class Setting extends Component {

  componentDidMount() {
    this.props.getUrlGoogleToken()
  }

  render() {
    return (
      <div>
        <Button
          bsStyle = "primary"
          onClick = { () =>
            this.props.getTokenGoogle()
          }
        >
          Login
        </Button>
      </div>
    )
  }

}

const mapStateToProps = state => {
  return {
    state: state
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getUrlGoogleToken() {
      dispatch(getUrlGoogleToken())
    },
    getTokenGoogle() {
      dispatch(getTokenGoogle())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Setting)
