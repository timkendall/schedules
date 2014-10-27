'use strict';

/**
 * @ngdoc function
 * @name schedules.controller:CatalogCtrl
 * @description
 * # CatalogCtrl
 */
angular.module('schedules')
  .controller('CourseCtrl', function ($scope, loadCourse, $location) {

    $scope.course = loadCourse;

    $scope.close = function () {
      $location.path('/schedule');
    }

  });
