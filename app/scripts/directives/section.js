/*
 * calendar.js
 *
 * Display the school week
 */

'use strict';

angular.module('schedules').directive('section', function ($timeout) {
  return {
    restrict: 'A',



    link: function (scope, element, attr) {

     scope.sectionsVisible = false;

     scope.toggleSections = function () {
      console.log('toggled')
        if (scope.sectionsVisible) scope.sectionsVisible = false;
        else scope.sectionsVisible = true;
     }
    }
  };
});
