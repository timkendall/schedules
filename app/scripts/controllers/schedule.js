'use strict';
/**
 * @ngdoc function
 * @name schedules.controller:ScheduleCtrl
 * @description
 * # ScheduleCtrl
 */
angular.module('schedules').controller('ScheduleCtrl', function($scope, $rootScope, $location, $timeout, Course) {
    //var course = Course.create({name: "Physicology", courseId: "PSY-800", level: 400, credits: 3 }); // { title: 'How to Cook', id: 45 }
    // course.save().then(function (course) {
    //   console.log(course)
    // })
    // Course.find(33).then(function(course) {
    //     console.log(course); // { title: 'How to Cook', id: 45 }
    //     // document 45 has already been injected into the store at this point
    //     console.log(Course.get(33)); // { title: 'How to Cook', id: 45 }
    // });
    $scope.search = null;
    $scope.courses = [];
    $scope.showingStarred = false;
    $scope.chosen = [];
    $scope.addCourse = function() {
        $location.path('schedule/add/verify');
    }
    $scope.showStarred = function(show) {
        if (show) {
            $scope.unbindCourses();
            $scope.courses = []; // replace this with user's faves
            $scope.showingStarred = true;
        } else {
            $scope.unbindCourses = Course.bindAll($scope, 'courses', {}); // Grab from local storage
            $scope.showingStarred = false;
        }
    }
    $scope.view = function(course) {
        $location.path('/schedule/course/' + course.courseId);
    }
    $scope.pick = function(course) {
        //var index = $scope.availableCourses.indexOf(course);
        // Lookup corresponding cours ein catalog
        if (!course.picked && User.schedule.credits <= 18) {
            User.addCourse(course);
            course.picked = true;
            switch (course.meets) {
                case 'M':
                    Calendar.mondays.push(course);
                    break;
                case 'T':
                    Calendar.tuesdays.push(course);
                    break;
                case 'W':
                    Calendar.wednesdays.push(course);
                    break;
                case 'Th':
                    Calendar.thursdays.push(course);
                    break;
                case 'F':
                    Calendar.fridays.push(course);
                    break;
                case 'S':
                    Calendar.saturdays.push(course);
                    break;
                case 'MWF':
                    Calendar.mondays.push(course);
                    Calendar.wednesdays.push(course);
                    Calendar.fridays.push(course);
                    break;
                case 'TTh':
                    Calendar.tuesdays.push(course);
                    Calendar.thursdays.push(course);
                    break;
                default:
                    break;
            }
        }
    }

    $scope.unbindCourses = Course.bindAll($scope, 'courses', {});

    /*
     * Adding course stuff
     */


    $scope.course = {};
    $scope.validated = false;
    $scope.error = null;
    $scope.addingCourse = false;
    /*
     * Dirty watch for now; should buold custom form validation directive
     */
    var idPattern = new RegExp("[A-Z]+-+[0-9]");
    $scope.$watch('course.courseId', function(newVal, oldVal) {
        if (newVal) {
            var upper = newVal.toUpperCase();
            $scope.course.courseId = upper;
            // Invalid if doesn't match regex
            if (!idPattern.test(upper)) {
                $scope.validated = false;
                $scope.error = 'Invalid course ID format; Ex. ECON-101';
                return;
            };
            // Valid regex, see if we have it already
            var course = _.find(Course.filter(), function(course) {
                return course.courseId == upper;
            });
            if (!course) {
                $scope.validated = true;
                // Compute courseId (should be done in model)
                var courseId = $scope.course.courseId;
                /*
                 * Compute course level
                 */
                $scope.course.level = parseInt(courseId.substring(courseId.indexOf('-') + 1, courseId.indexOf('-') + 2) + '00');

            } else {
                $scope.validated = false;
                $scope.error = 'Course ' + $scope.course.courseId + ' already exists';
            }
        } else {}
    });

     $scope.add = function (index) {
        // Remove the course from $scope.courses
        var course = (_.remove($scope.courses, function(course) { return course.courseId == $scope.filteredCourses[index].courseId; }))[0];
        // Add course to users courses
        $scope.chosen.push(course);
        // Update UI
        $scope.addingCourse = false;
        $scope.search = null;

        $scope.$emit('AddCourse:cancel');
      };

    $scope.cancel = function() {
        $scope.validated = false;
        $scope.search = null;
        // Bindings for our UI
        $scope.addingCourse = false;
        // CLear course model
        $scope.course = {};
        // Emit event for other UI changes and actions
        $scope.$emit('AddCourse:cancel');
    }
    /*
     * Save new course (local and remote)
     */
    $scope.complete = function() {
        // Prevent local dupes
        if ($scope.validated) {

            /*
             * Try to create the new Course
             */
            console.log($scope.course)
            Course.create($scope.course).then(function(course) {

                   // Remove the course from $scope.courses
                var newCourse = (_.remove($scope.courses, function(_course) { return _course.courseId == course.courseId; }))[0];
                // Add course to users courses
                $scope.chosen.push(newCourse);
                // Good to go, course saved
                $scope.cancel();


            }).
            catch (function(error) {
                $scope.error = error;
                console.log(error);
                alert($scope.error.data);

            })
        }
    }
});