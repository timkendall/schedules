'use strict';
/**
 * @ngdoc function
 * @name schedules.controller:CatalogCtrl
 * @description
 * # CatalogCtrl
 */
angular.module('schedules').controller('CourseAddCtrl', function($scope, $rootScope, $location, Catalog) {
    $rootScope.validated = false;
    $rootScope.info = false;
    $scope.course = {};
    $scope.course.credits = 3;
    $scope.completed = false;
    $scope.validMessage = 'Enter a course ID';

    /*
     * Mock data for testing
     */
    var courses = ['CPSC-330', 'CPSC-213', 'ECON-200', 'ACTG-333'];
    /*
     * Dirty watch for now; should buold custom form validation directive
     */
    var idPattern = new RegExp("[A-Z]+-+[0-9]");
    $scope.$watch('course.id', function(newVal, oldVal) {
        if (newVal) {
            var upper = newVal.toUpperCase();
            $scope.course.id = upper;
            // Invalid if doesn't match regex
            if (!idPattern.test(upper)) {
                $rootScope.validated = false;
                $scope.validMessage = 'Invalid ID format, please mimic the example.';
                return;
            };
            // Valid regex, see if we have it already
            var course = _.find(Catalog['2014'], function(course) {
                return course.id == upper;
            });
            if (!course) {
                $rootScope.validated = true;
                $scope.validMessage = 'Awesome, looks like ' + $scope.course.id + ' is new';
            } else {
                $rootScope.validated = false;
                $scope.validMessage = 'Good news, ' + $scope.course.id + ' already exists! Add a section to it?'
            }
        } else {
            $scope.validMessage = 'Enter a course ID';
        }
    });
    /*
     * Dirty watch for now; should buold custom form validation directive
     */
    $scope.$watch('course.name', function (newVal, oldVal) {
        // Do some dumb validating for the course name
        if (newVal) {
          if (newVal.length > 2) {
            $rootScope.info = true;
          } else {
            $rootScope.info = false;
          }
        }
    });

    $scope.close = function() {
        $location.path('/schedule');
    }
    $scope.next = function(path) {
        if ($scope.validated) {
            $location.path(path);
        }
    }
    $scope.back = function(path) {
        $location.path(path);
    }


    $scope.complete = function () {
      // Prevent local dupes
      if (!$scope.completed) {
        $scope.completed = true;
        Catalog['2014'].push($scope.course);
        $location.path('/schedule');
      }

    }


});