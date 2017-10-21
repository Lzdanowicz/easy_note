import React, { Component } from 'react';

// import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'

class Notebook extends Component {

  render() {
    return (
      <div>
        <h1>Notebook App</h1>
        <h2>YOLO</h2>
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



export default Notebook