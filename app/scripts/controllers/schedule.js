'use strict';
/**
 * @ngdoc function
 * @name schedules.controller:ScheduleCtrl
 * @description
 * # ScheduleCtrl
 */
angular.module('schedules').controller('ScheduleCtrl', function($scope, $rootScope, $location, $timeout, Course, Section, Professor) {
    $scope.calendarView = true;
    $rootScope.selectedCourse = $rootScope.picked[0] || null;



    $scope.selectCourse = function(course) {
        $rootScope.selectedCourse = course;
    }
    $scope.selectSection = function(section) {
        // Unselect other section
        var course = _.find($rootScope.courses, function(course) {
            return course.id === section.course.id
        });
        course.sections.forEach(function(section) {
            section.selected = false;
        })
        // Select this section
        section.selected = true;
        // Hide any other visible sections
        $rootScope.$broadcast('hide all sections', {
            course: section.course.id
        });
    }
    $scope.showSection = function(section) {
        $rootScope.$broadcast('show section', {
            course: section.course.id,
            section: section.id
        });
    }
    $scope.hideSection = function(section) {
        $rootScope.$broadcast('hide section', {
            course: section.course.id,
            section: section.id
        });
    }
});