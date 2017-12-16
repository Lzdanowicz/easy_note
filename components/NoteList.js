import React, { Component } from 'react';
import Note from './Note';

// import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'

class NoteList extends Component {

  constructor(props) {
    super(props)

    console.log(props)

  }

  componentDidMount() {

  }

  render() {
    console.log("notelist render")
    return (
      <div className="sidebar-wrapper">
        <ul>
            {this.props.userData.noteList.map((option, i) =>
              <Note option={option} key={i} />
            )}
        </ul>
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