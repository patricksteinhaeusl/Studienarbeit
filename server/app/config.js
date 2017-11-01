'use strict';

const server = {
  host: 'localhost',
  port: '3000'
};

const jwtSecret = '6a5d1f68as189c1asd31c98ad74f$ä¨ü123^01230dfasdklöfj asjfklö ä$das-füadfc$äsdä-$ad maklfjolu89ujpoadfädüafcnadszucfbhjk9m vkldf mlökl';

const auth = {
  signOptions: {
    expiresIn: '1d',
    audience : 'self',
    issuer : 'shop'
  },
  validateOptions: {
    secret: jwtSecret,
    audience : 'self',
    issuer : 'shop'
  },
  unprotectedRoutes: {
    //path: [/.*/],
    path: [/.auth*/]
  }
};

const crypt = {
  hash: 'sha256',
  secret: 'secret!'
};

const dbHost = 'localhost';
const dbPort = 27017;
const dbName = 'glockenEmil';

const db = {
  connectionString: 'mongodb://' + dbHost + ':' + dbPort + '/' + dbName
};

module.exports = {
  SERVER: server,
  jwtSecret: jwtSecret,
  AUTH: auth,
  CRYPT: crypt,
  DB: db
};
