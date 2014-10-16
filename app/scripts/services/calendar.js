'use strict';

angular.module('schedules').factory('Calendar', [

  function ($q, $http) {
    /* Perhaps have options to pull in and parse data into event objects from google calendar */
    function Calendar () {
      var self = this;
      /*
       * Hold courses that are part of the schedule
       */
      this.courses = [];
      // this.courses.mondays = [];
      // this.courses.tuesdays = [];
      // this.courses.wednesdays = [];
      // this.courses.thursdays = [];
      // this.courses.fridays = [];
      // this.courses.saturdays = [];
      /*
       * Options - these can be set by the user
       */
      this.options = {
        earliest: 8,
        latest: 9,
        preferEvening: null,
        preferAfternoon: null,
        preferMorning: null,
        minimizeGaps: null,
        maximizeGaps: null,
        minimizeDays: null,
        maximizeDays: null
      };
      /*
       * Hold the generated schedules
       */
      this.schedules = [];
      /*
       * Primary function - generate array of schedules based on courses and options
       */
      this.generateSchedules = function () {

      }
      /*
       * Course getter by day
       */
      this.getCoursesOn = function (day) {
        var courses = [];
        self.courses.forEach(function (course, index) {
          if (course.meets[day]) courses.push(course);
        });
        return courses;
      }
    }

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