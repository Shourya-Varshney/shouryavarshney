/* ======================
   Utilities & DOM refs
   ====================== */
const body = document.body;
const themeBtn = document.getElementById('themeBtn');
const hackerBtn = document.getElementById('hackerBtn');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const typewriterEl = document.getElementById('typewriter');
const aboutText = document.getElementById('aboutText');
const customCursor = document.getElementById('custom-cursor');
const actionButtons = document.querySelectorAll('.btn, .nav a, .control-btn');

/* 1) MOBILE NAV (hamburger) */
hamburger.addEventListener('click', () => {
  const expanded = hamburger.getAttribute('aria-expanded') === 'true';
  hamburger.setAttribute('aria-expanded', String(!expanded));
  navMenu.classList.toggle('open');
});

/* 2) THEME BUTTON */
themeBtn.addEventListener('click', () => {
  body.classList.toggle('light');
  const isLight = body.classList.contains('light');
  themeBtn.textContent = isLight ? 'Dark' : 'Light';
  themeBtn.setAttribute('aria-pressed', String(isLight));
});

/* 3) HACKER / TERMINAL TOGGLE */
hackerBtn.addEventListener('click', () => {
  const active = hackerBtn.classList.toggle('active');
  body.classList.toggle('hacker', active);
  hackerBtn.setAttribute('aria-pressed', String(active));
  if (active) {
    hackerBtn.classList.add('active');
    hackerBtn.querySelector('.hacker-icon').style.background = '#ff3b3b';
    // run terminal-style typed messages in a few places
    runHackerType();
  } else {
    // restore original content (quick solution: reload relevant text)
    hackerBtn.classList.remove('active');
    hackerBtn.querySelector('.hacker-icon').style.background = '#6a00ff';
    restoreContent();
  }
});

/* helper to replace certain text with typed terminal style */
function runHackerType() {
  // hero h1
  const p = typewriterEl;
  typeText(p, ".. initializing environment\n> Hello, this is Shourya.", 40, true, () => {
    // about
    const about = aboutText;
    typeText(about, "Loading profile...\n> Commerce student • builder • tinkerer\n> Exploring art × tech.\n", 18, false);
  });
}

/* helper to restore */
function restoreContent() {
  // simple restore: re-run normal typewriter then restore about paragraph
  runTypewriterOnce();
  aboutText.innerHTML = `A commerce student with a passion for innovation and cutting-edge technology.
      <br><br>
      Particularly interested in the intersection of art, technology, and my personal interests. I believe that these disciplines can be combined to create truly transformative and out of the box experiences.
      <br><br>
      Currently pursuing B.Com degree, and have future plans of pursuing an MBA degree. Till then I am exploring my life and having fun sitting in front of my computer for the whole day (and night)...`;
}

/* typeText helper: writes content into element with cursor-like effect */
function typeText(el, text, speed = 40, multiline = false, cb = null) {
  el.innerHTML = '';
  let i = 0;
  function step(){
    if (i >= text.length) {
      if (cb) cb();
      return;
    }
    const ch = text.charAt(i);
    // handle newline for paragraphs
    if (ch === '\n') {
      if (multiline) el.innerHTML += '<br>';
      else el.innerHTML += '\n';
    } else {
      el.innerHTML += ch;
    }
    i++;
    setTimeout(step, speed);
  }
  step();
}

