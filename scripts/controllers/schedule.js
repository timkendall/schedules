'use strict';

/**
 * @ngdoc function
 * @name schedules.controller:ScheduleCtrl
 * @description
 * # ScheduleCtrl
 */
angular.module('schedules')
  .controller('ScheduleCtrl', function ($scope, Catalog, User, Calendar) {
    $scope.availableCourses = Catalog['2014'];

    $scope.user = User;

    $scope.pick = function (course) {
      //var index = $scope.availableCourses.indexOf(course);
      // Lookup corresponding cours ein catalog
      if (!course.picked && User.schedule.credits <= 18) {
         User.addCourse(course);
         course.picked = true;

         switch (course.meets) {
          case 'M':
            Calendar.mondays.push(course);
            break;
          case 'T':
            Calendar.tuesdays.push(course);
            break;
          case 'W':
            Calendar.wednesdays.push(course);
            break;
          case 'Th':
            Calendar.thursdays.push(course);
            break;
          case 'F':
            Calendar.fridays.push(course);
            break;
          case 'S':
            Calendar.saturdays.push(course);
            break;
          case 'MWF':
            Calendar.mondays.push(course);
            Calendar.wednesdays.push(course);
            Calendar.fridays.push(course);
            break;
          case 'TTh':
            Calendar.tuesdays.push(course);
            Calendar.thursdays.push(course);
            break;
          default:
            break;
         }
      }
    }

    // Containers for calendar
   $scope.Calendar = Calendar;

    // Pluralization templates
    $scope.courseMorningForms = {
      0: 'No morning courses',
      one: '{} morning course',
      other: '{} morning courses'
    };

    $scope.courseAfternoonForms = {
      0: 'No afteroon courses',
      one: '{} afteroon course',
      other: '{} afteroon courses'
    };

    $scope.courseEveningForms = {
      0: 'No evening courses',
      one: '{} evening course',
      other: '{} evening courses'
    };
  });
