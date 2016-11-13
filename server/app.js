/**
 * Module dependencies.
 */

var express = require('express'),
	path = require('path'),
	logger = require('morgan'),
	bodyParser = require('body-parser'),
	cookieParser = require('cookie-parser'),
	compress = require('compression'),
	favicon = require('serve-favicon'),
	methodOverride = require('method-override'),
	errorHandler = require('errorhandler'),
	fs = require('fs');

var https = require('https'),
  http = require('http');

var app = express(),
  config = require('./config');

require('./utils/global');


app.set('port', ARGS[0] || config.httpPort || 3000);

var logPath = path.join(__dirname, 'logs'),
	logFilePath = path.join(logPath, 'access.log');
try {
	fs.readdirSync(logPath);
}
catch (ex) {
	fs.mkdirSync(logPath);
}

app
	.use(compress())
	.use(favicon(path.join(__dirname, 'favicon.png')))
	.use(logger('combined', {
		stream: fs.createWriteStream(logFilePath, {flags: 'a'})
	}))
  .use(bodyParser.urlencoded({extended: false}))
  .use(bodyParser.json())
	.use(cookieParser())
	.use(methodOverride())
	.use(express.static(path.join(__dirname, '../dist')));


require("./all.routes")(app);


if (app.get('env') === 'development') {
	app.use(errorHandler());
}

http.createServer(app).listen(app.get('port'), function () {
  console.log('Server listening on port ' + app.get('port'));
});
https.createServer({
  key: fs.readFileSync(config.httpsKeys.key),
  crt: fs.readFileSync(config.httpsKeys.crt)
}, app).listen(443, function () {
  console.log('With https listening...');
});


/*
# Nginx Htpps Configuration

server_name sample.com;
ssl on;
ssl_certificate /path/to/server.crt;
ssl_certificate_key /path/to/server.key;
ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
ssl_ciphers "EECDH+ECDSA+AESGCM EECDH+aRSA+AESGCM EECDH+ECDSA+SHA384EECDH+ECDSA+SHA256 EECDH+aRSA+SHA384 EECDH+aRSA+SHA256 EECDH+aRSA+RC4EECDH EDH+aRSA RC4 !aNULL !eNULL !LOW !3DES !MD5 !EXP !PSK !SRP !DSS !MEDIUM";

# Add perfect forward secrecy
ssl_prefer_server_ciphers on;
add_header Strict-Transport-Security "max-age=31536000; includeSubdomains";

*/

