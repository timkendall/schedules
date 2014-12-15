'use strict';

angular.module('schedules').factory('Section', ['DS',
    function (DS) {
      var Section = DS.defineResource({
        name: 'section',
        baseUrl: 'http://107.170.253.85:1337/',

        relations: {
          // hasOne: {
          //   professor: {
          //     localField: 'professor',
          //     foreignKey: 'id'
          //   }
          // },

          // belongsTo: {
          //     course: {
          //         localKey: 'id',
          //         localField: 'sections',
          //         parent: true
          //     }
          // }
        },

        methods: {

        }
      });


      return Section;
    }
]);