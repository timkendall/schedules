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
    .state('schedule', {
        url: '/schedule',
        templateUrl: 'views/schedule.html',
        controller: 'ScheduleCtrl'
    })
    /*
     * Course add states
     */
    .state('schedule.add', {
        url: '/add',
        templateUrl: 'views/course/add/add.html',
        controller: 'CourseAddCtrl'
    }).state('schedule.add.verify', {
        url: '/verify',
        templateUrl: 'views/course/add/verify.html'
    }).state('schedule.add.info', {
        url: '/info',
        templateUrl: 'views/course/add/info.html',
        resolve: {
            isValidated: function($q, $rootScope) {
                var deferred = $q.defer();
                if (!$rootScope.validated) {
                    deferred.reject();
                } else deferred.resolve();
                return deferred.promise;
            }
        }
    }).state('schedule.add.sections', {
        url: '/sections',
        templateUrl: 'views/course/add/sections.html',
        controller: 'SectionCtrl',
        resolve: {
            isValidated: function($q, $rootScope) {
                var deferred = $q.defer();
                if (!$rootScope.validated) {
                    deferred.reject();
                } else deferred.resolve();
                return deferred.promise;
            },
            hasInfo: function($q, $rootScope) {
                var deferred = $q.defer();
                if (!$rootScope.info) {
                    deferred.reject();
                } else deferred.resolve();
                return deferred.promise;
            }
        }
    }).state('schedule.add.completed', {
        url: '/completed',
        templateUrl: 'views/course/add/completed.html',
        resolve: {
            isValidated: function($q, $rootScope) {
                var deferred = $q.defer();
                if (!$rootScope.validated) {
                    deferred.reject();
                } else deferred.resolve();
                return deferred.promise;
            },
            hasInfo: function($q, $rootScope) {
                var deferred = $q.defer();
                if (!$rootScope.info) {
                    deferred.reject();
                } else deferred.resolve();
                return deferred.promise;
            }
        }
    })
    // Quick view of a course
    .state('schedule.course', {
        url: '/course/:courseId',
        templateUrl: 'views/course.html',
        controller: 'CourseCtrl',
        resolve: {
            loadCourse: function($q, $stateParams, Catalog, $window, $location, Course) {
                var deferred = $q.defer();
                console.log('resolving')
                var course = null;
                // Try and find the requested course
                Course.findAll().then(function(courses) {
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
    })
    // Add a course
    .state('add course', {
        url: '/course/add',
        templateUrl: 'views/course-add.html',
        controller: 'CourseCtrl'
    })
    // Edit a course (i.e add sections)
    .state('edit course', {
        url: '/course/edit',
        templateUrl: 'views/course-edit.html',
        controller: 'CourseCtrl'
    })
    $urlRouterProvider.otherwise('/schedule');
}).run(function($rootScope, Course) {
    // Code to run before app is initalized
    // Catch state change errors
    $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
        console.log(error)
    })
    /*
     * Populate $scope with courses
     */
    Course.findAll().then(function(courses) {}).
    catch (function(error) {
        console.log(error)
    });
    /*
     * Update Course(s) collection when somebody adds one
     */
    //  socket.on('createCourse', function (course) {
    //   // Someone in another browser created a new post
    //   // Inject the new post into the data store of this browser
    //   Course.inject(course);
    // });
});