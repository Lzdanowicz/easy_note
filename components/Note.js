import React, { Component } from 'react';

// import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'

class NoteList extends Component {

  constructor(props) {
    super(props)


  }

  render() {
    return (
      <li>{this.props.option.title}</li>
    )
  }
}

export default NoteList