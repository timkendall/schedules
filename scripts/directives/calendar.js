/*
 * calendar.js
 *
 * Display the school week
 */
'use strict';
angular.module('schedules').directive('calendar', function($timeout) {
    return {
        restrict: 'E',
        templateUrl: 'templates/calendar.html',
        scope: {
            courses: '=courses'
        },
        controller: function($scope, $rootScope) {
             /*
             * Hold the generated schedules
             */
            $scope.schedules = [];
            $scope.organizedSchedules = [];
            /*
             * Run generateSchedules() everytime the user's picked courses has changed
             */
            $scope.$watch('courses', function(newVal, oldVal) {
                if (newVal.length === 0) {
                  $scope.organizedSchedules.length = 0;
                  $scope.schedules.length = 0;
                  $scope.chosenSchedule = null;
                } else if (newVal.length > 0) {
                  // Clear old array
                  $scope.organizedSchedules.length = 0;
                  // Grab freshly generated schedules
                  $scope.schedules = generateSchedules(newVal);
                  /*
                   * This should be done on the fly; slot sections into days and generate metrics
                   */
                  $scope.schedules.forEach(function (schedule) {
                    $scope.organizedSchedules.push(new Schedule(schedule));
                  });

                  $scope.chosenSchedule = $scope.organizedSchedules[0];
                }
            }, true);

            /*
             * Switch between schedules
             */
             $scope.chooseSchedule = function (index) {
              console.log($scope.organizedSchedules[index])
                $scope.chosenSchedule = $scope.organizedSchedules[index];
              }

            /*
             * Options - these can be set by the user
             */
            $scope.options = {
                earliest: 8,
                latest: 21,
                preferEvening: null,
                preferAfternoon: null,
                preferMorning: null,
                minimizeGaps: null,
                maximizeGaps: null,
                minimizeDays: null,
                maximizeDays: null
            }
            /*
             * Calculate hours available
             */
            $scope.getHours = function() {
                return new Array($scope.options.latest - $scope.options.earliest + 1);
            }
            /*
             * Schedule class to hold courses and metrics about the schedule
             */
            function Schedule(sections) {
                this.sections = sections;
                this.credits = null;
                this.earliest = null; // earliest course
                this.latest = null; // latest course
                this.days = null; // days you have classes on
                this.maxClassesInADay = null;
                this.minClassesInADay = null;
                this.agony = null; // agony rating (based on earliest times, spread, days a week, 3hr+ classes)

                this.mondays = [];
                this.tuesdays = [];
                this.wednesdays = [];
                this.thursdays = [];
                this.fridays = [];
                this.saturdays = [];

                var colors = [
                  'yellow',
                  'orange',
                  'purple',
                  'green',
                  'red'
                ];

                /*
                 * Run to generate metrics
                 */
                (function(self) {
                  /*
                   * Slot sections into days
                   */
                  self.sections.forEach(function (section, index) {
                    // Weird naming
                    section.color = colors[Math.floor(Math.random() * colors.length -1) ];
                    section.section.meets.forEach(function (day) {
                      switch (day) {
                        case 'Mon':
                          self.mondays.push(section);
                          break;
                        case 'Tue':
                          self.tuesdays.push(section);
                          break;
                        case 'Wed':
                          self.wednesdays.push(section);
                          break;
                        case 'Thu':
                          self.thursdays.push(section);
                          break;
                        case 'Fri':
                          self.fridays.push(section);
                          break;
                        case 'Sat':
                          self.saturdays.push(section);
                          break;
                        default:
                          break;
                      }
                    });
                  });


                })(this);
            }
            /*
             * Primary function - generate array of schedules
             */

            function generateSchedules(courses) {
                var schedules = []; //Array of working schedules
                var schedulesGraph = new ScheduleGraph(courses);
                //Iterate through each graph, and look for valid schedules
                schedulesGraph.graphs.forEach(function(root, i) {
                    //Take the root of the graph and recursively try to make a non-conlficting schedule
                    createSchedules(root, [], function(validSchedule) { //Valid schedules are sent through callback and appended to schedules array
                        var schedule = convertNodesToSections(validSchedule);
                        schedules.push(schedule);
                    });
                });

                return schedules;
            }

            function createSchedules(node, arr, callback) {
                arr.push(node); //push node on schedule array
                if (node.edges.length === 0) { //Reached the last row of nodes (Yeay working schedule!)
                    callback(arr);
                    return;
                }
                //If not last row, then copy array, and only go to edges that are not conflicting.
                node.edges.forEach(function(n, i) {
                    var newArr = arr.slice(); //copy array
                    var conflict;
                    newArr.every(function(newArrNode) {
                        conflict = conflicts(newArrNode.section, n.section);
                    });
                    if (conflict) return;
                    else createSchedules(n, newArr, callback);
                });
            }

            function convertNodesToSections(nodes) {
                var sectionsSchedule = [];
                nodes.forEach(function(node) {
                    sectionsSchedule.push({
                        id: node.courseId,
                        section: node.section
                    });
                });
                return sectionsSchedule;
            }

            function Timespan(start, end) {
                /*
                 * Todo - handle multiday timespans
                 */
                // Make sure times are valid times
                if (!Time.isValid(start) || !Time.isValid(end)) throw new Error('Invalid start or end times');
                // Normalize format ex.'02:15 PM'
                this.start = new Time(start).format('hh:mm AM');
                this.end = new Time(end).format('hh:mm AM')
                var self = this;
                var convertToDateTime = function(time) {
                    // Assuming this format ex.'02:15 PM' for time
                    var hour = parseInt(time.substring(0, time.indexOf(':'))),
                        minutes = parseInt(time.substring(time.indexOf(':') + 1, time.indexOf(' ')));
                    // Handle PM
                    var period = time.substring(time.indexOf(' ') + 1, time.length);
                    if (period === 'PM') hour += 12;
                    return new Date('2014', '10', '24', hour.toString(), minutes.toString()).getTime();
                }
                this.overlaps = function(timespanB) {
                    // Convert times to Date() times
                    var startA = convertToDateTime(self.start),
                        endA = convertToDateTime(self.end),
                        startB = convertToDateTime(timespanB.start),
                        endB = convertToDateTime(timespanB.end);
                    if (startA >= endB) return false; // A range completely after B
                    else if (endA <= startB) return false; // A range completely before B
                    else return true; // Overlap
                }
            }

            /*
             * See if two sections conflict
             */
            function conflicts(sectionA, sectionB) {
                var sameDays = _.intersection(sectionA.meets, sectionB.meets);
                // Sections on different days
                if (sameDays.length === 0) return false;
                // Sections may be on one or more same days
                else {
                    var timespanA = new Timespan(sectionA.start, sectionA.end),
                        timespanB = new Timespan(sectionB.start, sectionB.end);
                    // Check if timespans overlap
                    if (timespanA.overlaps(timespanB)) return true;
                    else return false;
                }
            }

            function allCombos(courses) {
                var allSections = [];
                for (var i = 0; i < courses.length; ++i) {
                    // Add all sections to array
                    allSections.push.apply(allSections, courses[i].sections);
                }
            }

            function ScheduleGraph(courses) {
                this.courses = courses;
                this.graphs = []; //Total number of graphs, corrisponds to first course sections
                var self = this;
                this.courses[0].sections.forEach(function(section) {
                    self.graphs.push(new Node(courses[0], section));
                });
                this.courses.forEach(function(course, i) {
                    if (i === 0) //Already created nodes for first section
                        return;
                    var sectionNodes = []; //Convert course.sections to Nodes
                    course.sections.forEach(function(section, j) {
                        sectionNodes[j] = new Node(course, section);
                    });
                    //Iterate and push array of edges to lowest nodes
                    self.graphs.forEach(function(graph, k) {
                        pushToLowestEdges(self.graphs[k], sectionNodes);
                    });
                });

                function pushToLowestEdges(node, newNodes) {
                    if (node.edges.length === 0) { //We've reached the end of the graph
                        node.edges = newNodes;
                        return;
                    }
                    //Go through edges and look for last row of nodes
                    node.edges.forEach(function(n, i) {
                        pushToLowestEdges(n, newNodes);
                    });
                }
            }

            function Node(course, section) {
                this.courseId = course.courseId;
                this.section = section;
                this.edges = [];
            }
            /*
             * Course getter by day
             */
            function getCoursesOn(day) {
                var courses = [];
                self.courses.forEach(function(course, index) {
                    if (course.meets[day]) courses.push(course);
                });
                return courses;
            }
        },
        link: function(scope, element, attr) {
            var earliest = 7, // am
                latest = 22; // pm
            scope.hours = [];
            generateCalendar(earliest, latest);

            function generateCalendar(earliest, latest) {
                for (var i = earliest; i <= latest; ++i) {
                    var time = i;
                    // Some simple conversions for readability
                    if (i == 12) {
                        time = 'noon';
                    } else if (time > 12) {
                        time = time - 12;
                    }
                    scope.hours.push({
                        name: time.toString()
                    });
                }
            }
        }
    };
});