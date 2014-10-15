'use strict';
//Articles service used for articles REST endpoint
angular.module('schedules').factory('Course', ['ActiveResource',
    function (ActiveResource) {

        function Course (data) {
           this.number('id'); // this is the primary key, gets set by DB

           this.string('courseId');
           this.string('name');
           this.string('description');
           //this.string('major');
           //this.number('level');
           this.number('credits');

           // Pull major from courseId (ex. 'CPSC'-200)
           // this.computedProperty('major', function () {
           //    return this.courseId.substring(0, this.courseId.indexOf('-'));
           //  }, 'courseId');

           // // Pull level from courseID (ex. CPSC-'200')
           // this.computedProperty('level', function () {
           //    return this.courseId.substring(this.courseId.indexOf('-'), this.courseId.length - 1);
           //  }, 'courseId');


           // Relations
           //this.hasMany('sections');
        };

        // Inherit ActiveResource functionality
        Course.inherits(ActiveResource.Base);

        // Set API endpoints
        Course.api.set('http://107.170.253.85:1337/');

        // Cleanup
        //Course.dependentDestroy('sections');

        return Course;
    }
]);