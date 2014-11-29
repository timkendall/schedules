'use strict';
/*
 * Description: Takes in a time string (ex. '13.25') and output 1:15PM
 */
angular.module('schedules').filter('time', function() {
    return function(time) {

        // Split time zone
        if (time < 1300) { // AM
          return toTimeString(time, 'am');
        } else { // PM
          var hrTime = time - 1200;
          return toTimeString(hrTime, 'pm');
        }

        function toTimeString(time, period) {
            /*
             * time -> int
             * period -> string
             */
            if (time < 100) {
                // 0000 -> 0059
                return time < 10 ? '12:' + '0' + time + period : '12:' + time + period;
            } else if (time < 1000) {
                // 0100 -> 0959
                var timeString = time.toString();
                return timeString[0] + ':' + timeString[1] + timeString[2] + period;
            } else {
                var timeString = time.toString();
                return timeString[0] + timeString[1] + ':' + timeString[2] + timeString[3] + period;
            }
        }

    }
});