/*
 * Add classes on events
 */

angular.module('schedules')
.directive('eventClass', function($window, $timeout, $parse, $rootScope) {
  return {
    restrict: "A",
    link: function(scope, element, attr) {

      // Parse attribute into object
      var eventClasses = scope.$eval(attr.eventClass);

      // Hook onto each event and add class
      for (var property in eventClasses) {
          if (eventClasses.hasOwnProperty(property)) {

              $rootScope.$on(eventClasses[property], function () {
                element.addClass(property);

                // elem[0].style.webkitAnimationPlayState = "paused";
                // elem[0].style.webkitAnimationPlayState = "running";
                $timeout(function () {
                  element.removeClass(property);
                }, 1000);

              });
          }
      }
    }
  }
})