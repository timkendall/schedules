'use strict';

/**
 * @ngdoc function
 * @name schedules.controller:ScheduleCtrl
 * @description
 * # ScheduleCtrl
 */
angular.module('schedules')
  .controller('ScheduleCtrl', function ($scope, Catalog, User) {
    $scope.availableCourses = Catalog['2014'];

    $scope.user = User;

    $scope.pick = function (course) {
      //var index = $scope.availableCourses.indexOf(course);
      // Lookup corresponding cours ein catalog
      if (!course.picked && User.schedule.credits <= 18) {
         User.addCourse(course);
         course.picked = true;
      }
    }

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
