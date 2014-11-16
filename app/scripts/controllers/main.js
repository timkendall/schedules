'use strict';

angular.module('schedules')
  .controller('MainCtrl', function ($scope, $location, Course, Section) {
    $scope.blurPrimary = false;
    $scope.togglePrimary = function () {
      if ($scope.blurPrimary) $scope.blurPrimary = false;
      else $scope.blurPrimary = true;
    }

  });
