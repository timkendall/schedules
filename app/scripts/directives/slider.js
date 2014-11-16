/*
 * slider.js
 *
 * Wrap slider
 */
'use strict';
angular.module('schedules').directive('slider', function($timeout) {
    return {
        restrict: 'EA',
        link: function(scope, element, attr) {
            // Instantiate a slider
            scope.slider = new Slider("input.slider", {
                // initial options object
                precision: 1, // by hour
                tooltip: 'show',
                tooltip_split: true, // tooltip for each handle
                formatter: function (value) {
                  switch (value) {
                    case 8:
                      return '8am';
                    case 8.5:
                      return '8:30am';
                    case 9:
                      return '9am';
                    case 9.5:
                      return '9:30am';
                    case 10:
                      return '10am';
                    case 10.5:
                      return '10:30am';
                    case 11:
                      return '11am';
                    case 11.5:
                      return '11:30am';
                    case 12:
                      return '12pm';
                    case 12.5:
                      return '12:30pm';
                    case 13:
                      return '1pm';
                    case 13.5:
                      return '1:30pm';
                    case 14:
                      return '2pm';
                    case 14.5:
                      return '2:30pm';
                    case 15:
                      return '3pm';
                    case 15.5:
                      return '3:30pm';
                    case 16:
                      return '4pm';
                    case 16.5:
                      return '4:30pm';
                    case 17:
                      return '5pm';
                    case 17.5:
                      return '5:30pm';
                    case 18:
                      return '6pm';
                    case 18.5:
                      return '6:30pm';
                    case 19:
                      return '7pm';
                    case 19.5:
                      return '7:30pm';
                    case 20:
                      return '8pm';
                    case 20.5:
                      return '8:30pm';
                    case 21:
                      return '9pm';
                    case 21.5:
                      return '9:30pm';
                    case 22:
                      return '10pm';
                    default:
                      return value;
                  }
                }
            });

        }
    };
});

/*
 * Tie clicks to slider
 */
angular.module('schedules').directive('sliderScale', function($timeout) {
    return {
        restrict: 'A',
        link: function(scope, element, attr) {

          element.on('click', function () {
            if (attr.sliderScale < 15) {
              var currentMax = scope.slider.getValue()[1];
              scope.slider.setValue([parseInt(attr.sliderScale), currentMax]);
            } else {
              var currentMin = scope.slider.getValue()[0];
              scope.slider.setValue([currentMin, parseInt(attr.sliderScale)]);
            }

          })
        }
    };
});