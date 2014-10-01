/*
 * calendar.js
 *
 * Display the school week
 */

'use strict';

angular.module('schedules').directive('event', function ($timeout) {
  return {
    restrict: 'E',
    scope: {
      time: '=time',
      duration: '=duration',
      major: '=major'
    },

    link: function (scope, element, attr) {
      console.log(scope.time)
      //console.log((parseInt((scope.time).match(/\d+/), 10)))

      // Choose a random color
      var colors = [
        'yellow',
        'orange',
        'purple',
        'green',
        'red'
      ]

      // Hide element while changes are made to position and height
      element.css('display', 'none');

      switch(scope.major) {
        case 'MATH':
          element.addClass('yellow');
          break;
        case 'CPSC':
          element.addClass('orange');
          break;
        case 'ECON':
          element.addClass('purple');
          break;
        case 'MGMT':
          element.addClass('green');
          break;
        case 'ACTG':
          element.addClass('red');
          break;
        case 'FIN':
          element.addClass('yellow');
          break;
        case 'MGSC':
          element.addClass('orange');
          break;
        case 'SE':
          element.addClass('purple');
          break;
        case 'PHYS':
          element.addClass('green');
          break;
        case 'CHEM':
          element.addClass('red');
          break;
        case 'ENG':
          element.addClass('yellow');
          break;
        case 'BUS':
          element.addClass('orange');
          break;
        case 'MKTG':
          element.addClass('purple');
          break;
        case 'KINE':
          element.addClass('green');
          break;
        case 'ART':
          element.addClass('red');
          break;
        case 'HIST':
          element.addClass('yellow');
          break;
        case 'DANC':
          element.addClass('orange');
          break;
        case 'PSY':
          element.addClass('purple');
          break;
        case 'SOC':
          element.addClass('green');
          break;
        case 'BIOL':
          element.addClass('red');
          break;
        case 'FTV':
          element.addClass('orange');
          break;
        default:
          break;
      }


      /* Note: This is based on a height of 50px per hour */
      var heights = {
        '50': 42, // 50min
        '75': 73, // 1hr 15min 13
        '170': 162, // 2hr 50min
        '230': 222 // 3hr 50min
      }

      // Set height
      switch (scope.duration) {
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

      // Set position
      var start = (scope.time).substr(0, (scope.time).indexOf('-'));

      if (start.indexOf('8:00am') > -1) {
        translateY(element, 0);
      } else if (start.indexOf('8:30am') > -1) {
        translateY(element, 25);
      } else if (start.indexOf('9:00am') > -1) {
        translateY(element, 50);
      } else if (start.indexOf('9:30am') > -1) {
        translateY(element, 75);
      } else if (start.indexOf('10:00am') > -1) {
        translateY(element, 100);
      } else if (start.indexOf('10:30am') > -1) {
        translateY(element, 125);
      } else if (start.indexOf('11:00am') > -1) {
        translateY(element, 150);
      } else if (start.indexOf('11:30am') > -1) {
        translateY(element, 175);
      } else if (start.indexOf('12:00pm') > -1) {
        translateY(element, 200);
      } else if (start.indexOf('12:30pm') > -1) {
        translateY(element, 225);
      } else if (start.indexOf('1:00pm') > -1) {
        translateY(element, 250);
      } else if (start.indexOf('1:30pm') > -1) {
        translateY(element, 275);
      } else if (start.indexOf('2:00pm') > -1) {
        translateY(element, 300);
      } else if (start.indexOf('2:30pm') > -1) {
        translateY(element, 325);
      } else if (start.indexOf('3:00pm') > -1) {
        translateY(element, 350);
      } else if (start.indexOf('3:30pm') > -1) {
        translateY(element, 375);
      } else if (start.indexOf('4:00pm') > -1) {
        translateY(element, 400);
      } else if (start.indexOf('4:30pm') > -1) {
        translateY(element, 425);
      } else if (start.indexOf('5:00pm') > -1) {
        translateY(element, 450);
      } else if (start.indexOf('5:30pm') > -1) {
        translateY(element, 475);
      } else if (start.indexOf('6:00pm') > -1) {
        translateY(element, 500);
      } else if (start.indexOf('6:30pm') > -1) {
        translateY(element, 525);
      } else if (start.indexOf('7:00pm') > -1) {
        translateY(element, 550);
      } else if (start.indexOf('7:30pm') > -1) {
        translateY(element, 575);
      } else if (start.indexOf('8:00pm') > -1) {
        translateY(element, 600);
      } else if (start.indexOf('8:30pm') > -1) {
        translateY(element, 625);
      } else if (start.indexOf('9:00pm') > -1) {
        translateY(element, 650);
      }

      // Show element
      element.css('display', 'block');

    }
  };
});