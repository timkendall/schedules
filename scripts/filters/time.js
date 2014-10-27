'use strict';

/*
 * Description: Takes in a time string (ex. '8:50 AM') and outputs just the time
 * (ex. '8:50')
 */

angular.module('schedules').filter('time', function () {
  return function (time) {

    var indexAM = time.indexOf('A'),
      indexPM = time.indexOf('P');

    if (indexAM !== -1)  return time.substring(0, indexAM);
    else if (indexPM !== -1) return time.substring(0, indexPM);
    else throw new Error('Invalid time format');

  }
});