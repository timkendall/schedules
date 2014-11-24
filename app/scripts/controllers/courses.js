'use strict';

/**
 * @ngdoc function
 * @name schedules.controller:CatalogCtrl
 * @description
 * # CatalogCtrl
 */
angular.module('schedules')
  .controller('CoursesCtrl', function ($scope, $location, $rootScope) {


    // Handle table clicks
    $scope.go = function (course) {
      $location.path('/find/' + course.id);
    }

  });
