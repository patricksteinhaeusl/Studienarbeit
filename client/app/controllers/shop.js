'use strict';

appControllers.controller('ShopController', ['$scope', '$routeParams', 'AuthService', 'ShopService', function($scope, $routeParams, authService, shopService) {
  console.log("ShopController");
  const self = this;
  self.data = {};
  self.data.products = {};
  self.data.categories = {};
  self.data.categoryId = null;
  self.data.searchValue = null;
  self.data.searchValues = [];

  self.init = function() {
    self.getProductCategories();
    self.getProducts();
  };

  self.getProducts = function() {
    self.data.categoryId = null;
    shopService.getProducts(function(products) {
      self.data.products = products;
      for(let productIndex = 0; productIndex < self.data.products.length; productIndex++) {
        self.data.products[productIndex].rating = {};
        self.data.products[productIndex].rating.value = self.calculateProductRatingValue(productIndex);
      }
    });
  };

  self.getProductsByCategory = function(categoryId) {
    self.data.categoryId = categoryId;
    shopService.getProductsByCategory(categoryId, function(products) {
      self.data.products = products;
      for(let productIndex = 0; productIndex < self.data.products.length; productIndex++) {
        self.data.products[productIndex].rating = {};
        self.data.products[productIndex].rating.value = self.calculateProductRatingValue(productIndex);
      }
    });
  };

  self.getProductsBySeachValue = function(searchValue) {
    self.data.categoryId = null;
    shopService.getProductsBySearchValue(searchValue, function(products) {
      self.data.products = products;
      for(let productIndex = 0; productIndex < self.data.products.length; productIndex++) {
        self.data.products[productIndex].rating = {};
        self.data.products[productIndex].rating.value = self.calculateProductRatingValue(productIndex);
      }
    });
  };

  self.getProductCategories = function() {
    shopService.getProductCategories(function(categories) {
      self.data.categories = categories;
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

  self.addSearchValue = function() {
    let maxSearchValues = 2;
    if(self.data.searchValue) {
      if(self.data.searchValues.length < maxSearchValues) {
        self.data.searchValues.splice(0, 0, self.data.searchValue);
      } else {
        self.data.searchValues.splice(maxSearchValues, 1);
        self.data.searchValues.splice(0, 0, self.data.searchValue);
      }
      self.getProductsBySeachValue(self.data.searchValue);
    } else {
      self.getProducts();
    }
    self.data.searchValue = '';
  };

  self.init();
}]).directive('ngEnter', function() {
  return function(scope, element, attrs) {
    element.bind("keydown keypress", function(event) {
      if(event.which === 13) {
        scope.$apply(function(){
          scope.$eval(attrs.ngEnter, {'event': event});
        });
        event.preventDefault();
      }
    });
  };
});