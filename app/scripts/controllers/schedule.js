'use strict';
/**
 * @ngdoc function
 * @name schedules.controller:ScheduleCtrl
 * @description
 * # ScheduleCtrl
 */
angular.module('schedules').controller('ScheduleCtrl', function($scope, $rootScope, $location, $timeout, Course) {


  $scope.calendarView = true;

  $scope.selectedCourse = $rootScope.picked[0] || null;

  $scope.selectCourse = function (course) {
    $scope.selectedCourse = course;
  }


});