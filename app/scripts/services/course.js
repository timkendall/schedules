'use strict';

angular.module('schedules').factory('Course', ['DS',
    function (DS) {
      var Course = DS.defineResource({
        name: 'course',
        baseUrl: 'http://107.170.253.85:1337/',

        hasMany: {
            section: {
                localField: 'sections',
                foreignKey: 'id'
            }
        },

        methods: {

        }
      });


      return Course;
    }
]);