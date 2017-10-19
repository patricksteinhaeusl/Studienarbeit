'use strict';

function createErrorException(data) {
  return {statusCode: 400, data };
}

function createNotFoundException() {
  return { statusCode: 404 };
}

module.exports = {
  createErrorException,
  createNotFoundException
};