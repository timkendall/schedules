/*
 * calendar.js
 *
 * Display the school week
 */

'use strict';

angular.module('schedules').directive('scroll', function ($window) {
  return {
    restrict: 'A',

    link: function (scope, element, attr) {
      angular.element($window).bind('scroll', function() {
             if (this.pageYOffset >= 40) {
                 scope.scrolled = true;
             } else {
                 scope.scrolled = false;
             }
            scope.$apply();
        });
    }
  };
});