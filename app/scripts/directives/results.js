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

      $scope.focusIndex = 0;

      $scope.add = function (index) {
        $scope.chosen.push($scope.filteredCourses[index]);
        $scope.addingCourse = false;
        $scope.search = null;

        $scope.$emit('AddCourse:cancel');
      };

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

      $scope.$on('keydown', function( msg, code ) {
        $scope.keys.forEach(function(o) {
          if ( o.code !== code ) { return; }
          o.action();
          $scope.$apply();
        });
      });
    },

    link: function (scope, element, attr) {
      console.log('results direftive activated')


      // Doesn't work :\
      // element.bind('keydown', function (event) {
      //   console.log('keydown')
      //   scope.$broadcast('keydown', event.keyCode);

      // });

      $document.bind('keydown', function (event) {
        console.log('keydown')
        scope.$broadcast('keydown', event.keyCode);

      });



     }
  };
});