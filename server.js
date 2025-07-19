
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname)));

let users = [];
let courses = [
  { id: 1, name: "INFO 465 - Web Server App Dev", seats: 10 },
  { id: 2, name: "CSCI 101 - Intro to Computer Science", seats: 25 },
  { id: 3, name: "MATH 201 - Calculus I", seats: 30 },
  { id: 4, name: "ENGL 200 - Writing and Rhetoric", seats: 20 },
  { id: 5, name: "HIST 150 - American History", seats: 18 },
  { id: 6, name: "STAT 210 - Basic Practice of Statistics", seats: 22 },
  { id: 7, name: "BUSN 225 - Legal Environment of Business", seats: 15 },
  { id: 8, name: "ACCT 202 - Accounting for Decision Making", seats: 12 },
  { id: 9, name: "MKTG 301 - Principles of Marketing", seats: 28 },
  { id: 10, name: "MGMT 303 - Creativity and Ideation", seats: 10 }
];
let registrations = []; // {email, courseId}

// Register
app.post('/register', (req,res)=>{
  const {email,password} = req.body;
  if(!email.endsWith('@vcu.edu')) return res.status(400).json({message:'Email must be VCU.'});
  if(users.find(u=>u.email===email)) return res.status(400).json({message:'User already exists.'});
  users.push({email,password});
  res.json({message:'Account created successfully!'});
});

// Login
app.post('/login', (req,res)=>{
  const {email,password} = req.body;
  const u = users.find(u=>u.email===email && u.password===password);
  if(!u) return res.status(401).json({message:'Invalid credentials'});
  res.json({message:'Login successful!'});
});

// Get all courses
app.get('/courses', (req,res)=>{
  res.json(courses);
});

// Register course
app.post('/register-course', (req,res)=>{
  const {courseId,userEmail} = req.body;
  const course = courses.find(c=>c.id===courseId);
  if(!course || course.seats<=0) return res.status(400).json({message:'Course full or not found.'});
  registrations.push({email:userEmail, courseId});
  course.seats -= 1;
  res.json({message:`Registered for ${course.name}`, remainingSeats: course.seats});
});

// Drop course
app.post('/drop-course', (req,res)=>{
  const {courseId,userEmail} = req.body;
  const index = registrations.findIndex(r=>r.email===userEmail && r.courseId===courseId);
  if(index===-1) return res.status(400).json({message:'Course not found in your schedule.'});
  registrations.splice(index,1);
  const course = courses.find(c=>c.id===courseId);
  if(course) course.seats += 1;
  res.json({message:'Dropped course successfully!'});
});

// Get student schedule
app.get('/my-schedule', (req,res)=>{
  const email = req.query.email;
  const my = registrations.filter(r=>r.email===email);
  const myCourses = my.map(m=>{
    const c = courses.find(cc=>cc.id===m.courseId);
    return c?{id:c.id,name:c.name}:null;
  }).filter(Boolean);
  res.json(myCourses);
});

// Payment stub
app.post('/pay',(req,res)=>{
  res.json({message:'Payment simulated! Confirmation sent.'});
});

const PORT = 3000;
app.listen(PORT,()=>console.log(` Server running at http://localhost:${PORT}/home.html`));
