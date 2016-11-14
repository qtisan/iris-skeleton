
var router = require('express').Router();
var path = require('path'),
  fs = require('fs');
var IdGenerator = require('../utils/idGenerator'),
  moment = require('moment');

router.post('/save', function (req, res, next) {
  var dirPath = path.join(__dirname, '../logs/enneagram_files');
  try {
    fs.readdirSync(dirPath);
  }
  catch (ex) {
    fs.mkdirSync(dirPath);
  }
  try {
    var json = req.body.user;
    var user = JSON.parse(json);
    var filePath = path.join(dirPath, moment().format('YYYYMMDDhhmmss') + user.username + '-' + IdGenerator.newUuid() + '.enneagram');
    fs.writeFile(filePath, json, function (err) {
      if (err) {
        console.error(err);
        next(err);
      }
      else {
        res.result({user: user.username});
      }
    });
  }
  catch (ex) {
    next(ex);
  }
});


module.exports = router;
