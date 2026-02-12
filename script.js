/* ---------------- CONTAGEM REGRESSIVA ---------------- */

const countdownEl = document.getElementById('countdown');
const weddingDate = new Date('2026-05-23T11:00:00');

function updateCountdown() {
  const now = new Date();
  const diff = weddingDate - now;

  if (diff <= 0) {
    countdownEl.textContent = "🎉 É HOJE! 🎉";
    clearInterval(interval);
    startParty();
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  countdownEl.textContent =
    `${days} dias ${hours}h ${minutes}m ${seconds}s`;
}

const interval = setInterval(updateCountdown, 1000);
updateCountdown();


/* ---------------- FESTA 🎉 ---------------- */

const canvas = document.getElementById('festa');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

function startParty() {
  setInterval(() => {
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: canvas.width / 2,
        y: canvas.height / 2,
        vx: (Math.random() - 0.5) * 10,
        vy: (Math.random() - 0.5) * 10,
        life: 100
      });
    }
  }, 300);
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;
    p.life--;

    ctx.fillStyle = `hsl(${Math.random() * 360},100%,60%)`;
    ctx.fillRect(p.x, p.y, 3, 3);
  });

  particles = particles.filter(p => p.life > 0);

  requestAnimationFrame(animate);
}

animate();

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

/* -------- animação timeline -------- */

const timeline = document.querySelector('.timeline');
const events = document.querySelectorAll('.timeline .event');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      timeline.classList.add('animate');

      events.forEach((event, i) => {
        setTimeout(() => {
          event.classList.add('show');
        }, i * 150); // delay em cascata
      });
    }
  });
}, { threshold: 0.3 });

observer.observe(timeline);

/* ---------- SCROLL SUAVE ---------- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  });
});

/* ---------------- FORMULÁRIO DE MÚSICA ---------------- */
const musicForm = document.getElementById('musicasForm');

musicForm.addEventListener('submit', (e) => {
  e.preventDefault();
  alert('Obrigado pela tua sugestão musical ✦');
  musicForm.reset();
});
