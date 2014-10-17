'use strict';

angular.module('schedules').factory('Professor', ['DS',
    function (DS) {
      var Professor = DS.defineResource({
        name: 'professor',
        baseUrl: 'http://localhost:1337/',

        methods: {

        }
      });


      return Professor;
    }
]);