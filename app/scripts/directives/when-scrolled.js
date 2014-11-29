//////////////////////////
// lazyLoadDirective.js  //
//////////////////////////
// http://adrichman.github.io/implementing-a-lazy-load-and-infinite-scroll-in-angularjs/

angular.module('schedules')
.directive('whenScrolled', function($window, $timeout) {
  return {
    restrict: "A",
    link: function(scope, element, attr) {
      var top = angular.element($window)[0].screenTop;
      var origHeight = angular.element($window)[0].screen.height;
      var height = (origHeight * 0.9);

      // bind the digest cycle to be triggered by the scroll event
      // when it exceeds a threshold
      angular.element($window).bind('scroll', function() {
        if (angular.element($window)[0].scrollY >= (height)) {

          // show the spinner when triggered
          scope.spinner.hide = !scope.spinner.hide;

          angular.element($window)[0].requestAnimationFrame(function(){
            // invoke the function passed into the 'whenScrolled' attribute
            scope.$apply(attr.whenScrolled);

            // increment the threshold
            height += (origHeight * 1.5);
          })
        }
      });
    }
  }
})