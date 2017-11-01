import React, { Component } from 'react';
import AppHeader from './AppHeader';
import Signin from './Signin';
import { BrowserRouter, Route } from 'react-router-dom';
import Notebook from './Notebook';
// import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'

class App extends Component {

  constructor(props) {
    super(props)
  }

  if (loggedIn) {
      return (
        <Redirect to='notebook'/>
      )
  }
    

  render() {
    return (
      <div>
        <AppHeader />
        <Signin history={this.props.history} />
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

// export default connect(mapStateToProps, mapDispatchToProps)(App)

export default App