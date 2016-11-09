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


var app = express();

require('./utils/global');


app.set('port', ARGS[0] || 3000);

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


app.listen(app.get('port'), function () {
	console.log('Express server listening on port ' + app.get('port'));
});
