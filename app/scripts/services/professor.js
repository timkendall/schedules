'use strict';

//Articles service used for articles REST endpoint
angular.module('schedules').factory('Professor', ['$resource',
  function($resource) {
    return $resource('professor/:professorId', {
      articleId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);