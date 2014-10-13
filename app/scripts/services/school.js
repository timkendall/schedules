'use strict';

//Articles service used for articles REST endpoint
angular.module('schedules').factory('School', ['$resource',
  function($resource) {
    return $resource('school/:schoolId', {
      schoolId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);