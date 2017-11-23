'use strict';

let util = {
  createErrorResponse: function(message) {
    return { statusCode: 500, data: null, message: message };
  },
  createNotFoundResponse: function(message = null) {
    return { statusCode: 404, data: null, message: message };
  },
  createSuccessResponse: function(data, message = null) {
    return { statusCode: 200, data: data, message: message };
  }
};

module.exports = util;