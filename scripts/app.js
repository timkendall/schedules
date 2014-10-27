'use strict';
/**
 * @ngdoc overview
 * @name schedules
 * @description
 * # Schedules
 *
 * Config module of the application.
 */
angular.module('schedules', ['ngAnimate', 'ngCookies', 'ngResource', 'ui.router', 'ngSanitize', 'ngTouch', 'angular-data.DS']).config(function($stateProvider, $urlRouterProvider) {
    // Check if the user is connected
    var checkLoggedin = function($q, $timeout, $http, $location) {
        // Initialize a new promise
        var deferred = $q.defer();
        // Make an AJAX call to check if the user is logged in
        $http.get('/loggedin').success(function(user) {
            // Authenticated
            if (user !== '0') $timeout(deferred.resolve);
            // Not Authenticated
            else {
                $timeout(deferred.reject);
                $location.url('/login');
            }
        });
        return deferred.promise;
    };
    $stateProvider
    // Schedule builder + registration
    .state('entry', {
        url: '/',
        templateUrl: 'views/entry.html',
        controller: 'EntryCtrl'
    })
    // Schedule builder + registration
    .state('schedule', {
        url: '/schedule',
        templateUrl: 'views/schedule.html',
        controller: 'ScheduleCtrl'
    })
    // Quick view of a course
    .state('schedule.course', {
        url: '/course/:courseId',
        templateUrl: 'views/course.html',
        controller: 'CourseCtrl',
        resolve: {
            loadCourse: function($q, $stateParams, $window, $location, $rootScope, Course) {
                var deferred = $q.defer();

                var params = {
                  where: {
                    school: {
                      '==': $rootScope.school
                    }
                  }
                };

                var course = null;
                // Try and find the requested course
                Course.findAll(params).then(function(courses) {
                    course = _.find(Course.filter(), function(course) {
                        return course.courseId == $stateParams.courseId
                    });
                    if (course) {
                        console.log(course)
                        deferred.resolve(course);
                    } else {
                        $location.path('/schedule')
                        deferred.reject(new Error("Can't find course with ID " + $stateParams.courseId));
                        //$window.history.back(); //need this?
                    }
                }).
                catch (function(error) {
                    console.log(error)
                });
                return deferred.promise;
            }
        }
    }).state('schedule.course.overview', {
        url: '/overview',
        templateUrl: 'views/course/overview.html'
    }).state('schedule.course.reviews', {
        url: '/reviews',
        templateUrl: 'views/course/reviews.html'
    }).state('schedule.course.updates', {
        url: '/updates',
        templateUrl: 'views/course/updates.html'
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
    })
    $urlRouterProvider.otherwise('/schedule');
}).run(function($rootScope, Course, Major) {
    /*
     * Catch state change errors (otherwise won't see)
     */
    $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
        console.log(error)
    })
    /*
     * Populate courses
     */
    Course.findAll().then(function(courses) {}).
    catch (function(error) {
        console.log(error)
    });
    /*
     * Populate majors
     */
    Major.findAll().then(function(majors) {}).
    catch (function(error) {
        console.log(error)
    });


    /*
     * Update Course(s) collection when somebody adds one
     */

});