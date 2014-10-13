'use strict';

//Articles service used for articles REST endpoint
angular.module('schedules').factory('Major', ['$resource',
  function($resource) {
    return $resource('major/:majorId', {
      majorId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);