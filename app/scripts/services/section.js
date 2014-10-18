'use strict';

angular.module('schedules').factory('Section', ['DS',
    function (DS) {
      var Section = DS.defineResource({
        name: 'section',
        baseUrl: 'http://localhost:1337/',

        methods: {

        }
      });


      return Section;
    }
]);