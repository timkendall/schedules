'use strict';

/**
 * @ngdoc function
 * @name schedules.controller:CatalogCtrl
 * @description
 * # CatalogCtrl
 */
angular.module('schedules')
  .controller('EntryCtrl', function ($rootScope, $scope, $location, School) {

    // Load up all schools
    School.findAll();
    $scope.unbindSchools = School.bindAll($scope, 'schools', {});


    $scope.selectedSchool = null;

    $scope.selectSchool = function (school) {
      $scope.selectedSchool = school.id;
    }

    $scope.go = function () {
      $rootScope.school = $scope.selectedSchool;
      $location.path('/schedule');
    }

    $scope.mockChosen = [
      {
        id: '',
        sections: [{ meets: ['Mon', 'Wed'], start: '8am', end: '8:50am' }]
      },
      {
        id: '',
        sections: [{ meets: ['Tue', 'Thu'], start: '9am', end: '10am' }]
      },
      {
        id: '',
        sections: [{ meets: ['Fri'], start: '9am', end: '10am' }]
      }
    ];
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
