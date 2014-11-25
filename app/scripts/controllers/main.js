'use strict';

angular.module('schedules')
  .controller('MainCtrl', function ($scope, $location, $state, Course, Section, $rootScope, auth) {
    $scope.$state = $state;
    $scope.messages = {};
    $scope.messages.unread = [{ id: 1, from: 'Debbie Smith', message: 'Sure, I can help!'}]
//start: 28800, end: 31788,
    $rootScope.courses = [
      { id: 1, term: 'Fall 2014', course: 'CPSC-353', GEs: '', major: 'CPSC', level: 300, title: 'Computer Networks', likes: 3, sections: [
        { id: 1, course: 'CPSC-353', days:'MWF',  meets: ['Mon', 'Wed', 'Fri'], start: '10AM', end: '11AM', professor: 'M. Fahy', location: 'Leatherby B13'},
        { id: 1, course: 'CPSC-353', days:'MWF',  meets: ['Tue', 'Thu'], start: '12AM', end: '1:15PM', professor: 'M. Fahy', location: 'Leatherby B13'}
      ] },
      { id: 2, term: 'Fall 2014', course: 'ECON-411', GEs: '', major: 'ECON', level: 400, title: 'American Economic History', likes: 55, sections: [
        { id: 1, course: 'ECON-411', days:'TTh',  meets: ['Tue', 'Thu'], start: '1PM', end: '2PM', professor: 'J. Gurtovoy', location: 'Beckman 211'}
      ] },
      { id: 3, term: 'Fall 2014', course: 'ECON-101', GEs: '7EI', major: 'ECON', level: 100, title: 'Macroeconomics', likes: 4, sections: [] },
      { id: 4, term: 'Interterm 2014', course: 'SPAN-101', GEs: '', major: 'SPAN', level: 100, title: 'Spanish I', likes: 2, sections: [] },
      { id: 5, term: 'Interterm 2014', course: 'SPAN-102', GEs: '', major: 'SPAN', level: 100, title: 'Spanish II', likes: 2, sections: [] },
      { id: 6, term: 'Fall 2014', course: 'CPSC-400', GEs: '', major: 'CPSC', level: 400, title: 'Compiler Construction', likes: 2, sections: [] },
      { id: 7, term: 'Fall 2014', course: 'CPSC-453', GEs: '', major: 'CPSC', level: 400, title: 'Programming Languages', likes: 14, sections: [] },
      { id: 8, term: 'Spring 2015', course: 'CPSC-800', GEs: '', major: 'CPSC', level: 800, title: 'Algorithm Analysis', likes: 60, sections: [] },
      { id: 9, term: 'Summer 2015', course: 'ACTG-101', GEs: '', major: 'ACTG', level: 101, title: 'Intro to Accounting', likes: 13, sections: [] }
    ];

     /*
     * USER ACTIONS stuff
     */

    $rootScope.picked = [];
    $rootScope.liked = [];
    $rootScope.saved = [];

    $scope.isLikedCourse = function (_course) {
       var likedCourse = _.find($rootScope.liked, function (course) {
          return course.id == _course.id;
        });

       if (likedCourse) return true;
       else return false;
     }

    $scope.likeCourse = function (_course) {
      // Make sure it's not already there
      var likedCourse = _.find($rootScope.liked, function (course) {
        return course.id == _course.id;
      });

      // If liked, remove
      if (likedCourse) {
        _course.likes--;
         _.remove($rootScope.liked, function (course) { return course.id == _course.id; });
        return;
      }
      // Add it
      $rootScope.liked.push(_course);
      _course.likes++
      // Emit add event
      $rootScope.$emit('liked course')
     }

     $scope.isPickedCourse = function (_course) {
       var pickedCourse = _.find($rootScope.picked, function (course) {
          return course.id == _course.id;
        });

       if (pickedCourse) return true;
       else return false;
     }

      var colors = ['yellow', 'orange', 'purple', 'green', 'red'];

     $scope.addToSchedule = function (_course) {
      // Make sure it's not already there
      var pickedCourse = _.find($rootScope.picked, function (course) {
        return course.id == _course.id;
      });

      if (pickedCourse) {
        // Reclaim the color
        colors.push(_course.color);
        _course.color = null;
        // remove it
        _.remove($rootScope.picked, function (course) { return course.id == _course.id; });
        $rootScope.$emit('added course'); // should be 'removed course'
        return;
      }

      // Assign it a color
      _course.color = colors.pop();
      // Add it
      $rootScope.picked.push(_course);
      // Emit add event
      $rootScope.$emit('added course')
     }

     $scope.removeFromPicked = function (_course) {
        _.remove($rootScope.picked, function (course) { return course.id == _course.id; });
     }



    /*
     * FILTER stuff
     */

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
