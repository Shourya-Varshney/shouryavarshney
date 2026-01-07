function toggleTheme() {
  document.body.classList.toggle("light");
}

function toggleMenu() {
  document.getElementById("navMenu").classList.toggle("open");
}

function rickRoll() {
  window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ", "_blank");
}

/* TYPEWRITER (runs once on load) */
document.addEventListener("DOMContentLoaded", () => {
  const el = document.querySelector(".typewriter");
  const text = "Hi, I am Shourya";
  let i = 0;
  el.innerHTML = "";

  function type() {
    if (i < text.length) {
      if (text.slice(i, i + 7) === "Shourya") {
        el.innerHTML += `<span>Shourya</span>`;
        i += 7;
      } else {
        el.innerHTML += text.charAt(i);
        i++;
      }
      setTimeout(type, 80);
    }
  }

  type();
});
