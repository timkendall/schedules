'use strict';

angular.module('schedules').factory('Catalog', [
    function () {


      return {
        2014Catalog: [
          { id: 'CPSC-353-01', course: 'CPSC-353', section: '1', name: 'Computer Networks & Administration', professorName: 'Michael Fahy', professorId: '334', totalSpots: 30, availableSpots: 12, waitlist: 0 }
        ]
      }
    }
  ]);
