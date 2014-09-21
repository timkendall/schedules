'use strict';

/**
 * @ngdoc function
 * @name schedules.controller:ScheduleCtrl
 * @description
 * # ScheduleCtrl
 */
angular.module('schedules')
  .controller('ScheduleCtrl', function ($scope, Catalog) {
    $scope.availableCourses = Catalog['2014'];

  });
