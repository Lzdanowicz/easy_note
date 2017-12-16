import React from 'react';
import { render } from 'react-dom';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from '../components/App';
import Notebook from '../components/Notebook';
import createBrowserHistory from 'history/createBrowserHistory';



const history = createBrowserHistory();

//seperate log in and actual app framework


render(
	<BrowserRouter>
		<div>
			<Switch>
				<Route exact path="/" component={App} history={history} />
				<Route path='/notebook' component={Notebook}/>
			</Switch>
		</div>
	</BrowserRouter>,
   	document.getElementById('root')
)


