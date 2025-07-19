async function registerUser() {
  const email = document.getElementById('regEmail').value;
  const password = document.getElementById('regPassword').value;
  if (!email || !password) { alert('Please enter email and password'); return; }
  try {
    const res = await fetch('http://localhost:3000/register', {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email,password})});
    const data = await res.json();
    alert(data.message);
  } catch(e){alert('Registration failed');}
}
async function loginUser() {
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;
  if (!email || !password) { alert('Please enter email and password'); return; }
  try {
    const res = await fetch('http://localhost:3000/login', {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email,password})});
    const data = await res.json();
    alert(data.message);
  } catch(e){alert('Login failed');}
}
async function fetchCourses(){
  try {
    const res = await fetch('http://localhost:3000/courses');
    const data = await res.json();
    const sel=document.getElementById('course-select');
    if(sel){sel.innerHTML='<option value="">— Choose a course —</option>';data.forEach(c=>{const o=document.createElement('option');o.value=c.id;o.textContent=`${c.name} (Seats left: ${c.seats})`;sel.appendChild(o);});}
  } catch(e){alert('Cannot load courses');}
}
async function registerCourse(){
  const id=parseInt(document.getElementById('course-select').value);
  if(!id){alert('Select a course');return;}
  try{
    const res=await fetch('http://localhost:3000/register-course',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({courseId:id})});
    const data=await res.json();
    alert(data.message);
    fetchCourses();
  }catch(e){alert('Course registration failed');}
}
async function pay(){
  try{
    const res=await fetch('http://localhost:3000/pay',{method:'POST',headers:{'Content-Type':'application/json'}});
    const data=await res.json();
    alert(data.message);
  }catch(e){alert('Payment failed');}
}
document.addEventListener('DOMContentLoaded',()=>{if(document.getElementById('course-select')){fetchCourses();}});