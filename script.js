// Elements
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const themeBtn = document.getElementById('themeBtn');
const typewriterEl = document.getElementById('typewriter');
const viewResumeBtn = document.getElementById('viewResume');
const skillRickButtons = document.querySelectorAll('.action-rick');
const skillsGrid = document.getElementById('skillsGrid');
const projectsGrid = document.getElementById('projectsGrid');
const candle = document.getElementById('candle');

// 1) Hamburger toggle (mobile) - also give it visible background
hamburger.addEventListener('click', () => {
  const expanded = hamburger.getAttribute('aria-expanded') === 'true';
  hamburger.setAttribute('aria-expanded', String(!expanded));
  navMenu.classList.toggle('open');
});

// 2) Theme toggle (Light/Dark)
themeBtn.addEventListener('click', () => {
  document.body.classList.toggle('light');
  const isLight = document.body.classList.contains('light');
  themeBtn.textContent = isLight ? 'Dark' : 'Light';
  themeBtn.setAttribute('aria-pressed', String(isLight));
});

// 3) Rickroll targets
function rickRoll() {
  window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank', 'noopener');
}
if (viewResumeBtn) viewResumeBtn.addEventListener('click', rickRoll);
skillRickButtons.forEach(b => b.addEventListener('click', rickRoll));

// 4) Typewriter for "Hi, I am Shourya" with highlighted name (types once)
function typeSegments(el, segments, speed=70) {
  el.innerHTML = '';
  let segIndex = 0, charIndex = 0;
  function tick() {
    if (segIndex >= segments.length) return;
    const seg = segments[segIndex];
    const text = seg.text;
    if (charIndex < text.length) {
      const ch = text.charAt(charIndex);
      if (seg.cls) {
        if (!el.querySelector(`span.${seg.cls}`)) {
          const sp = document.createElement('span');
          sp.className = seg.cls;
          el.appendChild(sp);
        }
        const sp = el.querySelector(`span.${seg.cls}`);
        sp.textContent += ch;
      } else {
        el.appendChild(document.createTextNode(ch));
      }
      charIndex++;
      setTimeout(tick, speed);
    } else {
      segIndex++;
      charIndex = 0;
      setTimeout(tick, speed);
    }
  }
  tick();
}
document.addEventListener('DOMContentLoaded', () => {
  typeSegments(typewriterEl, [{text: 'Hi, I am '},{text:'Shourya', cls:'name'}], 75);
  initClocks();
  initSpotlight();
});

// 5) Clocks: India, USA (New York), Europe (London)
function formatTimeForZone(timeZone) {
  try {
    return new Intl.DateTimeFormat([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false, timeZone }).format(new Date());
  } catch (e) {
    return new Date().toLocaleTimeString();
  }
}
function initClocks() {
  const idEl = document.getElementById('clock-india');
  const usEl = document.getElementById('clock-usa');
  const euEl = document.getElementById('clock-europe');
  function tick() {
    if (idEl) idEl.textContent = formatTimeForZone('Asia/Kolkata');
    if (usEl) usEl.textContent = formatTimeForZone('America/New_York');
    if (euEl) euEl.textContent = formatTimeForZone('Europe/London');
  }
  tick();
  setInterval(tick, 1000);
}

// 6) Spotlight border effect on card grids (skills & projects)
function initSpotlight() {
  const grids = document.querySelectorAll('.card-grid');
  grids.forEach(grid => {
    const cards = Array.from(grid.querySelectorAll('.card, .link-card'));
    cards.forEach((card, idx) => {
      card.addEventListener('mouseenter', () => {
        // highlight current
        cards.forEach(c => c.classList.remove('highlight'));
        card.classList.add('highlight');
        if (cards[idx-1]) cards[idx-1].classList.add('highlight');
        if (cards[idx+1]) cards[idx+1].classList.add('highlight');
      });
      card.addEventListener('mouseleave', () => {
        cards.forEach(c => c.classList.remove('highlight'));
      });
    });
  });
}

