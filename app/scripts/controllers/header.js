'use strict';

/**
 * @ngdoc function
 * @name schedules.controller:CoursesCtrl
 * @description
 * # CoursesCtrl
 */
angular.module('schedules')
  .controller('HeaderCtrl', function ($scope, User) {

    $scope.user = User;

  });
