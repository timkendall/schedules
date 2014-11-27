/*
 * calendar.js
 *
 * Display the school week
 */
'use strict';
angular.module('schedules').directive('event', function($timeout, $rootScope) {
    return {
        restrict: 'A',
        scope: {
            event: '=event'
        },
        link: function(scope, element, attr) {
            // Hide element while changes are made to position and height
            element.css('display', 'none');
            element.addClass(scope.event.color)
            /* Note: This is based on a height of 50px per hour */
            var heights = {
                '50': 42, // 50min
                '75': 73, // 1hr 15min 13
                '170': 162, // 2hr 50min
                '230': 222 // 3hr 50min
            }
            // hardcode for now
            var duration = scope.event.end - scope.event.start;
            element.css('height', duration*50 + 'px');

            function translateY(element, pixels) {
                var ammount = 16 + pixels;
                element.css('top', ammount + 'px');
            }

            var start = scope.event.start - 8; // Normalize hours to start at 8
            // Set position
            translateY(element, start*50); // number of hours * height of 1 hr

            // Show element
            if (scope.event.selected) element.css('display', 'block');
            // Emit event on hover
            element.on('mouseover', function() {
                if (scope.event.selected) {
                    $rootScope.$broadcast('show all sections', {
                        course: scope.event.course
                    });
                }
            });
            element.on('mouseleave', function() {
                if (scope.event.selected) $rootScope.$broadcast('hide all sections', { course: scope.event.course });
            });
             // Show a single section
            scope.$on('show section', function(event, data) {
                if (scope.event.course === data.course && scope.event.id === data.section  && !scope.event.selected) {
                    element.css('display', 'block');
                }
            });
             // Show a single section
            scope.$on('hide section', function(event, data) {
                if (scope.event.course === data.course && scope.event.id === data.section  && !scope.event.selected) {
                    element.addClass('fadeOut');
                    // Hide elemnt for real after animation is done
                    setTimeout(function () {
                      element.css('display', 'none');
                      element.removeClass('fadeOut');
                    }, 300)
                }
            });
            // Show the event
            scope.$on('show all sections', function(event, data) {
                if (scope.event.course === data.course && !scope.event.selected) {
                    element.css('display', 'block');
                }
            });
            // Hide the event
            scope.$on('hide all sections', function(event, data) {
                if (scope.event.course === data.course && !scope.event.selected) {
                    element.addClass('fadeOut');
                    // Hide elemnt for real after animation is done
                    setTimeout(function () {
                      element.css('display', 'none');
                      element.removeClass('fadeOut');
                    }, 300);
                }
            });

        }
    };
});