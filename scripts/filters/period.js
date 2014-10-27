'use strict';

/*
 * Description: Takes in a time string (ex. '8:50 AM') and outputs just the period
 * (ex. 'AM')
 */

angular.module('schedules').filter('period', function () {
  return function (time) {

    var indexAM = time.indexOf('A'),
      indexPM = time.indexOf('P');

    if (indexAM !== -1)  return time.substring(indexAM, time.length);
    else if (indexPM !== -1) return time.substring(indexPM, time.length);
    else throw new Error('Invalid time format');

  }
});