'use strict';
/**
 * @ngdoc function
 * @name schedules.controller:CatalogCtrl
 * @description
 * # CatalogCtrl
 */
angular.module('schedules').controller('CourseAddCtrl', function($scope, $rootScope, $location, Catalog, Course, $http) {
    $rootScope.validated = false;
    $rootScope.info = false;
    $scope.course = {};
    $scope.course.sections = [];
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

    $http.post('http://localhost:1337/course/create', {"name": "Intro to Econ", "courseId": "ECON-101", "level": 100, "credits": 3}).
  success(function(data, status, headers, config) {
    // this callback will be called asynchronously
    // when the response is available
    console.log(data)
  }).
  error(function(data, status, headers, config) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
    console.log(status)
  });

    $scope.complete = function () {
      // Prevent local dupes
      if (!$scope.completed) {
        $scope.completed = true;
        //Catalog['2014'].push($scope.course);
        var course = Course.new({"name": "Intro to Econ", "courseId": "ECON-101", "level": 100, "credits": 3});
        course.$save().then(function (response) {
            console.log(response)
        });
        $location.path('/schedule');
      }

    }


});