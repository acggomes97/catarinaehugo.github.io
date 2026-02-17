/* ---------------- CONTAGEM REGRESSIVA ---------------- */
const countdownEl = document.getElementById('countdown');
if (countdownEl) {
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

    countdownEl.textContent = `${days} dias ${hours}h ${minutes}m ${seconds}s`;
  }

  const interval = setInterval(updateCountdown, 1000);
  updateCountdown();
}

/* ---------------- FESTA 🎉 ---------------- */
const canvas = document.getElementById('festa');
if (canvas) {
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
}

/* ---------------- TIMELINE ---------------- */
const timeline = document.querySelector('.timeline');
if (timeline) {
  const events = timeline.querySelectorAll('.event');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        timeline.classList.add('animate');
        events.forEach((event, i) => {
          setTimeout(() => event.classList.add('show'), i * 150);
        });
      }
    });
  }, { threshold: 0.3 });

  observer.observe(timeline);

}
/* ---------------- FORMULÁRIO DE MÚSICA (AJAX + LOADING) ---------------- */
const musicForm = document.getElementById('musicasForm');
const successMsg = document.getElementById('form-success');

if (musicForm && successMsg) {
  const button = musicForm.querySelector('button');
  const originalText = button.textContent;

  musicForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = new FormData(musicForm);

    try {
      const response = await fetch(musicForm.action, {
        method: musicForm.method,
        body: data,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        successMsg.style.display = 'block';
        musicForm.reset();

        setTimeout(() => {
          successMsg.style.display = 'none';
        }, 3000);

      } else {
        alert("Ups! Algo correu mal. Tenta novamente.");
      }

    } catch (error) {
      alert("Erro de ligação. Tenta novamente.");
    }

  });
}

// --- FADE AO SCROLL ---
const contactCards = document.querySelectorAll('.contact-card');
const observerContact = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
}, { threshold: 0.2 });

contactCards.forEach(card => observerContact.observe(card));

const menuToggle = document.querySelector('.menu-toggle');
const navList = document.querySelector('.nav-list');
const navLinks = document.querySelectorAll('.nav-list li a');

if (menuToggle && navList) {
  // Abre/fecha menu ao clicar no hamburguer
  menuToggle.addEventListener('click', () => {
    navList.classList.toggle('active');
  });
});
  
