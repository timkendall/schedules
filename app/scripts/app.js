'use strict';
/**
 * @ngdoc overview
 * @name schedules
 * @description
 * # Schedules
 *
 * Config module of the application.
 */
angular.module('schedules', ['ngAnimate', 'ngCookies', 'ngResource', 'ui.router', 'ngSanitize', 'ngTouch', 'auth0', , 'angular-storage', 'angular-jwt', 'angular-data.DS']).config(function($stateProvider, $urlRouterProvider, $httpProvider, authProvider, jwtInterceptorProvider) {
    // Configure Auth0 authentication
    authProvider.init({
        domain: 'schedules.auth0.com',
        clientID: 'hHXmSgTUz2Cfv1LwjTLPgVcUoY8QBnls'
    });
    // Configure $http interceptors (send user's token for every API call)
    jwtInterceptorProvider.tokenGetter = function(store) {
        // Return the saved token
        return store.get('token');
    }
    $httpProvider.interceptors.push('jwtInterceptor');
    // Configure states (routes)
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
    // Set default route
    $urlRouterProvider.otherwise('/courses/list');
    // Code to run at startup
}).run(function($rootScope, auth, store, jwtHelper, Course, Major) {
    // Catch state change errors
    $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
        console.log(error)
    });
    // This hooks all auth events to check everything as soon as the app starts
    auth.hookEvents();
    // Maintain a user's login on page refresh
    $rootScope.$on('$locationChangeStart', function() {
        if (!auth.isAuthenticated) {
            var token = store.get('token');
            if (token) {
                if (!jwtHelper.isTokenExpired(token)) {
                    auth.authenticate(store.get('profile'), token);
                } else {
                    // Either show Login page or use the refresh token to get a new idToken
                    $location.path('/');
                }
            }
        }
    });
});