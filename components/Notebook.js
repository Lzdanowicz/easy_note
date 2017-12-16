import React, { Component } from 'react';
import NoteList from './NoteList';
import AppHeader from './AppHeader';
import CurrentNote from './CurrentNote';
import Request from 'superagent';

// import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'

class Notebook extends Component {

  constructor(props) {
    super(props)

    this.state = {
      userData: {

      }
    };

  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    var url = '/api/notes';

    Request.get(url)
    .then((response) => {
      console.log(response)
      response.json()
    }).then((response) => {
      this.setState({
        userData: response
      })
    })
  }

  render() {
    console.log("render")
    return (
      <div>
        <AppHeader />
        <div className="content-wrap">
          <NoteList noteList={this.state.userData} />
          <CurrentNote />
        </div>
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