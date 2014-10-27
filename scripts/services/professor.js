'use strict';

angular.module('schedules').factory('Professor', ['DS',
    function (DS) {
      var Professor = DS.defineResource({
        name: 'professor',
        baseUrl: 'http://107.170.253.85:1337/',

        methods: {

        }
      });


      return Professor;
    }
]);