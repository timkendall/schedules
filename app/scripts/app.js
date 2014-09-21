'use strict';

/**
 * @ngdoc overview
 * @name schedules
 * @description
 * # Schedules
 *
 * Config module of the application.
 */
angular
  .module('schedules', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ui.router',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      // Schedule builder + registration
      .state('schedule', {
        url: '/schedule',
        templateUrl: 'views/schedule.html',
        controller: 'ScheduleCtrl'
       })

      // List of planned/bookmarked courses
      .state('planned', {
        url: '/planned',
        templateUrl: 'views/planned.html',
        controller: 'PlannedCtrl'
       })

       // Entire, searhable course catalog for school
      .state('catalog', {
        url: '/catalog',
        templateUrl: 'views/catalog.html',
        controller: 'CatalogCtrl'
       })

      // An individual course
      .state('catalog.course', {
        url: '/:courseName',
        templateUrl: 'views/course.html',
        controller: 'CourseCtrl'
       });

      $urlRouterProvider.otherwise('/schedule');

  }).run(function () {
    // Code to run before app is initalized
  });