// 7) Candle click -> open special page with different fonts + quote typewriter
if (candle) {
  candle.addEventListener('click', () => {
    const w = window.open('', '_blank');
    const html = `
<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>Candle — Silent Vigil</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600&family=Courier+Prime&display=swap" rel="stylesheet">
<style>
  body{background:#000;color:#fff;font-family:Inter,system-ui,Arial;padding:36px}
  .container{max-width:900px;margin:0 auto}
  p{line-height:1.7;font-size:1.05rem}
  .quote{margin-top:2.5rem;font-family:'Courier Prime',monospace;color:#fff;font-size:1.05rem;white-space:pre-wrap}
  .author{color:#7CFC98;margin-top:.8rem;font-family:'Courier Prime',monospace}
  .candle-small{margin-top:2rem;width:64px}
  .fadeable{transition:opacity 700ms ease}
</style>
</head>
<body>
<div class="container">
  <p>Hey, there! I must admit, you have got great observation skills if you clicked on this candle. Now let's understand its purpose:-</p>
  <p>I lit this flame for the silent architects—the unknown developers whose selfless code forms the bedrock of our digital world. It shines for those who fought to ensure knowledge remained free for all. And above all, it stands as a solemn vigil for the innocent lives extinguished by those who weaponized faith, hiding cruelty beneath the cloak of religion. To the builders of the future and the victims of the past: your light remains undimmed. Peace.</p>

  <div class="quote-box">
    <div id="quote" class="quote"></div>
    <div id="author" class="author"></div>
  </div>

  <svg class="candle-small" id="candleSmall" width="64" height="120" viewBox="0 0 64 120" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true">
    <rect x="18" y="36" rx="6" ry="6" width="28" height="72" fill="#fffaf0" />
    <path d="M22 36c4 6 10 6 14 0v-6c-4 4-10 4-14 0v6z" fill="#fff3e6" />
    <rect x="30.5" y="26" width="3" height="10" rx="1" fill="#222" />
    <g class="flame" transform="translate(32,18)">
      <path class="flame-outer" d="M0 -14 C6 -12 8 -6 0 6 C-8 -6 -6 -12 0 -14 Z" fill="#ffdd7a"/>
      <path class="flame-inner" d="M0 -10 C3 -8 4 -5 0 4 C-4 -5 -3 -8 0 -10 Z" fill="#ff8c3a"/>
    </g>
  </svg>
</div>

<script>
  // Typewriter for quote only
  const quoteText = "Information is power. But like all power, there are those who want to keep it for themselves";
  const authorText = "Aaron Swartz (8 November 1986 — 11 January 2013)";
  let i=0;
  const qEl = document.getElementById('quote');
  const aEl = document.getElementById('author');

  function typeQuote(){
    if(i<quoteText.length){
      qEl.textContent += quoteText.charAt(i++);
      setTimeout(typeQuote, 60);
    } else {
      // after quote typed, show author in green
      aEl.textContent = authorText;
      aEl.style.color = '#7CFC98';
    }
  }
  typeQuote();

  // hovering the small candle fades the text above
  const candleSmall = document.getElementById('candleSmall');
  candleSmall.addEventListener('mouseenter', () => {
    document.querySelectorAll('p, .quote, .author').forEach(el=>el.style.opacity=0.25);
  });
  candleSmall.addEventListener('mouseleave', () => {
    document.querySelectorAll('p, .quote, .author').forEach(el=>el.style.opacity=1);
  });
</script>
</body>
</html>
    `;
    w.document.write(html);
    w.document.close();
  });
}

// 8) Ensure nav links close mobile menu on click (accessibility)
document.querySelectorAll('.nav-link').forEach(l => {
  l.addEventListener('click', () => {
    if (navMenu.classList.contains('open')) {
      navMenu.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });
});
