var express = require('express');
var path = require('path');
var config = require(path.resolve('webpack.config.js'));
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var fs = require('fs');
var bodyParser = require('body-parser');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var redirect = require('express-redirect');
var session = require('express-session');
var mongoose = require('mongoose');


//import models
var User = require('./models/user')

// create "middleware"

var app = express();

var db = {};
var MongoClient = require('mongodb').MongoClient;

MongoClient.connect("mongodb://lzdanowicz:lukasz06@ds129043.mlab.com:29043/easynotedb", function(err, dbConn) {
	db.dbConnection = dbConn;
	db.collection = dbConn.collection('easynote');
})

var compiler = webpack(config);

app.use(bodyParser.json())
app.use(router);

app.use(webpackDevMiddleware(compiler, {noInfo: true, publicPath: config.output.publicPath}))
app.use(webpackHotMiddleware(compiler))


var expressValidator = require('express-validator');

app.use(expressValidator({
		customValidators: {
    		isEqual: (value1, value2) => {
      			return value1 === value2
    		}
		}
	}
));


var isAuthenticated = function (req, res, next) {
 	if (req.isAuthenticated())
    	return next();
  	res.redirect('/');
}

app.use(session({
	secret: 'cat',
	resave: false,
	saveUninitialized: false
}))

app.use(passport.initialize());
app.use(passport.session());


app.get(/^\/(?!api).*/, (req, res) => {
	console.log("WRONG FUNCTION");
	res.sendFile(path.resolve('client/index.html'));
});


app.post('/register', (req, res) => {

	var firstName = req.body.firstName;
	var lastName = req.body.lastName;
	var email = req.body.email;
	var password = req.body.password1;
	var password2 = req.body.password2;

	//validation

	req.checkBody('firstName', 'Name is required').notEmpty();
	req.checkBody('lastName', 'Name is required').notEmpty();
	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('password1', 'Password is required').notEmpty();
	req.checkBody('password2', 'Password is required').notEmpty();
	req.checkBody('password1', 'Passwords should be equal').isEqual(password2);

	var errors = req.getValidationResult();

	if (errors) {
		console.log(errors);
	} else {
		console.log("YOLO");
	}

	var newUser = new User({
		firstName: firstName,
		lastName: lastName,
		email: email,
		password: password
	})

	User.createUser(newUser, function(err, user) {
		if (err) throw err;
	})

	console.log(req.body);
    res.send({result: true});

});

passport.use('login', new LocalStrategy(
	{usernameField: 'email'},
	function(username, password, done) {
		User.getUserByEmail(username, function(err, user) {
			if (err) throw err;
			if(!user){
				console.log("UNKNOWN USER")
				return done(null, false, {message: "Unknown User"})
			} else {
				User.comparePassword(password, user.password, function(err, isMatch){
					if (err) throw err;
					if(isMatch){
						console.log('success');
						return done(null, user);
					} else {
						return done(null, false, {message: "Invalid Password"})
					}
				})
			}
		})
	}
));

app.post('/login', 
	passport.authenticate('login'),
	function(req, res) {
		res.json(req.user)
	}
)


passport.serializeUser(function(user, done) {
	done(null, user.id);
})

passport.deserializeUser(function(id, done) {
	User.getUserById(id, function(err, user) {
		done(err, user);
	})
})

//routes for pulling user information in the api

app.all('/api/*', (req, res, next) => {
  if (req.method === 'DELETE' || req.method === 'POST' || req.method === 'PUT') {
    if (!req.session || !req.session.user) {
      res.status(403).send({
        message: 'You are not authorized to perform the operation',
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

app.get('/api/notes', isAuthenticated, (req, res) => { 
	console.log("YOLO IN HERE")
	User.getUserById(req.user.id, function(err, user) {
		res.json(user)
	})
})



app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'));