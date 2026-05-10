// ── Dark mode ──
const html    = document.documentElement;
const toggle  = document.getElementById('themeToggle');
const icon    = document.getElementById('themeIcon');

const saved = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', saved);
setIcon(saved);

toggle.addEventListener('click', () => {
  const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  setIcon(next);
});

function setIcon(theme) {
  icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// ── Mobile hamburger ──
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ── Active nav link on scroll ──
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navItems.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id);
      });
    }
  });
}, { threshold: 0.35, rootMargin: '-60px 0px 0px 0px' });

sections.forEach(s => observer.observe(s));

// ── Graceful profile photo fallback ──
const pic = document.getElementById('profilePic');
if (pic) {
  pic.addEventListener('error', () => {
    pic.style.display = 'none';
  });
}
