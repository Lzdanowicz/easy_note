import React, { Component } from 'react';
import ajax from 'superagent';
import { Redirect } from 'react-router-dom';


class LogInForm extends Component {

    constructor(props) {
        super(props)

        this.state = {
			email: '',
			password: '',
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
    	//function to dynamically set state keys
    	var stateObject = function() {
    		var returnObj = {};
    		returnObj[this.target.name] = this.target.value;
        		return returnObj;
    		}.bind(event)();

  		this.setState(
  			stateObject
  		)
    }

    handleSubmit(event) {
    	event.preventDefault();

    	//TODO - input validations
    	this.sendLogInData();
    }

    sendLogInData() {
    	
    	var data = JSON.stringify(this.state)
    	ajax.post('/login')
		.send(this.state)
    	.end((error,response) => {
    		if (error) {
    			console.log(error)
    		} else {
    			this.props.history.push('notebook');
    		}
    	});
    }


  	render() {
	    return (
	    	<div className="log-in-form-container">
			    <div className="tab-content">
			        <div className="log-in-content" id="login">   
			         	<h1>Welcome Back!</h1>
			          
			          	<form action="/login" onSubmit={this.handleSubmit} method="post"> 
			        		<div className="field-wrap">
			        			<p className="field-label">
			        				Email:
			        			</p>
				            	<input 
				            		type="email"required 
				            		autoComplete="off"
				            		placeholder="Email"
				            		name="email"
				            		value= {this.state.email}
				              		onChange= {this.handleChange}
				            	/>
			          		</div>
			          
			          		<div className="field-wrap">
			        			<p className="field-label">
			        				Password:
			        			</p>
				            	<input 
				            		type="password"
				            		required autoComplete="off"
				            		placeholder="Password"
				            		name="password"
				            		value= {this.state.password}
				              		onChange= {this.handleChange}
				            	/>
			          		</div>
			          		<p className="forgot">
			          			<a href="#">Forgot Password?</a>
			          		</p>
			          		<button className="button button-block">Log In</button>
			          	</form>
			        </div>  
			    </div>
	    	</div>
	    )
  	}
}

export default LogInForm