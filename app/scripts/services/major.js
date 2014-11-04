'use strict';

angular.module('schedules').factory('Major', ['DS',
    function (DS) {
      var Major = DS.defineResource({
        name: 'major',
        baseUrl: 'http://107.170.253.85:1337/',

        methods: {

        }
      });


      return Major;
    }
]);