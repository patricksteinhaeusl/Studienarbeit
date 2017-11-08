'use strict';

appControllers.controller('ShopController', ['$scope', '$routeParams', 'AuthService', 'ShopService', function($scope, $routeParams, authService, shopService) {
  const self = this;
  self.data = {};
  self.data.products = {};
  self.data.categories = {};
  self.data.categoryId = null;

  self.init = function(callback) {
    self.getProductCategories(function() {
      self.getProducts();
    });
  };

  self.getProducts = function() {
    self.data.categoryId = $routeParams.categoryId;
    if(!self.data.categoryId) {
      shopService.getProducts(function(products) {
        self.data.products = products;
        for(let productIndex = 0; productIndex < self.data.products.length; productIndex++) {
          self.data.products[productIndex].rating = {};
          self.data.products[productIndex].rating.value = self.calculateProductRatingValue(productIndex);
        }
      });
    } else {
      shopService.getProductsByCategory(self.data.categoryId, function(products) {
        self.data.products = products;
        for(let productIndex = 0; productIndex < self.data.products.length; productIndex++) {
          self.data.products[productIndex].rating = {};
          self.data.products[productIndex].rating.value = self.calculateProductRatingValue(productIndex);
        }
      });
    }
  };

  self.getProductCategories = function(callback) {
    shopService.getProductCategories(function(categories) {
      self.data.categories = categories;
      return callback();
    });
  };

  self.calculateProductRatingValue = function(productIndex) {
    let ratings = self.data.products[productIndex].ratings;
    if(ratings.length !== 0) {
      let value = 0;
      for (let rating of ratings) {
        value += rating.value;
      }
      return value / ratings.length;
    } else {
      return 0;
    }
  };

  self.rateProduct = function(productIndex) {
    let product = self.data.products[productIndex];
    let comment = product.rating.comment;
    let value = product.rating.value;
    let user = authService.getUser();
    let rating = { 'comment': comment, 'value': value, '_account': user._id };
    shopService.rateProduct(product, rating, function(result) {
      self.data.products[productIndex].rating = {};
      if(result) {
        self.data.products[productIndex].formSubmitFailed = false;
        self.getProducts(function() {
          console.log("Produkt rated");
        });
      } else {
        self.data.products[productIndex].formSubmitFailed = true;
      }
    });
  };

  self.changeInputRatingValue = function(productIndex, ratingValue) {
    let input = $('#rating-' + productIndex);
    input.val(ratingValue);
    input.trigger('input');
    input.trigger('change');
  };

  self.collapseRatingForm = function(productIndex) {
    let div = $('#shop-form-rating-' + productIndex);
    if(div.is(':visible')) {
      div.slideUp();
    } else {
      div.slideDown();
    }
  };

  self.init(function() {
    console.log("Data loaded");
  });
}]);