var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

mongoose.Promise = require('bluebird');

var promise = mongoose.connect("mongodb://lzdanowicz:lukasz06@ds129043.mlab.com:29043/easynotedb", {
	useMongoClient: true
});

var db = {};

promise.then(function(dbConn) {
	db.dbConnection = dbConn;
	db.collection = dbConn.collection('easynote');
});


var userSchema = mongoose.Schema({
	firstName:  {
		type: String
	},
	lastName: {
		type: String
	},
	email: {
		type: String,
		index: true
	},
	created: {
		type: String
	},
	password: {
		type: String
	},
	notes: {
		type: Array
	}
});

var User = module.exports = mongoose.model('User', userSchema);

module.exports.createUser = function(newUser, callback) {
	bcrypt.genSalt(10, function(err, salt){
		bcrypt.hash(newUser.password, salt, function(err, hash) {
			console.log(newUser.password);
			newUser.password = hash;
			newUser.save(callback);
		})
	})
}

module.exports.getUserById = function(id, callback) {
	User.findById(id, callback)
}

module.exports.getUserByEmail = function(email, callback) {
	console.log("FINDING USER")
	var query = {email: email}
	User.findOne(query, callback)
}

module.exports.comparePassword = function(userPassword, hash, callback) {
	bcrypt.compare(userPassword, hash, function(err, isMatch){
		if (err) throw err;
		callback(null, isMatch);
	})
}
