'use strict';

appControllers.controller('HomeController', ['$scope', 'PostService', function($scope, postService) {
  const self = this;
  self.data = {};
  self.data.posts = [];

  self.init = function() {
    self.initSlider();
    self.getPosts();
  };

  self.initSlider = function() {
    $(document).ready(function() {
      let options = {
        $AutoPlay: 1
      };

      let jssor_slider = new $JssorSlider$('slider_container', options);

      ScaleSlider(jssor_slider);

      $(window).resize(function() {
        ScaleSlider(jssor_slider);
      });
    });
  };

  function ScaleSlider(jssor_slider) {
    let parentWidth = $('#slider_container').parent().width();
    if (parentWidth) {
      jssor_slider.$ScaleWidth(parentWidth);
    } else {
      window.setTimeout(ScaleSlider, 30);
    }
  }

  self.getPosts = function() {
    postService.getAll(function(data) {
      self.data.posts = data;
    });
  };

  self.init();
}])
// Injection Code Start - SVG Injection
.filter('trustAsResourceUrl', function ($sce) {
  let serverUrl = 'http://localhost:3000/post-images/';
  return function(postImage) {
    return $sce.trustAsResourceUrl(serverUrl + postImage);
  };
})
.filter('extension', function() {
  return function(input) {
    return input.split('.').pop()
  };
});
// Injection Code End