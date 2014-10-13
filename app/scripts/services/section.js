'use strict';

//Articles service used for articles REST endpoint
angular.module('schedules').factory('Section', ['$resource',
  function($resource) {
    return $resource('section/:sectionId', {
      sectionId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);