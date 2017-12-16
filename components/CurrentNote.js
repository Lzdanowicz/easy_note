import React, { Component } from 'react';

// import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'

class CurrentNote extends Component {

  render() {
    return (
      <div className="text-area-wrapper">
        <input type="text" />
      </div>
    )
  }
}

function mapStateToProps(state) {
   return state
}


function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}



export default CurrentNote