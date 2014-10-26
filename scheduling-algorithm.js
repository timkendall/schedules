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
  var schedules = []; //Array of working schedules
  var schedulesGraph = new ScheduleGraph(courses);
  //Iterate through each graph, and look for valid schedules
  schedulesGraph.graphs.forEach(function(root, i){
    //Take the root of the graph and recursively try to make a non-conlficting schedule
    createSchedules(root, [], function(validSchedule){ //Valid schedules are sent through callback and appended to schedules array
      var schedule = convertNodesToSections(validSchedule);
      schedules.push(schedule);
      console.log(schedule);
    });
  });
}

function createSchedules (node, arr, callback) {
  arr.push(node); //push node on schedule array
  if(node.edges.length === 0){ //Reached the last row of nodes (Yeay working schedule!)
    callback(arr);
    return;
  }
  //If not last row, then copy array, and only go to edges that are not conflicting.
  node.edges.forEach(function(n, i){
    var newArr = arr.slice(); //copy array
    var conflict;
    newArr.every(function(newArrNode){
      conflict = conflicts(newArrNode.section, n.section);
    });
    if(conflict)
        return;
    else
      createSchedules(n, newArr, callback);
  });
}

function convertNodesToSections(nodes){
  var sectionsSchedule = [];
  nodes.forEach(function(node){
    sectionsSchedule.push({ id: node.courseId, section: node.section } );
  });
  return sectionsSchedule;
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
  // console.log('sectionA: ');
  // console.log('starts: ' + sectionA.start);
  // console.log('ends: ' + sectionA.end);

  // console.log('');

  // console.log('sectionB: ');
  // console.log('starts: ' + sectionB.start);
  // console.log('ends: ' + sectionB.end);

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

function ScheduleGraph(courses){
  this.courses = courses;
  this.graphs = []; //Total number of graphs, corrisponds to first course sections
  var self = this;
  this.courses[0].sections.forEach(function(section){
    self.graphs.push(new Node(courses[0], section));
  });

  this.courses.forEach(function(course, i){
    if(i === 0) //Already created nodes for first section
      return;
    var sectionNodes = []; //Convert course.sections to Nodes
    course.sections.forEach(function(section, j){
      sectionNodes[j] = new Node(course, section);
    });

    //Iterate and push array of edges to lowest nodes
    self.graphs.forEach(function(graph, k){
      pushToLowestEdges(self.graphs[k], sectionNodes);
    });
  });

  function pushToLowestEdges(node, newNodes){
    if(node.edges.length === 0){ //We've reached the end of the graph
      node.edges = newNodes;
      return;
    }
    //Go through edges and look for last row of nodes
    node.edges.forEach(function(n, i){
      pushToLowestEdges(n, newNodes);
    });
  }
}


function Node(course, section){
  this.courseId = course.id;
  this.section = section;
  this.edges = [];
}

generateSchedules(courses);
