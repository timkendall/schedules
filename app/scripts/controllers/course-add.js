'use strict';
/**
 * @ngdoc function
 * @name schedules.controller:CatalogCtrl
 * @description
 * # CatalogCtrl
 */
angular.module('schedules').controller('CourseAddCtrl', function($scope, $rootScope, $location, Course) {
    $rootScope.validated = false;
    $rootScope.info = false;
    $scope.course = {};
    //$scope.course.sections = [];

    $scope.course.level = 100;
    $scope.course.credits = 3;
    $scope.completed = false;
    $scope.validMessage = 'Enter a course ID';
    $scope.error = null;

    $scope.credits = [{value: 0.5}, {value: 1}, {value: 3}];


    /*
     * Dirty watch for now; should buold custom form validation directive
     */
    var idPattern = new RegExp("[A-Z]+-+[0-9]");
    $scope.$watch('course.courseId', function (newVal, oldVal) {
        if (newVal) {
            var upper = newVal.toUpperCase();
            $scope.course.courseId = upper;
            // Invalid if doesn't match regex
            if (!idPattern.test(upper)) {
                $rootScope.validated = false;
                $scope.validMessage = 'Invalid ID format, please mimic the example.';
                return;
            };
            // Valid regex, see if we have it already
            var course = _.find(Course.filter(), function (course) {
                return course.courseId == upper;
            });
            if (!course) {
                $rootScope.validated = true;
                // Compute courseId (should be done in model)
                var courseId = $scope.course.courseId;
                $scope.course.level = parseInt(courseId.substring(courseId.indexOf('-') +1, courseId.indexOf('-') +2) + '00');
                $scope.validMessage = 'Awesome, looks like ' + $scope.course.courseId + ' is new';
            } else {
                $rootScope.validated = false;
                $scope.validMessage = 'Good news, ' + $scope.course.courseId + ' already exists! Add a section to it?'
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

        /*
         * Try to create the new Course
         */

        console.log($scope.course)
        Course.create($scope.course)
          .then(function (course) {
              // Good to go, course saved
              $scope.course = {};
               // Return back to schedule view
              $location.path('/schedule');
          })
          .catch(function (error) {
              $scope.error = error;
              console.log(error);
              alert($scope.error.data);
              $scope.completed = false;
          })
      }

    }


});