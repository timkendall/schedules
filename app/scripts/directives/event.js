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

            /*
             * RENDERING
             */
            // Hide element while changes are made to position and height
            element.css('display', 'none');
            element.addClass(scope.event.color)

            /* Note: This is based on a height of 50px per hour */

            // hardcode for now
            var duration = formatTime(scope.event.end) - formatTime(scope.event.start);
            console.log(duration)

            element.css('height', Math.floor(duration*50) + 'px');

            var start = formatTime(scope.event.start) - 8; // Normalize hours to start at 8
            // Set position
            translateY(element, start*50); // number of hours * height of 1 hr

             // Show element
            if (scope.event.selected) element.css('display', 'block');

            function translateY (element, pixels) {
                var ammount = 16 + pixels;
                element.css('top', ammount + 'px');
            }

            function formatTime (time) {
              /*
               * time -> int
               * Expect a 24 hour time and output as decimal
               */
               if (time < 100) { // 12AM times
                var minutes = time / 60;
                return 12 + minutes;
               } else if (time < 1000) {
                var timeString = time.toString(),
                 whole = parseInt(timeString[0] + '0' + '0');

                var hours = parseInt(timeString[0])
                var minutes  = (time - whole) / 60;
                return hours + minutes;
               } else {
                 var timeString = time.toString();
                 var hours = parseInt(timeString[0] + timeString[1]);
                 var minutes = parseInt(timeString[2] + timeString[3]) / 60;
                 return hours + minutes;
               }
            }


            /*
             * INTERACTIONS
             */

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