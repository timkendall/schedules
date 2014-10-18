'use strict';

angular.module('schedules').factory('Course', ['DS',
    function (DS) {
      var Course = DS.defineResource({
        name: 'course',
        baseUrl: 'http://localhost:1337/',

        methods: {

        }
      });


      return Course;
    }
]);