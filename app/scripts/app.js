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
    }).state('courses', {
        url: '/courses',
        views: {
          'secondary': {
                templateUrl: 'views/courses-secondary.html',
                controller: 'CoursesCtrl'
            },
          'primary': {
                templateUrl: 'views/courses.html',
                controller: 'CoursesCtrl',
                resolve: {
                    pass: function($location) {
                        // I'm sure theres a better way to do this
                        $location.path('/courses/list');
                    }
                }
          }
        }
    })
    // List courses
    .state('courses.list', {
        url: '/list',
        templateUrl: 'views/courses-list.html'
    })
    // Individual course
    .state('courses.course', {
        url: '/:courseId',
        templateUrl: 'views/courses-single.html',
        controller: 'CourseCtrl',
        resolve: {
            loadCourse: function($q, $stateParams, $window, $location, $rootScope, Course) {
                var deferred = $q.defer();
                // var params = {
                //   where: {
                //     school: {
                //       '==': $rootScope.school
                //     }
                //   }
                // };
                // var course = null;
                // // Try and find the requested course
                // Course.findAll(params).then(function(courses) {
                //     course = _.find(Course.filter(), function(course) {
                //         return course.courseId == $stateParams.courseId
                //     });
                //     if (course) {
                //         console.log(course)
                //         deferred.resolve(course);
                //     } else {
                //         $location.path('/schedule')
                //         deferred.reject(new Error("Can't find course with ID " + $stateParams.courseId));
                //         //$window.history.back(); //need this?
                //     }
                // }).
                // catch (function(error) {
                //     console.log(error)
                //});
                var course = _.find($rootScope.courses, function(course) {
                    return course.id == $stateParams.courseId
                });
                if (course) {
                    console.log('found course')
                    deferred.resolve(course);
                } else {
                    console.log('no course there :(')
                    $location.path('/courses/list')
                    deferred.reject(new Error("Can't find course with ID " + $stateParams.courseId));
                    //$window.history.back(); //need this?
                }
                return deferred.promise;
            }
        }
    })
    // Schedule builder + registration
    .state('schedule', {
        url: '/schedule',
        templateUrl: 'views/schedule.html',
        controller: 'ScheduleCtrl',
        resolve: {
            checkSchool: function($rootScope, $location, School) {
                /*
                 * Make sure the school exists (for course creation)
                 */
                // if (!$rootScope.school) $location.path('/');
                // else {
                //     School.find($rootScope.school).then(function (school) {
                //         if (!school) $location.path('/');
                //         console.log(school)
                //     });
                // }
            }
        }
    });
    $urlRouterProvider.otherwise('/courses/list');
}).run(function($rootScope, Course, Major) {
    /*
     * Catch state change errors (otherwise won't see)
     */
    $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
        console.log(error)
    })
    /*
     * Update Course(s) collection when somebody adds one
     */
});