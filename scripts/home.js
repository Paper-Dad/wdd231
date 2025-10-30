const navbutton = document.querySelector('#menu');
const nav = document.querySelector('#nav-bar');

navbutton.addEventListener('click', () => {
  navbutton.classList.toggle('show');
  nav.classList.toggle('show');
});





const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: [
            'Python'
        ],
        completed: false
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
        technology: [
            'HTML',
            'CSS'
        ],
        completed: false
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
        technology: [
            'Python'
        ],
        completed: false
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        technology: [
            'C#'
        ],
        completed: false
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: false
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: false
    }
]

const courseList = document.querySelector("#course-list");
const creditCount = document.querySelector("#credit-count");

function displayCourses(coursesToDisplay) {
  courseList.innerHTML = "";

  const totalCredits = coursesToDisplay.reduce((sum, course) => sum + course.credits, 0);
  creditCount.textContent = `Total credits for course listed above is ${totalCredits}`;

  coursesToDisplay.forEach(course => {
    const courseCard = document.createElement("section");
    courseCard.classList.add("course-card");

    if (course.completed) {
      courseCard.classList.add("completed");
    }

    courseCard.innerHTML = `
      <button class="complete-btn">
        ${course.completed ? `✅ ${course.subject} ${course.number}` : `${course.subject} ${course.number}`}
      </button>
    `;

    const completeBtn = courseCard.querySelector(".complete-btn");
    completeBtn.addEventListener("click", () => {
      course.completed = !course.completed;
      displayCourses(coursesToDisplay);
    });

    courseList.appendChild(courseCard);
  });
}

displayCourses(courses);


const allBtn = document.querySelector('input[value="All"]');
const wddBtn = document.querySelector('input[value="WDD"]');
const cseBtn = document.querySelector('input[value="CSE"]');

allBtn.addEventListener("click", () => displayCourses(courses));

wddBtn.addEventListener("click", () => {
  const wddCourses = courses.filter(course => course.subject === "WDD");
  displayCourses(wddCourses);
});

cseBtn.addEventListener("click", () => {
  const cseCourses = courses.filter(course => course.subject === "CSE");
  displayCourses(cseCourses);
});







//Footer info//
const currentYear = new Date().getFullYear();
const yearSpan = document.getElementById("year");

if (yearSpan) {
  yearSpan.textContent = currentYear;
}
const modified = document.lastModified;
const lastModifiedSpan = document.getElementById("lastModified");

if (lastModifiedSpan) {
  lastModifiedSpan.textContent = modified;
}

//Footer Info//