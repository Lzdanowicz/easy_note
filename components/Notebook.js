import React, { Component } from 'react';
import NoteList from './NoteList';
import CurrentNote from './CurrentNote';

// import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'

class Notebook extends Component {

  render() {
    return (
      <div>
        <NoteList />
        <CurrentNote />
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