var Time = require('time-js'),
  _ = require('lodash');

var courses = [
  {
    id: 'CPSC-200',
    name: 'Intro to C++',
    sections: [
      {
        meets: ['Tue', 'Thu'],
        start: '5:30pm', // 5:30PM
        end: '6:45pm' // 6:45PM
      }
    ]
  },

  {
    id: 'SPAN-101',
    name: 'Spanish 101',
    sections: [
      {
        meets: ['Mon', 'Wed', 'Fri'],
        start: '1pm', // 1PM
        end: '1:50pm' // 1:50PM
      },
      {
        meets: ['Mon', 'Wed', 'Fri'],
        start: '10am', // 10AM
        end: '10:50am' // 10:50AM
      },
      {
        meets: ['Tue', 'Thu'],
        start: '3pm', // 3PM
        end: '4:15pm' // 4:15PM
      }
    ]
  },

  {
    id: 'ACTG-400',
    name: 'Accounting',
    sections: [
      {
        meets: ['Tue', 'Thu'],
        start: '5:30pm', // 5:30PM
        end: '6:45pm' // 6:45PM
      },

      {
        meets: ['Mon', 'Wed'],
        start: '5:30pm', // 5:30PM
        end: '6:45pm' // 6:45PM
      }
    ]
  }

];

/*
 * Schedule class to hold courses and metrics about the schedule
 */
function Schedule (courses) {
  this.courses = courses;

  this.credits = null;
  this.earliest = null; // earliest course
  this.latest = null; // latest course
  this.days = null; // days you have classes on
  this.maxClassesInADay = null;
  this.minClassesInADay = null;

  this.agony = null; // agony rating (based on earliest times, spread, days a week, 3hr+ classes)

  /*
   * Run to generate metrics
   */
  (function (self) {

  })(this);
}

function generateSchedules (courses) {
  var schedules = [];

  courses.forEach(function (course, index, array) {

    course.sections.forEach(function (section, index, array) {

    });
  });

}

function createSchedule (course) {

}

function Timespan (start, end) {
  /*
   * Todo - handle multiday timespans
   */

  // Make sure times are valid times
  if (!Time.isValid(start) || !Time.isValid(end)) throw new Error('Invalid start or end times');
  // Normalize format ex.'02:15 PM'
  this.start = new Time(start).format('hh:mm AM');
  this.end = new Time(end).format('hh:mm AM')

  var self = this;

  var convertToDateTime = function (time) {
    // Assuming this format ex.'02:15 PM' for time
    var hour = parseInt(time.substring(0, time.indexOf(':'))),
      minutes = parseInt(time.substring(time.indexOf(':')+1, time.indexOf(' ')));
    // Handle PM
    var period = time.substring(time.indexOf(' ') + 1, time.length);
    if (period === 'PM') hour += 12;

    return new Date('2014','10','24', hour.toString(), minutes.toString()).getTime();
  }

  this.overlaps = function (timespanB) {
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

// var ts1 = new Timespan('8pm', '8:50pm'),
//   ts2 = new Timespan('8pm', '10:50pm');

// console.log('Overlap?: ' + ts1.overlaps(ts2));
//console.log(new Date('2014','10','24', '13', '0'))

function conflicts (sectionA, sectionB) {
  console.log('sectionA: ');
  console.log('starts: ' + sectionA.start);
  console.log('ends: ' + sectionA.end);

  console.log('');

  console.log('sectionB: ');
  console.log('starts: ' + sectionB.start);
  console.log('ends: ' + sectionB.end);

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

// For each section of a course, create a new schedule with each section of the next course
var Stack = require('algorithms').DataStructure.Stack;
var nextCourses = new Stack();
// Add courses to nextCourses stack
for (var i = 0; i < courses.length; ++i) {
  nextCourses.push(courses[i]);
}

console.log(nextCourses.length)
// function all (course, schedule, schedules) {

//   for (var i = 0; i < course.sections.length; ++i) {
//      schedule.push(course.sections[i]);
//   }

//   while (nextCourses.length !== 0)
// }

// all(courses[0], [], []);




//allCombos(courses);

//var Graph = require('algorithms').DataStructure.Graph;
//var g = new Graph(false);