/* 4) TYPEWRITER (runs once on page load, with Shourya highlighted) */
function runTypewriterOnce() {
  // Compose segments: before, name, after
  const before = "Hi, I am ";
  const name = "Shourya";
  const after = "";
  typeSegments(typewriterEl, [{text:before, cls: ''}, {text:name, cls:'name'}, {text:after, cls:''}], 80);
}
// Type segments where a segment can have a class (we wrap it)
function typeSegments(el, segments, speed) {
  el.innerHTML = '';
  let segIndex = 0, charIndex = 0;

  function tick() {
    if (segIndex >= segments.length) return;
    const seg = segments[segIndex];
    const segText = seg.text;
    if (charIndex < segText.length) {
      const ch = segText.charAt(charIndex);
      if (seg.cls) {
        // ensure span exists
        if (!el.querySelector(`span.${seg.cls}`)) {
          const sp = document.createElement('span');
          sp.className = seg.cls;
          // name gets gradient via CSS
          el.appendChild(sp);
        }
        const span = el.querySelector(`span.${seg.cls}`);
        span.textContent += ch;
      } else {
        el.appendChild(document.createTextNode(ch));
      }
      charIndex++;
      setTimeout(tick, speed);
    } else {
      // move to next segment
      segIndex++;
      charIndex = 0;
      setTimeout(tick, speed);
    }
  }
  tick();
}

/* On DOM ready, run the typewriter */
document.addEventListener('DOMContentLoaded', () => {
  runTypewriterOnce();
  initClocks();
  initCustomCursor();
});

/* 5) RICKROLL placeholder for all current action links */
function rickRoll() {
  window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ", "_blank", "noopener");
}

/* 6) BENTO CLOCKS (uses Intl with timezone) */
function formatTimeForZone(timeZone) {
  return new Intl.DateTimeFormat([], {
    hour: '2-digit', minute: '2-digit', second: '2-digit',
    hour12: false, timeZone
  }).format(new Date());
}
function initClocks() {
  const id = document.getElementById('clock-india');
  const ld = document.getElementById('clock-london');
  const br = document.getElementById('clock-berlin');
  function tick() {
    try {
      id.textContent = formatTimeForZone('Asia/Kolkata');
      ld.textContent = formatTimeForZone('Europe/London');
      br.textContent = formatTimeForZone('Europe/Berlin');
    } catch (e) {
      // fallback
      const now = new Date();
      id.textContent = now.toLocaleTimeString();
      ld.textContent = now.toLocaleTimeString();
      br.textContent = now.toLocaleTimeString();
    }
  }
  tick();
  setInterval(tick, 1000);
}

/* 7) CUSTOM CURSOR & MAGNETIC EFFECT */
function initCustomCursor() {
  let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;
  const cursor = customCursor;
  const core = cursor.querySelector('.cursor-core');

  // basic follow
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX; mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
    // proximity check to buttons (magnetic)
    checkMagnetic(mouseX, mouseY, cursor);
  });

  // hide on leaving window
  window.addEventListener('mouseleave', () => { cursor.style.opacity = '0' });
  window.addEventListener('mouseenter', () => { cursor.style.opacity = '1' });

  function checkMagnetic(x, y, cursorEl) {
    const threshold = 80;
    let sucked = false;
    actionButtons.forEach(btn => {
      const r = btn.getBoundingClientRect();
      if (!r.width || !r.height) return;
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = cx - x;
      const dy = cy - y;
      const dist = Math.hypot(dx, dy);
      if (dist < threshold) {
        // snap toward center of element
        cursorEl.style.transform = `translate(${cx - x}px, ${cy - y}px)`;
        cursorEl.classList.add('sucked');
        btn.classList.add('magnetic');
        sucked = true;
      } else {
        btn.classList.remove('magnetic');
      }
    });
    if (!sucked) {
      cursorEl.style.transform = `translate(-50%, -50%)`;
      cursorEl.classList.remove('sucked');
    }
  }

  // click animation
  window.addEventListener('mousedown', () => { core.style.transform = 'scale(.85)'; });
  window.addEventListener('mouseup', () => { core.style.transform = 'scale(1)'; });

  // touch: hide cursor
  window.addEventListener('touchstart', () => { cursor.style.display = 'none' }, {passive:true});
}

/* 8) accessibility: keyboard toggles hide mobile nav when link clicked */
document.querySelectorAll('.nav a').forEach(a=>{
  a.addEventListener('click', ()=>{
    if (navMenu.classList.contains('open')) {
      navMenu.classList.remove('open');
      hamburger.setAttribute('aria-expanded','false')
    }
  })
});
