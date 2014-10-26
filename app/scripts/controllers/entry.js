'use strict';

/**
 * @ngdoc function
 * @name schedules.controller:CatalogCtrl
 * @description
 * # CatalogCtrl
 */
angular.module('schedules')
  .controller('EntryCtrl', function ($scope, $location) {

    $scope.schools = [{id: 0, name: 'Chapman University'}, {id: 1, name: 'UCI'}, {id: 2, name: 'UCSD'}, {id: 3, name: 'UCLA'}, {id: 4, name: 'University of San Diego'}];
    $scope.selectedSchool = null;
    $scope.selectSchool = function (school) {
      $scope.selectedSchool = school.id;
    }

    /*
     * Mock data for UI demo
     */
     $scope.mockCourses = [
      {
        id: 'ECON-101',
        name: 'Microeconomics'
      },
      {
        id: 'ASG-100',
        name: 'Buisness Accounting'
      },
      {
        id: 'CPSC-333',
        name: 'Computer Networks'
      },
      {
        id: 'CPSC-450',
        name: 'Database Systems'
      }
     ]
  });
