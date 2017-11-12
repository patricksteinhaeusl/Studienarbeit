'use strict';

appControllers.controller('HomeController', ['$scope', 'NewsService', function($scope, newsService) {
  console.log("HomeController");
  const self = this;
  self.data = {};
  self.data.news = [];

  self.init = function() {
    self.initSlider();
    self.getNews();
  };

  self.initSlider = function() {
    let options = {
      $AutoPlay: 1
    };

    let jssor_slider = new $JssorSlider$('slider_container', options);
  };

  self.getNews = function() {
    newsService.getAll(function(data) {
      self.data.news = data;
    });
  };

  self.init();
}]);