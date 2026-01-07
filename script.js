// Elements
const hamburger=document.getElementById('hamburger');
const nav=document.getElementById('navMenu');
const themeBtn=document.getElementById('themeBtn');
const typewriter=document.getElementById('typewriter');
const footerEaster=document.getElementById('footerEaster');

// Hamburger
hamburger.onclick=()=>nav.classList.toggle('open');

// Theme toggle
themeBtn.onclick=()=>{
  document.body.classList.toggle('light');
  themeBtn.textContent=document.body.classList.contains('light')?'🌙':'☀️';
};

// Rickroll
function rickRoll(){window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ','_blank');}
document.getElementById('viewResume').onclick=rickRoll;
document.querySelectorAll('.action-rick').forEach(b=>b.onclick=rickRoll);

// Slower typewriter with gradient name
const segments=[{text:'Hi, I am '},{text:'Shourya',cls:'name'}];
let seg=0,idx=0;
function type(){
  if(seg>=segments.length) return;
  const s=segments[seg];
  if(idx<s.text.length){
    if(s.cls){
      if(!typewriter.querySelector('span')){
        const sp=document.createElement('span');sp.className=s.cls;typewriter.appendChild(sp);
      }
      typewriter.querySelector('span').textContent+=s.text[idx];
    }else{
      typewriter.innerHTML+=s.text[idx];
    }
    idx++;setTimeout(type,120);
  }else{seg++;idx=0;setTimeout(type,120)}
}
type();

// Clocks
function time(tz){return new Intl.DateTimeFormat([], {hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:false,timeZone:tz}).format(new Date());}
setInterval(()=>{
  document.getElementById('clock-india').textContent=time('Asia/Kolkata');
  document.getElementById('clock-usa').textContent=time('America/New_York');
  document.getElementById('clock-europe').textContent=time('Europe/London');
},1000);

// Footer Easter Egg
footerEaster.onclick=()=>{
  const w=window.open('','_blank');
  w.document.write(`<!DOCTYPE html><html><head>
  <link href="https://fonts.googleapis.com/css2?family=Inter&family=Courier+Prime&display=swap" rel="stylesheet">
  <style>body{background:black;color:white;font-family:Inter;padding:40px} .quote{font-family:'Courier Prime';color:#7CFC98;margin-top:30px}</style>
  </head><body>
  <p>Hey, there! I must admit, you have got great observation skills if you clicked this line.</p>
  <p>I lit this flame for the silent architects—the unknown developers whose selfless code forms the bedrock of our digital world. It shines for those who fought to ensure knowledge remained free for all. And above all, it stands as a solemn vigil for the innocent lives extinguished by those who weaponized faith, hiding cruelty beneath the cloak of religion.</p>
  <p>To the builders of the future and the victims of the past: your light remains undimmed. Peace.</p>
  <div class="quote" id="q"></div>
  <div class="quote">— Aaron Swartz (8 November 1986 — 11 January 2013)</div>
  <script>const qt='Information is power. But like all power, there are those who want to keep it for themselves';let j=0;const q=document.getElementById('q');(function t(){if(j<qt.length){q.innerHTML+=qt[j++];setTimeout(t,70)}})();</script>
  </body></html>`);
};
