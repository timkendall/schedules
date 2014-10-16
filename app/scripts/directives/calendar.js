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

    controller: function ($scope) {
      /*
       * Options - these can be set by the user
       */
      $scope.options = {
        earliest: 8,
        latest: 21,
        preferEvening: null,
        preferAfternoon: null,
        preferMorning: null,
        minimizeGaps: null,
        maximizeGaps: null,
        minimizeDays: null,
        maximizeDays: null
      }
       /*
       * Calculate hours available
       */
      $scope.getHours = function () {
        return new Array($scope.options.latest - $scope.options.earliest + 1);
      }
       /*
       * Hold the generated schedules
       */
      $scope.schedules = [];


      /*
       * Primary function - generate array of schedules based on courses and options
       */
      function generateSchedules () {}

      /*
       * Course getter by day
       */
      function getCoursesOn (day) {
        var courses = [];
        self.courses.forEach(function (course, index) {
          if (course.meets[day]) courses.push(course);
        });
        return courses;
      }
    },

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
