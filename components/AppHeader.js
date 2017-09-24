import React, { Component } from 'react';
// import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'

class AppHeader extends Component {

  render() {
    return (
    	<div className="app-nav">
      		<div className="nav-container">
      			<div className="product-title-container">
      				<h3> EasyNote </h3>
      			</div>
			</div>
      </div>
    )
  }
}

export default AppHeader