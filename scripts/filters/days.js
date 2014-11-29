'use strict';

/*
 * Description: Takes in days array (ex. ['Mon', 'Wed', 'Fr']) and outputs a shorthand
 * days string (ex. 'MWF')
 */

angular.module('schedules').filter('days', function () {
  return function (days) {

    var daysString = '';

    days.forEach(function (day, index) {
      if (index == days.length - 1) return daysString += day; // last day
      daysString += day + ', ';
    });

    return daysString;
  }
});