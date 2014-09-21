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

      var earliest = 7, // am
        latest = 22; // pm

      scope.hours = [];

      generateCalendar(earliest, latest);

      function generateCalendar (earliest, latest) {
        for (var i = earliest; i <= latest; ++ i) {
          var time = i;
          // Some simple conversions for readability
          if (i == 12) {
            time = 'noon';
          } else if (time > 12) {
            time = time - 12;
          }
          scope.hours.push({ name: time.toString() });
        }
      }
    }
  };
});
