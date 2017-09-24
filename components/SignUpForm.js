import React, { Component } from 'react';
import ajax from 'superagent';


class SignUpForm extends Component {

    constructor(props) {
        super(props)

        this.state = {
			firstName: '',
			lastName: '',
			email: '',
			password1: '',
			password2: ''
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
    	this.sendFormData();
    }

    sendFormData() {
    	console.log(this.state)

    	var data = JSON.stringify(this.state)
    	ajax.post('/register')
		.send(this.state)
    	.end((error,response) => {
    		if (error) {
    			console.log(error)
    		} else {
    			console.log(this.state)
    			console.log(response)
    		}
    	});
    }

  	render() {
	    return (	      
		    <div className="tab-content">
		        <div className="sign-up-content" id="signup">   
		        	<h1>Sign Up!</h1>
			        <form action="/register" onSubmit={this.handleSubmit} method="post">      
			        	<div className="top-row">
			            	<div className="field-wrap">
			        			<p className="field-label">
			        				First Name:
			        			</p>
			              		<input 
			              			type="text" 
			              			required autoComplete="off" 
			              			placeholder="First Name"
			              			name="firstName"
			              			value= {this.state.firstName}
			              			onChange= {this.handleChange}
			              		/>
			            	</div>
			        
			            	<div className="field-wrap">
			            		<p className="field-label">
			        				Last Name:
			        			</p>
			              		<input 
			              			type="text"
			              			required autoComplete="off"
			              			placeholder="Last Name"
			              			name= "lastName"
			              			value= {this.state.lastName}
			              			onChange={this.handleChange}
			              		/>
			            	</div>
			          	</div>

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
			        			Set Up A Password:
			        		</p>
			            	<input 
			            		type="password"
			            		required autoComplete="off"
			            		placeholder="Password"
			            		name="password1"
			            		value= {this.state.password1}
			              		onChange= {this.handleChange}
			            	/>
			          	</div>
			          	<div className="field-wrap">
			          		<p className="field-label">
			        			Verify your Password:
			        		</p>
			            	<input 
			            		type="password"
			            		required autoComplete="off"
			            		placeholder="Password"
			            		name="password2"
			            		value= {this.state.password2}
			              		onChange= {this.handleChange}
			            	/>
			          	</div>
				         <button type="submit" className="button button-block">Get Started</button>
			        </form>
		        </div>
		    </div>
	    )
  	}
}

export default SignUpForm