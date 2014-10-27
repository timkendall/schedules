'use strict';

/*
 * Description: Takes in a time string (ex. '8:50 AM') and outputs just the period
 * (ex. 'AM')
 */

angular.module('schedules').filter('period', function () {
  return function (time) {
    // Fix format
    var formattedTime = Time(time).format('hh:mm AM');

    var indexAM = formattedTime.indexOf('A'),
      indexPM = formattedTime.indexOf('P');

    if (indexAM !== -1)  return formattedTime.substring(indexAM, formattedTime.length);
    else if (indexPM !== -1) return formattedTime.substring(indexPM, formattedTime.length);
    else throw new Error('Invalid time format');

  }
});