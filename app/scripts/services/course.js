'use strict';

//Articles service used for articles REST endpoint
angular.module('schedules').factory('Course', ['$resource',
  function($resource) {
    return $resource('course/:courseId', {
      courseId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);