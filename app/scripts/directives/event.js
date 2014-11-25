/*
 * calendar.js
 *
 * Display the school week
 */

'use strict';

angular.module('schedules').directive('event', function ($timeout, $rootScope) {
  return {
    restrict: 'A',
    scope: {
      event: '=event'
    },

    link: function (scope, element, attr) {


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
      var duration = 50;

      // Set height
      switch (duration) {
      case 50:
        element.css('height', heights['50'] + 'px');
        break;
      case 75:
        element.css('height', heights['75'] + 'px');
        break;
      case 170:
        element.css('height', heights['170'] + 'px');
        break;
      case 230:
        element.css('height', heights['230'] + 'px');
        break;
      default:
        break;
      }

      function translateY(element, pixels) {
        var ammount = 16 + pixels;
        element.css('top', ammount + 'px');
      }


      // Normalize timeformat ex.'09:00 AM'
      var start = Time(scope.event.start).format('hh:mmAM')
      // Set position
      if (start.indexOf('8:00AM') > -1) {
        translateY(element, 0);
      } else if (start.indexOf('8:30AM') > -1) {
        translateY(element, 25);
      } else if (start.indexOf('9:00AM') > -1) {
        translateY(element, 50);
      } else if (start.indexOf('9:30AM') > -1) {
        translateY(element, 75);
      } else if (start.indexOf('10:00AM') > -1) {
        translateY(element, 100);
      } else if (start.indexOf('10:30AM') > -1) {
        translateY(element, 125);
      } else if (start.indexOf('11:00AM') > -1) {
        translateY(element, 150);
      } else if (start.indexOf('11:30AM') > -1) {
        translateY(element, 175);
      } else if (start.indexOf('12:00PM') > -1) {
        translateY(element, 200);
      } else if (start.indexOf('12:30PM') > -1) {
        translateY(element, 225);
      } else if (start.indexOf('1:00PM') > -1) {
        translateY(element, 250);
      } else if (start.indexOf('1:30PM') > -1) {
        translateY(element, 275);
      } else if (start.indexOf('2:00PM') > -1) {
        translateY(element, 300);
      } else if (start.indexOf('2:30PM') > -1) {
        translateY(element, 325);
      } else if (start.indexOf('3:00PM') > -1) {
        translateY(element, 350);
      } else if (start.indexOf('3:30PM') > -1) {
        translateY(element, 375);
      } else if (start.indexOf('4:00PM') > -1) {
        translateY(element, 400);
      } else if (start.indexOf('4:30PM') > -1) {
        translateY(element, 425);
      } else if (start.indexOf('5:00PM') > -1) {
        translateY(element, 450);
      } else if (start.indexOf('5:30PM') > -1) {
        translateY(element, 475);
      } else if (start.indexOf('6:00PM') > -1) {
        translateY(element, 500);
      } else if (start.indexOf('6:30PM') > -1) {
        translateY(element, 525);
      } else if (start.indexOf('7:00PM') > -1) {
        translateY(element, 550);
      } else if (start.indexOf('7:30PM') > -1) {
        translateY(element, 575);
      } else if (start.indexOf('8:00PM') > -1) {
        translateY(element, 600);
      } else if (start.indexOf('8:30PM') > -1) {
        translateY(element, 625);
      } else if (start.indexOf('9:00PM') > -1) {
        translateY(element, 650);
      }

      // Show element
      element.css('display', 'block');

      // Emit event on hover
      element.on('mouseover', function () {
        if (scope.event.selected) {
          $rootScope.$emit('show all sections', { course: scope.event.course});
        }
      });

      element.on('mouseleave', function () {
        if (scope.event.selected) $rootScope.$emit('hide all sections', { course: scope.event.course});
      });

      // Show the event
      $rootScope.$on('show all sections', function (event, data) {
        if (scope.event.course === data.course && !scope.event.selected) {
          element.css('display', 'block');
        }
      });

      // Hide the event
      $rootScope.$on('hide all sections', function (event, data) {
        if (scope.event.course === data.course && !scope.event.selected) {
          element.addClass('fadeOut');
          setTimeout(function () {
            element.css('display', 'none');
          },250)

        }
      });
    }
  };
});