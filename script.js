// ---- Dummy data; replace with your API calls later ----
const allCourses = [
  { id: 'INFO101', title: 'Intro to IS', instructor: 'Dr. A', credits: 3, enrolled: 25, max: 30 },
  { id: 'INFO350', title: 'Data Analytics', instructor: 'Dr. B', credits: 4, enrolled: 30, max: 30 },
  { id: 'MATH200', title: 'Calculus II', instructor: 'Dr. C', credits: 4, enrolled: 28, max: 30 }
];
let myEnrollments = [
  { id: 'MATH200', title: 'Calculus II', instructor: 'Dr. C', credits: 4 }
];

// --- Helpers & DOM references ---
const enrolledTbody = document.querySelector('#enrolled-table tbody');
const courseSelect  = document.getElementById('course-select');
const registerBtn   = document.getElementById('register-btn');
const messageDiv    = document.getElementById('message');

// Render enrolled courses
function renderEnrollments() {
  enrolledTbody.innerHTML = '';
  myEnrollments.forEach(c => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${c.id}</td>
      <td>${c.title}</td>
      <td>${c.instructor}</td>
      <td>${c.credits}</td>
      <td><button data-id="${c.id}" class="drop-btn">Drop</button></td>
    `;
    enrolledTbody.appendChild(tr);
  });
  document.querySelectorAll('.drop-btn').forEach(btn =>
    btn.addEventListener('click', () => dropCourse(btn.dataset.id))
  );
}

// Populate course dropdown
function populateCourseSelect() {
  courseSelect.innerHTML = '<option value="">— Choose a course —</option>';
  allCourses.forEach(c => {
    if (!myEnrollments.some(e => e.id === c.id)) {
      const opt = document.createElement('option');
      opt.value = c.id;
      opt.textContent = `${c.id} — ${c.title} (${c.enrolled}/${c.max})`;
      courseSelect.appendChild(opt);
    }
  });
}

// Register click handler
registerBtn.addEventListener('click', () => {
  const selectedId = courseSelect.value;
  messageDiv.textContent = '';
  messageDiv.className = 'message';

  if (!selectedId) {
    messageDiv.textContent = 'Please select a course first.';
    return messageDiv.classList.add('error');
  }
  const course = allCourses.find(c => c.id === selectedId);
  if (course.enrolled >= course.max) {
    messageDiv.textContent = 'Cannot register: course is full.';
    return messageDiv.classList.add('error');
  }
  if (myEnrollments.some(e => e.id === selectedId)) {
    messageDiv.textContent = 'You are already enrolled.';
    return messageDiv.classList.add('error');
  }

  // “Register”
  course.enrolled++;
  myEnrollments.push({ id: course.id, title: course.title, instructor: course.instructor, credits: course.credits });
  messageDiv.textContent = 'Successfully registered!';
  messageDiv.classList.add('success');
  renderEnrollments();
  populateCourseSelect();
});

// Drop a course
function dropCourse(id) {
  myEnrollments = myEnrollments.filter(c => c.id !== id);
  const course = allCourses.find(c => c.id === id);
  if (course) course.enrolled--;
  renderEnrollments();
  populateCourseSelect();
}

// Fake logout
function logout() {
  alert('Logged out (demo only)');
}

// Initialize
renderEnrollments();
populateCourseSelect();
