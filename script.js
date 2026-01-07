// Theme toggle
const themeBtn=document.getElementById('themeBtn');
themeBtn.onclick=()=>{
  document.body.classList.toggle('light');
  themeBtn.textContent=document.body.classList.contains('light')?'Dark':'Light';
};

// Hamburger menu
const burger=document.getElementById('hamburger');
const nav=document.getElementById('navMenu');
burger.onclick=()=>nav.classList.toggle('open');

// Typewriter (once)
const tw=document.getElementById('typewriter');
const text='Hi, I am Shourya';
let i=0;
(function type(){
  if(i<text.length){tw.innerHTML+=text[i++];setTimeout(type,70)}
})();

// Candle secret page
function openCandlePage(){
  const w=window.open('','_blank');
  w.document.write(`<!DOCTYPE html><html><body style="background:black;color:white;font-family:Inter;padding:40px">
  <p>Hey, there! I must admit, you have got great observation skills if you clicked on this candle.</p>
  <p>I lit this flame for the silent architects—the unknown developers whose selfless code forms the bedrock of our digital world. It shines for those who fought to ensure knowledge remained free for all. And above all, it stands as a solemn vigil for the innocent lives extinguished by those who weaponized faith, hiding cruelty beneath the cloak of religion.</p>
  <p>To the builders of the future and the victims of the past: your light remains undimmed. Peace.</p>
  <br><p id="q"></p>
  <script>
  const quote='Information is power. But like all power, there are those who want to keep it for themselves';
  const author='— Aaron Swartz';let j=0;
  function t(){if(j<quote.length){q.innerHTML+=quote[j++];setTimeout(t,60)}else{q.innerHTML+='<br><span style="color:#7CFC98">'+author+'</span>'}}
  t();
  <\/script>
  </body></html>`);
}
