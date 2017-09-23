import React, { Component } from 'react';
import AppHeader from './AppHeader';
import Signin from './Signin';
// import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'

class App extends Component {

  render() {
    return (
      <div>
        <AppHeader />
        <Signin />
      </div>
    )
  }
}

// function mapStateToProps(state) {
//   return state
// }


//wrapped with the dispatcher so we don't have to continuiously call it
// function mapDispatchToProps(dispatch) {
//   return {
//     actions: bindActionCreators(actions, dispatch)
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(App)

export default App