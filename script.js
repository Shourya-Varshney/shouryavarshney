const html = document.documentElement;
const menuToggle = document.getElementById('menuToggle');
const themeToggle = document.getElementById('themeToggle');
const menu = document.getElementById('siteMenu');

const storedTheme = localStorage.getItem('theme');
const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
const initialTheme = storedTheme || (prefersLight ? 'light' : 'dark');

function setTheme(theme) {
  html.setAttribute('data-theme', theme);
  themeToggle.setAttribute('aria-pressed', String(theme === 'light'));
  localStorage.setItem('theme', theme);
}

setTheme(initialTheme);

function closeMenu() {
  menu.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
}

function openMenu() {
  menu.classList.add('open');
  menuToggle.setAttribute('aria-expanded', 'true');
}

menuToggle.addEventListener('click', () => {
  const isOpen = menu.classList.contains('open');
  if (isOpen) closeMenu();
  else openMenu();
});

themeToggle.addEventListener('click', () => {
  setTheme(html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
});

document.addEventListener('click', (event) => {
  if (!menu.contains(event.target) && !menuToggle.contains(event.target)) {
    closeMenu();
  }
});

document.querySelectorAll('.menu-panel a').forEach((link) => {
  link.addEventListener('click', closeMenu);
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
