'use strict';
/**
 * @ngdoc function
 * @name schedules.controller:ScheduleCtrl
 * @description
 * # ScheduleCtrl
 */
angular.module('schedules').controller('ScheduleCtrl', function($scope, $location, Course) {
    //var course = Course.create({name: "Physicology", courseId: "PSY-800", level: 400, credits: 3 }); // { title: 'How to Cook', id: 45 }
    // course.save().then(function (course) {
    //   console.log(course)
    // })
    // Course.find(33).then(function(course) {
    //     console.log(course); // { title: 'How to Cook', id: 45 }
    //     // document 45 has already been injected into the store at this point
    //     console.log(Course.get(33)); // { title: 'How to Cook', id: 45 }
    // });

    $scope.courses = [];
    $scope.showingStarred = false;

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
});