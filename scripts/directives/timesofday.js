'use strict';

angular.module('schedules').directive('timesofday', function () {
  return {
    restrict: 'E',
    scope: {

    },

    link: function (scope, element, attr) {

      /*
       * Setup
       */

      // Setup drawing area
      var canvas = Snap(120, 120);
      element.append(canvas.node);

      // Draw evening backdrop
      var backdrop = canvas.circle(60, 60, 15);
      var backdrop2 = canvas.circle(60, 60, 25);
      var backdrop3 = canvas.circle(60, 60, 35);
      backdrop.attr({
        stroke: attr.background,
        fill: 'none',
        strokeWidth: 8
      });
      backdrop2.attr({
        stroke: attr.background,
        fill: 'none',
        strokeWidth: 8
      });
      backdrop3.attr({
        stroke: attr.background,
        fill: 'none',
        strokeWidth: 8
      });

      var eveningPerecent = generateArc(30 / 100, canvas.gradient("l(0, 0, 0, 1)#475561-#333356"), 40, 60);
      var afternoonPerecent = generateArc(50 / 100, canvas.gradient("l(0, 0, 0, 1)#FCCB95-#FBC17E"), 64, 60);
      var morningPerecent = generateArc(20 / 100, canvas.gradient("l(0, 0, 0, 1)#DB8FA8-#FD5176"), 87, 60);

      function generateArc(percent, color, size, center) {
        var canvasSize = size,
          centre = center,
          radius = canvasSize * 0.8 / 2,
          path = "",
          arc = canvas.path(path),
          startY = centre - radius;
        var endpoint = percent * 360;

        setTimeout(function () {
          Snap.animate(0, endpoint, function (val) {

            arc.remove();

            var d = val,
              dr = d - 90,
              radians = Math.PI * (dr) / 180,
              endx = centre + radius * Math.cos(radians),
              endy = centre + radius * Math.sin(radians),
              largeArc = d > 180 ? 1 : 0,
              path = "M" + centre + "," + startY + " A" + radius + "," + radius + " 0 " + largeArc + ",1 " + endx + "," + endy;

            arc = canvas.path(path);
            arc.attr({
              stroke: color,
              fill: 'none',
              strokeWidth: 8,
              'stroke-linecap': 'round'
            });

          }, 1000, mina.easeinout);
        }, 500);

        return arc;
      }

      setInterval(function () {
        // var d = val,
        //     dr = d - 90,
        //   radians = Math.PI * (dr) / 180,
        //   endx = centre + radius * Math.cos(radians),
        //   endy = centre + radius * Math.sin(radians);

        // var  path = "M" + centre + "," + startY + " A" + radius + "," + radius + " 0 " + largeArc + ",1 " + endx + "," + endy;
        // path.animate({ d: path }, 1000, mina.bounce);

      }, 3000)

      // setInterval(function () {
      //   var val = Math.floor(Math.random() * 99) + 1;
      //   run(val / 100)
      //   console.log('running')
      // }, 4500)

    }
  };
});