import React from 'react';
import { render } from 'react-dom';
import App from '../components/App';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

//seperate log in and actual app framework
render(
	<div>
		<BrowserRouter>
			<Route path="/" component={App} />
		</BrowserRouter>
	</div>,
   	document.getElementById("root")
)


