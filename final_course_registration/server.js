const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Mock in-memory "database"
let users = [];
let courses = [
  { id: 1, name: "INFO 465", seats: 10 },
  { id: 2, name: "CSCI 101", seats: 5 }
];

// Route: Register user
app.post('/register', (req, res) => {
  const { email, password } = req.body;
  if (!email.endsWith('@vcu.edu')) {
    return res.status(400).json({ message: 'Email must be VCU.' });
  }
  users.push({ email, password });
  res.json({ message: 'Account created successfully!' });
});

// Route: Login
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });
  res.json({ message: 'Login successful!' });
});

// Route: Get courses
app.get('/courses', (req, res) => {
  res.json(courses);
});

// Route: Register for a course
app.post('/register-course', (req, res) => {
  const { courseId } = req.body;
  const course = courses.find(c => c.id === courseId);
  if (!course || course.seats <= 0) {
    return res.status(400).json({ message: 'Course full or not found.' });
  }
  course.seats -= 1;
  res.json({ message: `Registered for ${course.name}`, remainingSeats: course.seats });
});

// Route: Pay (stub)
app.post('/pay', (req, res) => {
  res.json({ message: 'Payment simulated! Confirmation sent.' });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
