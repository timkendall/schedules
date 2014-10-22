/*
 * calendar.js
 *
 * Display the school week
 */

'use strict';

angular.module('schedules').directive('losefocus', function () {
  return {
    restrict: 'A',
    link: function (scope, element, attr) {
      scope.$on('AddCourse:cancel', function () {
        element[0].blur();
      });
     }
  };
});