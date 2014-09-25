'use strict';

angular.module('schedules').factory('User', [

  function ($q, $http) {
    /*
     * Would actually handle authentication with satellizer
     */

    var user = {};

    user.firstName = 'Leo';
    user.lastName = 'Hastings';
    user.profileImg = 'https://s3.amazonaws.com/uifaces/faces/twitter/danbenoni/128.jpg';
    user.schedule = {
      registered: [],
      register: [],
      drop: [],
      credits: 0,
      morningClasses: 0,
      afternoonClasses: 0,
      eveningClasses: 0
    };

    function checkConflicts (schedule, course) {
      /*
       * TODO: Compare times for conflicts
       */

      // Make sure course isn't already picked
      if (_.contains(schedule.register, 1)) return true;
      else {
        return false;
      }
    }

    function timeOfDay (course) {
      var time = course.time;

      if (time.indexOf('am') > -1) return 'morning'
      else return 'evening'
    }

    return {
      firstName: user.firstName,
      lastName: user.lastName,
      profileImg: user.profileImg,
      schedule: user.schedule,

      addCourse: function (course) {
        // Check conflicts
        var conflicts = checkConflicts(user.schedule, course);

        if (conflicts) {
          return false;
        } else {
          user.schedule.register.push(course);
          // Update schedule data
          user.schedule.credits += course.credits;
          var time = timeOfDay(course);
          if (time === 'morning') user.schedule.morningClasses += 1;
          else if (time === 'afternoon') user.schedule.morningClasses += 1;
          else if (time === 'evening') user.schedule.eveningClasses += 1;

          return true;
        }
      },

      removeCourse: function (course) {

      },

      register: function () {
        var deferred = $q.defer();

        // Submit schedule to server
        $http({
          method: 'POST',
          url: '/someUrl',
          data: user.schedule.register
        }).
        success(function (data, status, headers, config) {
          if (data.registeredAll) {
            // Provide a reciept
            deferred.resolve({
              message: 'Succesfully registered for 5 courses in the Fall 2014 semester',
              registered: [],
              failed: [],
              registeredAll: true
            });
          } else {
            // Unable to register for some or all of specified courses
            deferred.resolve({
              message: 'Succesfully registered for 3 courses in the Fall 2014 semester',
              registered: [],
              failed: [],
              registeredAll: false
            });
          }
        }).
        error(function (data, status, headers, config) {
          // Something went wrong with the POST
          deferred.reject({
            error: data
          });
        });

        return deferred.promise;
      },

      drop: function () {
        var deferred = $q.defer();

        // Submit schedule to server
        $http({
          method: 'POST',
          url: '/someUrl',
          data: user.schedule.drop
        }).
        success(function (data, status, headers, config) {
          if (data.droppedAll) {
            // Provide a reciept
            deferred.resolve({
              message: 'Succesfully dropped for 2 courses in the Fall 2014 semester',
              dropped: [],
              failed: [],
              droppedAll: true
            });
          } else {
            // Unable to drop some or all of specified courses
            deferred.resolve({
              message: 'Succesfully dropped for 1 course in the Fall 2014 semester',
              dropped: [],
              failed: [],
              droppedAll: false
            });
          }
        }).
        error(function (data, status, headers, config) {
          // Something went wrong with the POST
          deferred.reject({
            error: data
          });
        });

        return deferred.promise;
      }
    }
  }
]);