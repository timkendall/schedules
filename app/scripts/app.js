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

      // List of bookmarked courses
      .state('courses', {
        url: '/courses',
        templateUrl: 'views/courses.html',
        controller: 'CoursesCtrl'
       })

      // List of bookmarked professors
      .state('professors', {
        url: '/professors',
        templateUrl: 'views/professors.html',
        controller: 'ProfessorsCtrl'
       })

      // Entire, searhable course catalog for school
      .state('catalog', {
        url: '/catalog',
        templateUrl: 'views/catalog.html',
        controller: 'CatalogCtrl'
       });

      $urlRouterProvider.otherwise('/schedule');

  }).run(function () {
    // Code to run before app is initalized
  });
