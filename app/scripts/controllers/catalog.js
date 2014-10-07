'use strict';

/**
 * @ngdoc function
 * @name schedules.controller:CatalogCtrl
 * @description
 * # CatalogCtrl
 */
angular.module('schedules')
  .controller('CatalogCtrl', function ($scope, Catalog) {

    $scope.courses = Catalog['2014'];
  });
