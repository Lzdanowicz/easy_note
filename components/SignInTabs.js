import React, { Component } from 'react';
import SignUpForm from './SignUpForm';
import LogInForm from './LogInForm';
// import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'

class SignInTabs extends Component {
    constructor(props) {
        super(props)

    }

    render() {
        let activeTab = this.props.activeTab;
        let ulClass = activeTab + " tab-group"


        return (
            <ul className={ulClass} >
                <li className="sign-up-tab tab"><a id="sign-up" onClick={ (e) => this.props.changeTab(e) } href="#">Sign Up</a></li>
                <li className="log-in-tab tab active"><a id="log-in" onClick={ (e) => this.props.changeTab(e) } href="#">Log In</a></li>
            </ul>
        )
    }
}

export default SignInTabs