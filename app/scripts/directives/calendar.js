/*
 * calendar.js
 *
 * Display the school week
 */

'use strict';

angular.module('schedules').directive('calendar', function ($timeout) {
  return {
    restrict: 'E',
    templateUrl: 'templates/calendar.html',

    link: function (scope, element, attr) {


    }
  };
});
