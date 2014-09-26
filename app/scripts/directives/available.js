'use strict';

angular.module('schedules').directive('available', function () {
  return {
    restrict: 'E',
    scope: {
      max: '@max',
      taken: '@taken'
    },

    link: function (scope, element, attr) {

      /*
       * Setup
       */


      // Setup drawing area
      var canvas = Snap(8, 60);
      element.append(canvas.node);

      // Draw backdrop
      var backdrop = canvas.rect(0, 0, 8, 60, 3, 3);
      backdrop.attr({
        fill: 'rgba(0,0,0,0.5)'
      });

      // Calculate height
      var filledPercent = Math.round((scope.taken / scope.max) * 100);
      var pixels = Math.round(60 * (filledPercent / 100));

      // Calculate color
      var color = '#9CD67F';
      if (filledPercent >= 80) color = '#F38286';
      else if (filledPercent >= 50) color = '#F4A048';

      // Draw full bar
      var indicator = canvas.rect(0, 0, 8, 0, 3, 3);
      indicator.attr({
        fill: color
      });

      setTimeout(function () {
        indicator.animate({
          height: pixels
        }, 1000);
      }, 500)

    }
  };
});