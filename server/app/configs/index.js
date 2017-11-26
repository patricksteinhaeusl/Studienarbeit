'use strict';

let config = {
  server: {
    host: 'localhost',
    port: 3000,
  },
  mongo: {
    host: 'localhost',
    port: 27017,
    database: 'glockenEmil',
    connectionString: function() {
      return 'mongodb://' + this.host + ':' + this.port + '/' + this.database;
    }
  },
  cors: {
    corsOptions: {
      origin: 'http://localhost:8000',
      optionsSuccessStatus: 200
    }
  },
  auth: {
    validateOptions: {
      secret: 'falskdjf2u3f928jfo24jfopjo2=*Q=(*/)(*JTIçJTOIJçOçIçJçLJ',
      audience: 'http://localhost:3000',
      issuer: 'http://localhost:3000'
    },
    signOptions: {
      algorithm: 'HS256',
      expiresIn: '1 days',
      audience: 'http://localhost:3000',
      issuer: 'http://localhost:3000'
    },
    unprotectedRoutes: {
      path: ['/token']
    }
  },
  crypt: {
    hash: 'sha256',
    secret: '6a2da20943931e9834fc12cfe5bb47bbd9ae43489a30726962b576f4e3993e50'
  },
  jwt: {
    secret: 'falskdjf2u3f928jfo24jfopjo2=*Q=(*/)(*JTIçJTOIJçOçIçJçLJ',
  },
  postImages: {
    directory: '../assets/post-images/',
    defaultImages: ['default.png', 'default.svg']
  }
};

module.exports = config;