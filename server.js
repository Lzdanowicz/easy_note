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

app.use(passport.initialize());
app.use(passport.session());

var expressValidator = require('express-validator');

app.use(expressValidator({
		customValidators: {
    		isEqual: (value1, value2) => {
      			return value1 === value2
    		}
		}
	}
));





app.get('/', (req, res) => {
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

passport.use(new LocalStrategy(
	{usernameField: 'email'},
	function(username, password, done) {
		User.getUserByEmail(username, function(err, user) {
			if (err) throw err;
			if(!user){
				console.log("UNKNOWN USER")
				return done(null, false, {message: "Unknown User"})
			} else {
				console.log(" User Found ")
				console.log(user)
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
))

passport.serializeUser(function(user, done) {
	done(null, user.id);
})

passport.deserializeUser(function(id, done) {
	User.getUserById(id, function(err, user) {
		done(err, user);
	})
})

app.post('/login', passport.authenticate('local', 
	{ 
		successRedirect: '/',
    	failureRedirect: '/login'
    })
);


app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'));