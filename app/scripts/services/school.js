'use strict';

angular.module('schedules').factory('School', ['DS',
    function (DS) {
      var School = DS.defineResource({
        name: 'school',
        baseUrl: 'http://localhost:1337/',

        methods: {

        }
      });


      return School;
    }
]);