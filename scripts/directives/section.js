/*
 * calendar.js
 *
 * Display the school week
 */
'use strict';
angular.module('schedules').directive('section', function (Section) {
    return {
        restrict: 'A',
        link: function(scope, element, attr) {

            scope.days = {};
            scope.section = {
              course: scope.course.id,
              start: '',
              end: '',
              meets: []
            };

            scope.sectionsVisible = false;
            scope.createEnabled = false;

            // Validate time inputs
            scope.$watch('section.start', function (newVal, oldVal) {
              if(Time.isValid(newVal)) scope.createEnabled = true;
              else  scope.createEnabled = false;
            });

            // Convert days to array
            scope.$watch('days', function (newVal, oldVal) {
              // Clear old meets array
              scope.section.meets.length = 0;
              if (newVal.mon) scope.section.meets.push('Mon');
              if (newVal.tue) scope.section.meets.push('Tue');
              if (newVal.wed) scope.section.meets.push('Wed');
              if (newVal.thu) scope.section.meets.push('Thu');
              if (newVal.fri) scope.section.meets.push('Fri');
              if (newVal.sat) scope.section.meets.push('Sat');
            }, true);

            scope.toggleSections = function() {
                console.log('toggled')
                if (scope.sectionsVisible) scope.sectionsVisible = false;
                else scope.sectionsVisible = true;
            }
            scope.create = function() {
                if (!scope.createEnabled) return;
                // Calculate duration
                console.log(scope.section)
                // Save
                Section.create(scope.section).then(function(section) {
                  // Clear old data
                   scope.section = {
                      course: scope.course.id,
                       start: '',
                      end: '',
                      meets: ['Mon', 'Wed', 'Fri']
                    };
                  // Add new section
                  scope.course.sections.push(section);

                }).
                catch (function(error) {
                    scope.error = error;
                    console.log(error);
                    alert(scope.error.data);
                })
            }
        }
    };
});