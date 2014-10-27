'use strict';

angular.module('schedules').factory('User', ['DS',
    function (DS) {
      var User = DS.defineResource({
        name: 'user',
        baseUrl: 'http://localhost:1337/',

        methods: {

        }
      });


      return User;
    }
]);