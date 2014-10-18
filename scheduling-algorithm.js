var courses = [
  {
    id: 'CPSC-200',
    name: 'Intro to C++',
    sections: [
      {
        meets: {
         text: 'TTh',
         monday: false,
         tuesday: true,
         wednesday: false,
         thursday: true,
         friday: false,
         saturday: false
        },
        start: 5.5, // 5:30PM
        end: 6.75 // 6:45PM
      }
    ]
  },

  {
    id: 'SPAN-101',
    name: 'Spanish 101',
    sections: [
      {
        meets: {
         text: 'MWF',
         monday: true,
         tuesday: false,
         wednesday: true,
         thursday: false,
         friday: true,
         saturday: false
        },
        start: 13, // 1PM
        end: 13.83 // 1:50PM
      },
      {
        meets: {
         text: 'MWF',
         monday: true,
         tuesday: false,
         wednesday: true,
         thursday: false,
         friday: true,
         saturday: false
        },
        start: 10, // 10AM
        end: 10.83 // 10:50AM
      },
      {
        meets: {
         text: 'TTh',
         monday: false,
         tuesday: true,
         wednesday: false,
         thursday: true,
         friday: false,
         saturday: false
        },
        start: 15, // 3PM
        end: 16.25 // 4:15PM
      }
    ]
  },

  {
    id: 'ACTG-400',
    name: 'Accounting',
    sections: [
      {
        meets: {
         text: 'TTh',
         monday: false,
         tuesday: true,
         wednesday: false,
         thursday: true,
         friday: false,
         saturday: false
        },
        start: 6.75, // 5:30PM
        end: 7.75 // 6:45PM
      },

      {
        meets: {
         text: 'MW',
         monday: true,
         tuesday: false,
         wednesday: true,
         thursday: false,
         friday: false,
         saturday: false
        },
        start: 5.5, // 5:30PM
        end: 6.75 // 6:45PM
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

function conflicts (sectionA, sectionB) {
  /*
   * Check each day
   */
  if (sectionA.meets.monday && sectionB.meets.monday) {
     console.log('mon')
    if (overlap(sectionA, sectionB)) return true;
  }

  if (sectionA.meets.tuesday && sectionB.meets.tuesday) {
    console.log('tuesday')
    if (overlap(sectionA, sectionB)) return true;
  }

  if (sectionA.meets.wednesday && sectionB.meets.wednesday) {
     console.log('wed')
   if (overlap(sectionA, sectionB)) return true;
  }

  if (sectionA.meets.thursday && sectionB.meets.thursday) {
     console.log('thursd')
    if (overlap(sectionA, sectionB)) return true;
  }

  if (sectionA.meets.friday && sectionB.meets.friday) {
     console.log('friday')
    if (overlap(sectionA, sectionB)) return true;
  }

  if (sectionA.meets.saturday && sectionB.meets.saturday) {
     console.log('satur')
    if (overlap(sectionA, sectionB)) return true;
  }

  return false;
}

function overlap (sectionA, sectionB) {
  var startsFirst,
      startsSecond;

    if (sectionA.starts < sectionB.starts) {
      startsFirst = sectionA;
      startsSecond = sectionB;
    } else {
      startsFirst = sectionB;
      startsSecond = sectionA;
    }

    var startsFirstLength = startsFirst.ends - startsFirst.starts;

    // Check if there's overlap
    if (startsFirst.ends === startsSecond.starts) return false;
    if (startsFirst.starts === startsSecond.starts) return true;
    else if (startsFirst.ends > startsSecond.starts) return true;
    else return false;
}

//var schedules = generateSchedules()
console.log(conflicts(courses[0].sections[0], courses[2].sections[0]))