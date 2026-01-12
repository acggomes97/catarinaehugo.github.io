// Formulários
document.getElementById('musicasForm').addEventListener('submit', e=>{
  e.preventDefault();
  document.getElementById('respostaMusica').textContent="Obrigado! Sua sugestão foi enviada.";
  e.target.reset();
});
document.getElementById('contactForm').addEventListener('submit', e=>{
  e.preventDefault();
  document.getElementById('respostaContato').textContent="Obrigado! Entraremos em contacto em breve.";
  e.target.reset();
});

// Contagem regressiva
const countdownEl = document.getElementById('countdown');
const weddingDate = new Date('2026-06-12T15:00:00');
function updateCountdown(){
    const now=new Date();
    const diff=weddingDate-now;
    if(diff<=0){countdownEl.textContent="O grande dia chegou!";clearInterval(interval);return;}
    const days=Math.floor(diff/(1000*60*60*24));
    const hours=Math.floor((diff/(1000*60*60))%24);
    const minutes=Math.floor((diff/(1000*60))%60);
    const seconds=Math.floor((diff/1000)%60);
    countdownEl.textContent=`${days}d ${hours}h ${minutes}m ${seconds}s`;
}
const interval=setInterval(updateCountdown,1000);
updateCountdown();

// Fade-in nas seções
const sections=document.querySelectorAll('.fade-section');
const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){entry.target.classList.add('fade-in');}
  });
},{threshold:0.2});
sections.forEach(sec=>observer.observe(sec));

// Pétalas caindo
const canvas=document.getElementById('petalas');
const ctx=canvas.getContext('2d');
canvas.width=window.innerWidth; canvas.height=window.innerHeight;
const petals=[];
for(let i=0;i<50;i++){petals.push({x:Math.random()*canvas.width,y:Math.random()*canvas.height,r:Math.random()*5+2,speed:Math.random()*1+0.5})}
function drawPetals(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle='rgba(181,28,28,0.7)';
    petals.forEach(p=>{
        ctx.beginPath();
        ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fill();
        p.y+=p.speed;
        if(p.y>canvas.height){p.y=-10;p.x=Math.random()*canvas.width;}
    });
    requestAnimationFrame(drawPetals);
}
drawPetals();
window.addEventListener('resize',()=>{canvas.width=window.innerWidth;canvas.height=window.innerHeight;});
