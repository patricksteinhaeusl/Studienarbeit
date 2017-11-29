'use strict';

let authSecret = '6a5d1f68as189c1asd31c98ad74f$ä¨ü123^01230dfasdklöfj asjfklö ä$das-füadfc$äsdä-$ad maklfjolu89ujpoadfädüafcnadszucfbhjk9m vkldf mlökl';


let config = {
  server: {
    host: 'localhost',
    port: '3000'
  },
  crypt: {
    hash: 'sha256',
    secret: 'kslafjop2)/)*(ZOJKN*K*JL*IU%*IO%JH'
  },
  mongo: {
    host: 'localhost',
    port: 27017,
    name:'webshop',
    connectionString: function() {
      return 'mongodb://' + this.host + ':' + this.port + '/' + this.name;
    }
  },
  jwt: {
    secret: authSecret,
  },
  auth: {
    signOptions: {
      expiresIn: '1d',
      audience : 'self',
      issuer : 'shop'
    },
    validateOptions: {
      secret: authSecret,
      audience : 'self',
      issuer : 'shop'
    },
    unprotectedRoutes: {
      path: [/.assets/]
    }
  },
  cors: {
    corsOptions: {
      origin: 'http://localhost:8000',
      optionsSuccessStatus: 200
    }
  },
  postImages: {
    directory: '../assets/post-images/',
    defaultImages: ['default.png', 'default.svg']
  }
};

module.exports = config;