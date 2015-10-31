var db = require('../config/mongo_database');
var jwt = require('jsonwebtoken');
var secret = require('../config/secret');
var redisClient = require('../config/redis_database').redisClient;
var tokenManager = require('../config/token_manager');

exports.me = function(req,res){
		if (req.headers && req.headers.authorization) {
			var authorization = req.headers.authorization,decoded;
			try{
			decoded = jwt.verify(authorization.split(' ')[1],secret.secretToken);
			}catch(e){
       return res.status(401).send('unauthorized');
			}
			var userId = decoded.id;
			// Fetch the user by id
		 		db.userModel.findOne({_id: userId}, function (err, user) {
		 					if (err) {
		 							return res.send(401);
		 					} else {
		 							res.json({data: user});
		 					}
		 			});
	} else {
	  return res.status(401).send('unauthorized');
 }
}
exports.login = function(req, res) {
	var username = req.body.username || '';
	var password = req.body.password || '';
	if (username == '' || password == '') {
		return res.send(401);
	}
	db.userModel.findOne({username: username}, function (err, user) {
		if (err) {
			console.log(err);
			return res.send(401);
		}
		if (user == undefined) {
			return res.status(401).send('User name ' + username + ' does not exist');
		}
		user.comparePassword(password, function(isMatch) {
			if (!isMatch) {
				console.log("Attempt failed to login with " + user.username);
				return res.status(401).send('User name and password did not match !');
      }
			var token = jwt.sign({id: user._id}, secret.secretToken, { expiresIn: tokenManager.TOKEN_EXPIRATION_SEC });
			return res.json({token:token});
		});
	});
};
exports.logout = function(req, res) {
	if (req.user) {
		tokenManager.expireToken(req.headers);
		delete req.user;
		return res.send(200);
	}
	else {
		return res.send(401);
	}
}
exports.register = function(req, res) {
	var username = req.body.username || '';
	var password = req.body.password || '';
	var passwordConfirmation = req.body.passwordConfirmation || '';
	if (username == '' || password == '' || password != passwordConfirmation) {
		console.log('Password and Password confirmation doesnt match');
		return res.status(400).send('Password and password confirmation does not match');
	}
	db.userModel.findOne({username: username}, function (err, user) {
		if (err) {
			console.log(err);
			return res.send(500);
		}
		if(user){
			console.log('User exists already!');
			return res.status(400).send('User exists already !');
		}
		else {
			var user = new db.userModel();
			user.username = username;
			user.password = password;
			user.save(function(err) {
				if (err) {
					console.log(err);
					return res.send(500);
				} else {
					var token = jwt.sign({id: user._id}, secret.secretToken, { expiresIn: tokenManager.TOKEN_EXPIRATION });
					return res.json({token:token});
				}
			});
		}
	});
}
