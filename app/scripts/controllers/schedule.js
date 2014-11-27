'use strict';
/**
 * @ngdoc function
 * @name schedules.controller:ScheduleCtrl
 * @description
 * # ScheduleCtrl
 */
angular.module('schedules').controller('ScheduleCtrl', function($scope, $rootScope, $location, $timeout, Course) {


  $scope.calendarView = true;

  $scope.selectedCourse = $rootScope.picked[0] || null;

  $scope.selectCourse = function (course) {
    $scope.selectedCourse = course;
  }

  $scope.selectSection = function (section) {
    // Unselect other section
    var course = _.find($rootScope.courses, function(course) {
        return course.course === section.course
    });
    course.sections.forEach(function (section) {
      section.selected = false;
    })
    // Select this section
    section.selected = true;
    // Hide any other visible sections
     $rootScope.$broadcast('hide all sections', { course: section.course });
  }

  $scope.showSection = function (section) {
    $rootScope.$broadcast('show section', { course: section.course, section: section.id });
  }

  $scope.hideSection = function (section) {
    $rootScope.$broadcast('hide section', { course: section.course, section: section.id });
  }

});