'use strict';
angular.module('schedules').factory('School', ['DS',
    function(DS) {
        var School = DS.defineResource({
            name: 'school',
            baseUrl: 'http://107.170.253.85:1337/',
            methods: {},
            hasMany: {
                section: {
                    localField: 'sections',
                    foreignKey: 'course'
                }
            }
        });
        return School;
    }
]);