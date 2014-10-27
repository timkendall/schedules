'use strict';

/*
 * Description: Takes in days array (ex. ['Mon', 'Wed', 'Fr']) and outputs a shorthand
 * days string (ex. 'MWF')
 */

angular.module('schedules').filter('days', function () {
  return function (days) {

    var daysString = '';

    days.forEach(function (day) {
      switch (day) {
        case 'Mon':
          daysString += 'M';
          break;
        case 'Tue':
          daysString += 'T';
          break;
        case 'Wed':
          daysString += 'W';
          break;
        case 'Thu':
          daysString += 'Th';
          break;
        case 'Fri':
          daysString += 'F';
          break;
        case 'Sat':
          daysString += 'S';
          break;
        default:
          break;
      }
    });

    return daysString;
  }
});