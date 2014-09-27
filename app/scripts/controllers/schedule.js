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

         switch (course.meets) {
          case 'M':
            $scope.mondayCourses.push(course);
            break;
          case 'T':
            $scope.tuesdayCourses.push(course);
            break;
          case 'W':
            $scope.wednesdayCourses.push(course);
            break;
          case 'Th':
            $scope.thursdayCourses.push(course);
            break;
          case 'F':
            $scope.fridayCourses.push(course);
            break;
          case 'S':
            $scope.saturdayCourses.push(course);
            break;
          case 'MWF':
            $scope.mondayCourses.push(course);
            $scope.wednesdayCourses.push(course);
            $scope.fridayCourses.push(course);
            break;
          case 'TTh':
            $scope.tuesdayCourses.push(course);
            $scope.thursdayCourses.push(course);
            break;
          default:
            break;
         }
      }
    }

    // Containers for calendar
    $scope.mondayCourses = [];
    $scope.tuesdayCourses = [];
    $scope.wednesdayCourses = [];
    $scope.thursdayCourses = [];
    $scope.fridayCourses = [];
    $scope.saturdayCourses = [];

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
