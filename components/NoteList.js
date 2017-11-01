import React, { Component } from 'react';

// import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'

class NoteList extends Component {

  render() {
    return (
      <div>
        <h2>List of Notes Here</h2>
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



export default NoteList