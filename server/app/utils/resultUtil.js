'use strict';

function createResult(data) {
  return { 'statusCode': 200, 'data': data };
}

function createErrorException(error) {
  return { 'statusCode': 400, 'errorMessage': error.message };
}

function createNotFoundException() {
  return { 'statusCode': 404, 'errorMessage': 'Not found' };
}

module.exports = {
  createResult,
  createErrorException,
  createNotFoundException
};