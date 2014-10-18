'use strict';

angular.module('schedules').factory('Major', ['DS',
    function (DS) {
      var Major = DS.defineResource({
        name: 'major',
        baseUrl: 'http://localhost:1337/',

        methods: {

        }
      });


      return Major;
    }
]);