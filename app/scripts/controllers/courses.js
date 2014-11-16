'use strict';

/**
 * @ngdoc function
 * @name schedules.controller:CatalogCtrl
 * @description
 * # CatalogCtrl
 */
angular.module('schedules')
  .controller('CoursesCtrl', function ($scope, $location, $rootScope) {

    $rootScope.courses = [
      { id: 1, term: 'Fall', course: 'CPSC-353', GEs: '', major: 'CPSC', level: 300, title: 'Computer Networks', likes: 3, sections: [
        { id: 1, course: 'CPSC-353', days:'MWF', start: 28800, end: 31788, professor: 'M. Fahy', location: 'Leatherby B13', likes: 12}
      ] },
      { id: 2, term: 'Fall', course: 'ECON-411', GEs: '', major: 'ECON', level: 400, title: 'American Economic History', likes: 55, sections: [] },
      { id: 3, term: 'Fall', course: 'ECON-101', GEs: '7EI', major: 'ECON', level: 100, title: 'Macroeconomics', likes: 4, sections: [] },
      { id: 4, term: 'Fall', course: 'CPSC-400', GEs: '', major: 'CPSC', level: 400, title: 'Compiler Construction', likes: 2, sections: [] },
      { id: 5, term: 'Fall', course: 'CPSC-453', GEs: '', major: 'CPSC', level: 400, title: 'Programming Languages', likes: 14, sections: [] }
    ];

    // Handle table clicks
    $scope.go = function (course) {
      $location.path('/courses/' + course.id);
    }

    // Checked days
    $scope.days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
    $scope.selectedDays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

    // toggle selection for a given fruit by name
    $scope.toggleSelection = function toggleSelection (day) {
      var idx = $scope.selectedDays.indexOf(day);

      // is currently selected
      if (idx > -1) {
        $scope.selectedDays.splice(idx, 1);
      }

      // is newly selected
      else {
        $scope.selectedDays.push(day);
      }
    };

    $scope.checkAllDays = function () {

    }


    $scope.allNeedsClicked = function () {
      var newValue = !$scope.allDays();

      _.each($scope.todos, function (todo) {
        todo.done = newValue;
      });
    };

    $scope.allDays = function () {
      var days = _.reduce($scope.days, function (memo, day) {
        return memo + (day ? 1 : 0);
      }, 0);

      return (days === $scope.days.length);
    };


  });
