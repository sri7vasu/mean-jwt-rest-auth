/**
* Module dependencies
*/
var express = require('express'),
jwt = require('express-jwt'),
bodyParser = require('body-parser'),
methodOverride = require('method-override'),
errorHandler = require('express-error-handler'),
tokenManager = require('./server/config/token_manager'),
secret = require('./server/config/secret'),
users = require('./server/routes/users'),
http = require('http'),
path = require('path');

var app = module.exports = express();

/**
* Configuration
*/
// all environments
app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(methodOverride());
app.use(express.static(path.join(__dirname, 'app'),{index:false}));

/**
* Routes
*/
var env = process.env.NODE_ENV || 'development';

// development only
if (env === 'development') {
  app.use(errorHandler());
}

// production only
if (env === 'production') {
  // TODO
}

app.all('*', function(req, res, next) {
  res.set('Access-Control-Allow-Origin', 'http://localhost');
  res.set('Access-Control-Allow-Credentials', true);
  res.set('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
  res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');
  if ('OPTIONS' == req.method) return res.send(200);
  next();
});

/*
Login
*/
app.post('/login', users.login);
app.post('/user/register', users.register);
app.get('/me', users.me);

/*
Logout
*/
app.get('/logout', jwt({secret: secret.secretToken}), users.logout);

process.on('uncaughtException', function(err) {
    console.log(err);
});

/**
* Start Server
*/
http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
