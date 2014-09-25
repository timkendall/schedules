var fs = require('fs');

// Convert professor names to ID's
String.prototype.hashCode = function () {
  var hash = 0,
    i, chr, len;
  if (this.length == 0) return hash;
  for (i = 0, len = this.length; i < len; i++) {
    chr = this.charCodeAt(i);
    hash = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

/*
 * Test data to build from
 */

var possibleCredits = [ 1, 3 ];

var  meetsFifty = [

];

var professorNames = [
  'Flores',
  'Mason',
  'Brooks',
  'Peterson',
  'Mendoza',
  'Welch',
  'Marshall',
  'Payne',
  'Bell',
  'Carroll',
  'Mills',
  'Ramos',
  'Pierce',
  'Knight',
  'Wells',
  'Vasquez',
  'Burns',
  'Cox',
  'Gomez',
  'Freeman',
  'Tucker',
  'Hernandez',
  'Burke',
  'Ferguson',
  'Murray',
  'Chapman',
  'Hall',
  'Montgomery',
  'Evans',
  'Schmidt',
  'Hansen',
  'Ruiz',
  'Price',
  'Harris',
  'Baker',
  'Ruiz',
  'Myers',
  'Rogers',
  'Pierce',
  'Kelly',
  'Cooper',
  'Warren',
  'King',
  'Fowler',
  'Bailey',
  'Stewart',
  'Brooks',
  'Daniels',
  'Riley',
  'Ford',
  'Moreno',
  'Gardner',
  'Olson',
  'Hamilton',
  'Schmidt',
  'Morales',
  'Morris',
  'Boyd',
  'Cook',
  'Johnston',
  'Freeman',
  'Carroll',
  'Barnes',
  'James',
  'Matthews',
  'Gibson',
  'Powell',
  'Boyd',
  'Marshall',
  'Weaver',
  'Evans',
  'Phillips',
  'Patterson',
  'Rose',
  'Rodriguez',
  'Hall',
  'Wilson',
  'Stone',
  'Butler',
  'Morrison',
  'Wood',
  'Ortiz',
  'Crawford',
  'Carroll',
  'Thompson',
  'Robertson',
  'Daniels',
  'Lopez',
  'Gordon',
  'Burke',
  'Griffin',
  'Patterson',
  'Martinez',
  'Martinez',
  'Rice',
  'Turner',
  'Wells',
  'Garcia',
  'Wood',
  'Lawrence',
  'Hansen',
  'Hicks',
  'Armstrong',
  'Wagner',
  'Scott',
  'Ramos',
  'Riley',
  'Hunt',
  'George',
  'Mason',
  'Mitchell',
  'Griffin',
  'Mills',
  'Marshall',
  'Rivera',
  'Fernandez',
  'Perez',
  'Andrews',
  'Clark',
  'Murray',
  'Kennedy',
  'Stone',
  'Romero',
  'Simpson',
  'Lewis',
  'Grant',
  'Castillo',
  'Dixon',
  'Gonzalez',
  'Murray',
  'Porter',
  'Richards',
  'Fowler',
  'Moore',
  'Ray',
  'Carter',
  'Mendoza',
  'Hughes',
  'Martinez',
  'Wagner',
  'Willis',
  'Wells',
  'Palmer',
  'Willis',
  'Morales',
  'Peterson',
  'Roberts',
  'Rivera',
  'Olson',
  'Schmidt',
  'Fuller',
  'Nelson',
  'Harvey',
  'Simmons',
  'Arnold',
  'Collins',
  'Stevens',
  'Owens',
  'Willis',
  'Morgan',
  'Grant',
  'Graham',
  'Payne',
  'Greene',
  'Phillips',
  'Carpenter',
  'Torres',
  'Woods',
  'Martinez',
  'Mcdonald',
  'Bailey',
  'Howard',
  'Robertson',
  'Gonzales',
  'Ramirez',
  'Sanders',
  'Davis',
  'Boyd',
  'Johnson',
  'Boyd',
  'Hudson',
  'Castillo',
  'Campbell',
  'Reed',
  'Fowler',
  'Schmidt',
  'Wells',
  'Chavez',
  'Rodriguez',
  'Mitchell',
  'Peters',
  'Lynch',
  'Mcdonald',
  'Torres',
  'Moreno',
  'Bennett',
  'Myers',
  'Hicks',
  'George',
  'Hanson',
  'Payne',
  'Lee',
  'Wells',
  'Jones',
  'Franklin',
  'Peterson',
  'Richards',
  'Carroll',
  'Ford',
  'Fernandez',
  'Stone',
  'Stanley',
  'Spencer',
  'Chapman',
  'Flores',
  'King',
  'Murray',
  'Mason',
  'Robertson',
  'Harper',
  'Watson',
  'Sanders',
  'Fisher',
  'Lawson',
  'Harrison',
  'Wagner',
  'Rivera',
  'Mitchell',
  'Owens',
  'Nguyen',
  'Hayes',
  'Porter',
  'Baker',
  'Hunter',
  'Willis',
  'Berry',
  'Warren',
  'Jordan',
  'Cruz',
  'Hamilton',
  'Evans',
  'Wright',
  'Kim',
  'Carroll',
  'Baker',
  'Lopez',
  'Hall',
  'Kelley',
  'Allen',
  'Wheeler',
  'Franklin',
  'Rivera',
  'Long',
  'Hart',
  'Gonzalez',
  'Hamilton',
  'Bowman',
  'Marshall',
  'Alexander',
  'Medina',
  'Larson',
  'Pierce',
  'Morrison',
  'Ortiz',
  'Kelley',
  'Sims',
  'Mitchell',
  'Griffin',
  'Morgan',
  'Lawson',
  'Harper',
  'Myers',
  'Garcia',
  'Gray',
  'Martin',
  'Murphy',
  'Walker',
  'Jackson',
  'Chavez',
  'Harper',
  'Vasquez',
  'Mendoza',
  'Daniels',
  'Hicks',
  'Jenkins',
  'Grant',
  'Flores',
  'Freeman',
  'White',
  'Long',
  'Peters',
  'Hill',
  'Bishop',
  'Daniels',
  'Cox',
  'Lewis',
  'Powell',
  'George',
  'Rodriguez',
  'Garrett',
  'Rose',
  'Alexander',
  'Powell',
  'Morgan',
  'Ruiz',
  'Pierce',
  'Hansen',
  'Palmer',
  'Ellis',
  'Ramos',
  'Thompson',
  'Howell',
  'Powell',
  'Daniels',
  'Dunn',
  'Allen',
  'Long',
  'Vasquez',
  'Martin',
  'Payne',
  'Wright',
  'Gardner',
  'Miller',
  'Romero',
  'Robinson',
  'Spencer',
  'Mitchell',
  'Porter',
  'Kim',
  'Mason',
  'Hart',
  'Grant',
  'Thomas',
  'Burns',
  'Watkins',
  'Schmidt',
  'Fisher',
  'Moore',
  'Williamson',
  'Bryant',
  'Gordon',
  'Taylor',
  'Murphy',
  'Oliver',
  'Diaz',
  'Greene',
  'Stephens',
  'Cunningham'
];

var timesFifty = [{
  time: '8:00am - 8:50am',
  duration: 50
}, {
  time: '9:00am - 9:50am',
  duration: 50
}, {
  time: '10:00am - 10:50am',
  duration: 50
}, {
  time: '11:00am - 11:50am',
  duration: 50
}, {
  time: '12:00pm - 12:50pm',
  duration: 50
}]

var timesSeventyFive = [{
  time: '8:00am - 9:15am',
  duration: 75
}, {
  time: '9:00am - 10:15am',
  duration: 75
}, {
  time: '10:00am - 11:15am',
  duration: 75
}, {
  time: '11:00am - 12:15pm',
  duration: 75
}, {
  time: '12:00pm - 1:15pm',
  duration: 75
}, {
  time: '8:30am - 9:45am',
  duration: 75
}, {
  time: '9:30am - 10:45am',
  duration: 75
}, {
  time: '10:30am - 11:45am',
  duration: 75
}, {
  time: '11:30am - 12:45pm',
  duration: 75
}, {
  time: '12:30pm - 1:45pm',
  duration: 75
}, {
  time: '1:00pm - 2:15pm',
  duration: 75
}, {
  time: '2:00pm - 3:15pm',
  duration: 75
}, {
  time: '3:00pm - 4:15pm',
  duration: 75
}, {
  time: '4:00pm - 5:15pm',
  duration: 75
}, {
  time: '5:00pm - 6:15pm',
  duration: 75
}, {
  time: '1:30pm - 2:45pm',
  duration: 75
}, {
  time: '2:30pm - 3:45pm',
  duration: 75
}, {
  time: '3:30pm - 4:45pm',
  duration: 75
}, {
  time: '4:30pm - 5:45pm',
  duration: 75
}, {
  time: '5:30pm - 1:45pm',
  duration: 75
}];

var majors = [
  'MATH',
  'CPSC',
  'ECON',
  'MGMT',
  'ACTG',
  'FIN',
  'MGSC',
  'SE',
  'PHYS',
  'CHEM',
  'ENG',
  'BUS',
  'MKTG',
  'KINE',
  'ART',
  'HIST',
  'DANC',
  'PSY',
  'SOC',
  'BIOL',
  'FTV'
];

var possibleCourses = {
  'MATH': [
    { id: 'MATH-101', name: 'Remedial Mathematics', level: 100 },
    { id: 'MATH-213', name: 'Calculous 1', level: 200 },
    { id: 'MATH-450', name: 'Discrete Math 2', level: 400 }
  ],

  'CPSC': [
    { id: 'CPSC-210', name: 'Python', level: 200 },
    { id: 'CPSC-250', name: 'Programming in Java', level: 200 },
    { id: 'CPSC-430', name: 'Algorithm Analysis', level: 400 }
  ],

  'ECON': [
    { id: 'ECON-100', name: 'Microeconomics', level: 100 },
    { id: 'ECON-101', name: 'Macroeconomics', level: 100 },
    { id: 'ECON-201', name: 'Intermediate Macroeconomics', level: 200 }
  ],

  'MGMT': [
    { id: 'MGMT-110', name: 'Intro to Managment', level: 100 },
    { id: 'MGMT-112', name: 'Managing People & Projects', level: 100 },
    { id: 'MGMT-200', name: 'Human Resources Training', level: 200 }
  ],

  'ACTG': [
    { id: 'ACTG-210', name: 'Introduction to Financial Accounting', level: 200 },
    { id: 'ACTG-211', name: 'Introduction to Managerial Accounting', level: 200 },
    { id: 'ACTG-312', name: 'Financial Reporting and Statement Analysis', level: 300 }
  ],

  'FIN': [
    { id: 'FIN-100', name: 'Freshman Foundations', level: 100 },
    { id: 'FIN-207', name: 'Personal Finance', level: 200 },
    { id: 'FIN-307', name: 'The Financial System', level: 300 }
  ],

  'MGSC': [
    { id: 'MGSC-207', name: 'Introduction to Business Analytics', level: 200 },
    { id: 'MGSC-208', name: 'Mathematical Analysis for Business', level: 200 },
    { id: 'MGSC-209', name: 'Introductory Business Statistics', level: 200 }
  ],

  'SE': [
    { id: 'SE-300', name: 'Software Requirements and Testing', level: 200 },
    { id: 'SE-310', name: 'Software Design', level: 200 },
    { id: 'SE-320', name: 'Software Engineering I', level: 200 }
  ],

  'PHYS': [
    { id: 'PHYS-101', name: 'General Physics I', level: 200 },
    { id: 'PHYS-102', name: 'General Physics II', level: 200 },
    { id: 'PHYS-107', name: 'General Physics for the Life Sciences I', level: 200 }
  ],

  'CHEM': [
    { id: 'CHEM-101', name: 'Chemistry of Life', level: 200 },
    { id: 'CHEM-105', name: 'Chemistry of Environmental Issues', level: 200 },
    { id: 'CHEM-140', name: 'General Chemistry I', level: 200 }
  ],

  'ENG': [
    { id: 'ENG-103', name: 'Seminar in Rhetoric and Writing', level: 200 },
    { id: 'ENG-203', name: 'Humanities Computing', level: 200 },
    { id: 'ENG-205', name: 'Research-Based Writing', level: 200 }
  ],

  'BUS': [
    { id: 'BUS-100', name: 'Introduction to Business', level: 100 },
    { id: 'BUS-215', name: 'Legal Environment of Business', level: 200 },
    { id: 'BUS-216', name: 'Business Ethics', level: 200 }
  ],

  'MKTG': [
    { id: 'MKTG-304', name: 'Marketing', level: 300 },
    { id: 'MKTG-404', name: 'Advertising and Promotion Strategy', level: 400 },
    { id: 'MKTG-405', name: 'Internet Marketing', level: 400 }
  ],

  'KINE': [
    { id: 'KINE-301', name: 'Applied Biomechanics', level: 300 },
    { id: 'KINE-324', name: 'Theory of Coaching', level: 300 },
    { id: 'KINE-340', name: 'Science of Obesity', level: 300 }
  ],

  'ART': [
    { id: 'ART-115', name: 'Foundation Course in Ceramics', level: 100 },
    { id: 'ART-116', name: 'Ceramics: Form and Surface', level: 100 },
    { id: 'ART-121', name: 'Digital Imaging', level: 100 }
  ],

  'HIST': [
    { id: 'HIST-210', name: 'Modern Middle East History', level: 200 },
    { id: 'HIST-220', name: 'The Vietnam Wars', level: 200 },
    { id: 'HIST-223', name: 'The Sixties', level: 200 }
  ],

  'DANC': [
    { id: 'DANC-113', name: 'Dance Performance', level: 100 },
    { id: 'DANC-113', name: 'Dance Performance', level: 100 },
    { id: 'DANC-369', name: 'Sexy Dancing', level: 300 }
  ],

  'PSY': [
    { id: 'PSY-315', name: 'Sensation and Perception', level: 300 },
    { id: 'PSY-328-', name: 'Abnormal Psychology', level: 300 },
    { id: 'PSY-330', name: 'Child Abnormal Psychology', level: 300 }
  ],

  'SOC': [
    { id: 'SOC-301', name: 'Field Research', level: 300 },
    { id: 'SOC-305', name: 'Social Theory', level: 300 },
    { id: 'SOC-306', name: 'Social Movements', level: 300 }
  ],

  'BIOL': [
    { id: 'BIOL-337', name: 'Immunology', level: 300 },
    { id: 'BIOL-355', name: 'Physiology of Drugs', level: 300 },
    { id: 'BIOL-365', name: 'Human Physiology Part A', level: 300 }
  ],

  'FTV': [
    { id: 'FTV-311', name: 'Cinema Francais/French Cinema (Cannes)', level: 300 },
    { id: 'FTV-329', name: 'Experimental Course', level: 300 },
    { id: 'FTV-332', name: 'Success in Media', level: 300 }
  ]
}



/*
 * Builder routine
 */

var courses = [];

// Generate test database
for (var i = 0; i < 250; ++i) {
  var professor = professorNames[randomInt(0, professorNames.length - 1)]; // Pick random professor
  var major = majors[randomInt(0, majors.length - 1)];

  courses.push(generateCourse(professor, major));
}

// Write out to .json
fs.writeFile(__dirname + '/courses.json', JSON.stringify(courses), function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log("Courses saved!");
  }
});

