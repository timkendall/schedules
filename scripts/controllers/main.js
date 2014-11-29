'use strict';

angular.module('schedules')
  .controller('MainCtrl', function ($scope, $location, $state, Course, $rootScope, auth, $http) {

    $scope.$state = $state;

//start: 28800, end: 31788,
    // $rootScope.courses = [
    //   { id: 1, term: 'Fall 2014', course: 'CPSC-353', GEs: '', major: 'CPSC', level: 300, title: 'Computer Networks', likes: 3, sections: [
    //     { id: 1, course: 'CPSC-353', days:'MWF',  meets: ['mon', 'wed', 'fri'], start: 10, end: 10.83, professor: 'M. Fahy', location: 'Leatherby B13'},
    //     { id: 2, course: 'CPSC-353', days:'TTh',  meets: ['tue', 'thu'], start: 12, end: 13.25, professor: 'M. Fahy', location: 'Leatherby B13'},
    //     { id: 3, course: 'CPSC-353', days:'M',  meets: ['mon'], start: 13, end: 15.83, professor: 'M. Fahy', location: 'Leatherby B13'}
    //   ] },
    //   { id: 2, term: 'Fall 2014', course: 'ECON-411', GEs: '', major: 'ECON', level: 400, title: 'American Economic History', likes: 55, sections: [
    //     { id: 1, course: 'ECON-411', days:'TTh',  meets: ['tue', 'thu'], start: 13, end: 14.25, professor: 'J. Gurtovoy', location: 'Beckman 211'},
    //     { id: 2, course: 'ECON-411', days:'TTh',  meets: ['wed'], start: 14, end: 16.83, professor: 'F. Narddog', location: 'Beckman 206'}
    //   ] },
    //   { id: 3, term: 'Fall 2014', course: 'ECON-101', GEs: '7EI', major: 'ECON', level: 100, title: 'Macroeconomics', likes: 4, sections: [] },
    //   { id: 4, term: 'Interterm 2014', course: 'SPAN-101', GEs: '', major: 'SPAN', level: 100, title: 'Spanish I', likes: 2, sections: [] },
    //   { id: 5, term: 'Interterm 2014', course: 'SPAN-102', GEs: '', major: 'SPAN', level: 100, title: 'Spanish II', likes: 2, sections: [] },
    //   { id: 6, term: 'Fall 2014', course: 'CPSC-400', GEs: '', major: 'CPSC', level: 400, title: 'Compiler Construction', likes: 2, sections: [] },
    //   { id: 7, term: 'Fall 2014', course: 'CPSC-453', GEs: '', major: 'CPSC', level: 400, title: 'Programming Languages', likes: 14, sections: [] },
    //   { id: 8, term: 'Spring 2015', course: 'CPSC-800', GEs: '', major: 'CPSC', level: 800, title: 'Algorithm Analysis', likes: 60, sections: [] },
    //   { id: 9, term: 'Summer 2015', course: 'ACTG-101', GEs: '', major: 'ACTG', level: 100, title: 'Intro to Accounting', likes: 13, sections: [] }
    // ];

    /*
     * Retrieve course data (server or local)
     */
    var school = '543f2167cc91ba0b1cd8eb0c'; // hardcode chapman for now
    Course.findAll({school: school}).then(function (courses) {
        console.log(courses)
        $rootScope.courses = courses;
    });
    //$scope.unbindCourses = Course.bindAll($rootScope, 'courses');


    // Setup filter model
     $rootScope.fields = {
        major: null,
        ge: null,
        level: null,
        time: null
     };

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
        if (_course.id === $rootScope.selectedCourse.id) $rootScope.selectedCourse = null;
        _.remove($rootScope.picked, function (course) { return course.id == _course.id; });
     }

  });
