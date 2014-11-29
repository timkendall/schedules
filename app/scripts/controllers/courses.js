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

    $scope.filterMajor = function (course) {
      if (!$rootScope.fields.major) return true;
      return course.major.abbreviation === $rootScope.fields.major.major.abbreviation ? true : false;
    }

    $scope.filterLevel = function (course) {
      if (!$rootScope.fields.level) return true;
      return course.level === $rootScope.fields.level.level ? true : false;
    }

    $rootScope.selectedDays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

    // $scope.$watch('selectedDays', function (newVal, oldVal) {
    //   console.log(newVal)
    // }, true)

    // toggle selection for a given day by name
    $rootScope.toggleSelection = function toggleSelection (day) {
      var idx = $rootScope.selectedDays.indexOf(day);

      // is currently selected
      if (idx > -1) {
        $rootScope.selectedDays.splice(idx, 1);
      }

      // is newly selected
      else {
        $rootScope.selectedDays.push(day);
      }
    };

    $scope.filterDays = function (course) {
      if (course.sections.length === 0) return true; // for now show courses with no sections (could be an option)

      for (var i = 0; i < course.sections.length; ++i) {
        var conflicts = 0;
        for (var j = 0; j < course.sections[i].meets.length; ++ j) {
          if ($rootScope.selectedDays.indexOf(course.sections[i].meets[j]) < 0) ++conflicts;
        }

        if (conflicts === 0) return true; // At least one section fits
      }

      return false;
    }

    $scope.filterTimes = function (course) {
      if (!$rootScope.fields.time) return true;
      if (course.sections.length === 0) return true; // for now show courses with no sections (could be an option)

      // Find at least on section that matches time params
     for (var i = 0; i < course.sections.length; ++i) {
      if (course.sections[i].start >= $rootScope.fields.time[0] && course.sections[i].end <= $rootScope.fields.time[1]) return true;
     }

     // No sections
     return false;
    }

  });
