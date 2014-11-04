'use strict';

angular.module('schedules').factory('Section', ['DS',
    function (DS) {
      var Section = DS.defineResource({
        name: 'section',
        baseUrl: 'http://107.170.253.85:1337/',

        methods: {

        }
      });


      return Section;
    }
]);