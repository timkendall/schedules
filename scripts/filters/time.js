'use strict';

/*
 * Description: Takes in a time string (ex. '8:50 AM') and outputs just the time
 * (ex. '8:50')
 */

angular.module('schedules').filter('time', function () {
  return function (time) {
    // Fix format
    var formattedTime = Time(time).format('hh:mm AM');

    var indexAM = formattedTime.indexOf('A'),
      indexPM = formattedTime.indexOf('P');

    if (indexAM !== -1)  return formattedTime.substring(0, indexAM);
    else if (indexPM !== -1) return formattedTime.substring(0, indexPM);
    else throw new Error('Invalid time format');

  }
});