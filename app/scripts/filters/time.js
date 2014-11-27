'use strict';

/*
 * Description: Takes in a time string (ex. '13.25') and output 1:15PM
 */

angular.module('schedules').filter('time', function () {
  return function (time) {
    var hour = Math.floor(time);
    var minutes = Math.round((time % 1) * 60);

    return (hour > 12 ? hour - 12 : hour) + ':' + (minutes < 10 ? minutes + '0' : minutes) + '' + (hour < 12 ? 'am' : 'pm');
  }
});