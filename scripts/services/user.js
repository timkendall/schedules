'use strict';

angular.module('schedules').factory('User', ['DS',
    function (DS) {
      var User = DS.defineResource({
        name: 'user',
        baseUrl: 'http://107.170.253.85:1337/',

        methods: {

        }
      });


      return User;
    }
]);