/*
 * Helper functions
 */

// Generate a unique course
function generateCourse (professor, major) {
  var meets,
    duration,
    time,
    waitlist,
    title;

  var totalSpots = randomInt(15, 35),
    availableSpots  = randomInt(0, totalSpots);

  var credits = possibleCredits[randomInt(0, possibleCredits.length)];

  // Pick logical duration, and meeting
  if (credits === 1) {
    var possibleMeets = [ 'M', 'T', 'W', 'Th', 'F', 'S'];
    meets = possibleMeets[randomInt(0, possibleMeets.length - 1)];
    duration = 50;
  } else {
    var possibleDurations = [ 50, 75 ];
    duration = possibleDurations[randomInt(0, possibleDurations.length -1)];

    if (duration === 50 ) {
      meets = 'MWF';
    } else if (duration === 75) {
      var possibleMeets = [ 'MW', 'TTh' ];
      meets = possibleMeets[randomInt(0, possibleMeets.length - 1)];
    }
  }

  // Pick logical time
  if (duration === 50) time = timesFifty[randomInt(0, timesFifty.length - 1)];
  else time  =  timesSeventyFive[randomInt(0, timesSeventyFive.length - 1)];

  // Pick logical waitlist ammount
  if (availableSpots === 0) waitlist = randomInt(0,20);
  else waitlist = 0;

  // Pick logical name
  var course = possibleCourses[major][randomInt(0, possibleCourses[major].length - 1)];

  return {
    id: course.id,
    section: 0,
    name: course.name,
    major: major,
    level: course.level,
    prereqs: [],
    requiresMajor: false,
    offered: 'every semester',
    credits: credits,
    professorName: professor,
    professorId: professor.hashCode(),
    time: time.time,
    meets: meets,
    duration: duration,
    totalSpots: totalSpots,
    availableSpots: availableSpots,
    waitlist: waitlist,
    picked: false
  }
}

function randomInt (low, high) {
  return Math.floor(Math.random() * (high - low) + low);
}



