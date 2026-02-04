const sun = document.getElementById("sun");
const moon = document.getElementById("moon");
const login = document.getElementById("login");
const lightBtn = document.getElementById("lightModeBtn");
const darkBtn = document.getElementById("darkModeBtn");
const scene = document.querySelector('.scene');
const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");

// Responsive canvas
function resizeCanvas(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Stars
let stars=[];
function createStars(count=120){
  stars=[];
  for(let i=0;i<count;i++){
    stars.push({
      x:Math.random()*canvas.width,
      y:Math.random()*canvas.height,
      r: Math.random()*2 + 1,
      alpha: Math.random(),
      delta: Math.random()*0.02+0.01
    });
  }
}
function animateStars(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  stars.forEach(s=>{
    s.alpha += s.delta;
    if(s.alpha<0 || s.alpha>1) s.delta *= -1;
    ctx.beginPath();
    ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
    ctx.fillStyle=`rgba(255,255,255,${s.alpha})`;
    ctx.fill();
  });
  requestAnimationFrame(animateStars);
}
createStars();
animateStars();

// Light Mode
lightBtn.onclick = ()=>{
  scene.style.background="#87ceeb"; // change scene bg
  sun.style.transition="all 3s ease-in-out";
  sun.style.left="5vw";
  sun.style.top="5vh";

  login.style.transition="all 3s ease-in-out";
  login.style.opacity=1;
  login.style.left="50%";
  login.style.transform="translateX(-50%) translateY(0)";

  moon.style.left="110%";
  moon.style.opacity=0;

  createStars(100);
  animateStars();
}

// Dark Mode
darkBtn.onclick = ()=>{
  scene.style.background="#000"; // full black bg
  login.style.opacity=0;
  sun.style.left="-20vw"; // sun goes out

  createStars(250); // more stars
  animateStars();

  moon.style.transition="all 3s ease-in-out";
  setTimeout(()=>{
    moon.style.left="80%";
    moon.style.top="10vh";
    moon.style.opacity=1;
  },500);
}

