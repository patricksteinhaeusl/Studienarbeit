'use strict';

appControllers.controller('ShopController', ['$scope', '$routeParams', 'AuthService', 'ShopService', function($scope, $routeParams, authService, shopService) {
  console.log("ShopController");
  const self = this;
  self.data = {};
  self.data.products = {};
  self.data.topRatedProducts = {};
  self.data.categories = {};
  self.data.categoryId = null;
  self.data.searchValue = null;
  self.data.searchValues = [];
  self.data.rating = {};

  self.init = function() {
    self.getProductCategories();
    self.getProducts();
    self.getProductsTopRated();
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

  self.getProductsTopRated = function() {
    shopService.getProductsTopRated(function(products) {
      self.data.topRatedProducts = products;
      for(let productIndex = 0; productIndex < self.data.topRatedProducts.length; productIndex++) {
        self.data.topRatedProducts[productIndex].rating = {};
        self.data.topRatedProducts[productIndex].rating.value = self.calculateProductRatingValue(productIndex);
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
    let user = authService.getUser();
    let value = self.data.products[productIndex].rating.value;
    let rating = { 'comment': comment, 'value': value, '_account': user._id };

    shopService.rateProduct(product, rating, function(result) {
      self.data.products[productIndex].rating = {};
      if(result) {
        self.data.products[productIndex].formSubmitFailed = false;
        self.getProducts();
        $('.shop-form-rating').slideUp();
      } else {
        self.data.products[productIndex].formSubmitFailed = true;
      }
    });
  };

  self.changeInputRatingValue = function(productIndex, ratingValue) {
    self.data.products[productIndex].rating.value = ratingValue;
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

  $scope.$watch(function() { return self.data.products }, function() {
    self.getProductsTopRated();
  }, true);

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