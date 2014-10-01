'use strict';

angular.module('schedules').factory('Calendar', [

  function ($q, $http) {
    /* Perhaps have options to pull in and parse data into event objects from google calendar */

    return {
      earliest: '8AM',
      latest: '10PM',
      mondays: [],
      tuesdays: [],
      wednesdays: [],
      thursdays: [],
      fridays: [],
      saturdays: []
    }
  }
]);