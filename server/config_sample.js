
// rename this file to `config.js`, and fill the follows...

module.exports = {

  httpOn: true,
  httpPort: 9899,

  httpsOn: false,
  httpsPort: 9898,
  httpsKeys: {
    key: './secure/keys/server.key',
    cert: './secure/keys/server.pem'
  }

};
