/*
 * calendar.js
 *
 * Display the school week
 */

'use strict';

angular.module('schedules').directive('results', function ($timeout, $document) {
  return {
    restrict: 'A',

    controller: function ($scope) {

      // Foucs index - to highlight current course
      $scope.focusIndex = 0;

      $scope.changeFocusIndex = function (index) {
        $scope.focusIndex = index;
      }

      /*
       * Provide actions for keyboard events
       */
      $scope.keys = [];
      $scope.keys.push({ code: 13, action: function() {
          // Make sure course is there to add
          if ($scope.filteredCourses.length > 0 && $scope.filteredCourses[$scope.focusIndex]) $scope.add($scope.focusIndex);
          else if ($scope.validated) {
            $scope.complete(); // Create a new course
          }
        }
      });
      $scope.keys.push({ code: 38, action: function() {
          $scope.focusIndex--;
          if ($scope.focusIndex < 0) $scope.focusIndex = 0;
        }
      });
      $scope.keys.push({ code: 40, action: function() {
          $scope.focusIndex++;
          if ($scope.focusIndex > $scope.filteredCourses.length -1) $scope.focusIndex = 0;
        }
      });
      $scope.keys.push({ code: 27, action: function() {
          $scope.cancel();
        }
      });

      /*
       * Execute an action on a keystroke event
       */
      $scope.$on('keydown', function( msg, code ) {
        $scope.keys.forEach(function(o) {
          if ( o.code !== code ) { return; }
          o.action();
          $scope.$apply();
        });
      });
    },

    link: function (scope, element, attr) {

      // Doesn't work :\
      // element.bind('keydown', function (event) {
      //   console.log('keydown')
      //   scope.$broadcast('keydown', event.keyCode);

      // });

      /*
       * Emit a keystroke event
       */
      $document.bind('keydown', function (event) {
        console.log('keydown')
        scope.$broadcast('keydown', event.keyCode);

      });
     }
  };
});