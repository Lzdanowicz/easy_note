import React, { Component } from 'react';
import SignUpForm from './SignUpForm';
import LogInForm from './LogInForm';
import SignInTabs from './SignInTabs';
// import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'

class SignIn extends Component {

    constructor(props) {
        super(props)

        this.state = {
            activeTab: 'sign-up'
        }

        this.changeTab = this.changeTab.bind(this);
    }

    changeTab(e) {
        e.preventDefault()
        let newTab = e.target.id;

        this.setState({
            activeTab: newTab
        })
    }

    renderActiveTab() {
        if (this.state.activeTab === 'log-in') {
            return (
                <LogInForm />
            )
        } else {
            return (
                <SignUpForm />
            )
        }
    }

    render() {

        let activeForm = null;

        if (this.state.activeTab === 'log-in') {
            activeForm = <LogInForm />
        } else {
            activeForm = <SignUpForm />
        }

        return (
    	   <div className="sign-in-section">
                <div className="section-background">
                    <div className="sign-in-form-container">
                        <div className="form-body">
                            <SignInTabs changeTab={this.changeTab} activeTab={this.state.activeTab} />
                            {activeForm}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SignIn