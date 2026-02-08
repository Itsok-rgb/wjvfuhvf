/**
 * Chocolate Day - Personalized for Jaan
 * Full of sweet surprises! 🍫💝
 */

document.addEventListener('DOMContentLoaded', () => {
  initChocoParticles();
  initSurpriseButton();
  initMessageReveal();
  initChocoBoxes();
  initModal();
  initEasterEgg();
  initNameAnimation();
});

// ===== 1. CHOCOLATE PARTICLE BACKGROUND =====
function initChocoParticles() {
  const container = document.getElementById('choco-particles');
  const emojis = ['🍫', '💝', '❤️', '✨', '🍩', '💕'];
  const count = 25;

  for (let i = 0; i < count; i++) {
    const particle = document.createElement('span');
    particle.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    particle.className = 'choco-particle';
    particle.style.cssText = `
      position: absolute;
      left: ${Math.random() * 100}vw;
      top: ${Math.random() * 100}vh;
      font-size: ${14 + Math.random() * 20}px;
      opacity: ${0.2 + Math.random() * 0.4};
      animation: floatParticle ${8 + Math.random() * 12}s linear infinite;
      animation-delay: ${-Math.random() * 10}s;
    `;
    container.appendChild(particle);
  }

  // Inject keyframes for particles
  const style = document.createElement('style');
  style.textContent = `
    @keyframes floatParticle {
      0% { transform: translate(0, 0) rotate(0deg); }
      25% { transform: translate(10px, -30px) rotate(90deg); }
      50% { transform: translate(-15px, -60px) rotate(180deg); }
      75% { transform: translate(5px, -90px) rotate(270deg); }
      100% { transform: translate(0, -120px) rotate(360deg); }
    }
  `;
  document.head.appendChild(style);
}

// ===== 2. SURPRISE BUTTON - Opens modal with secret message =====
const secretMessages = [
  "Jaan, you're the reason my life is so sweet! Every moment with you feels like biting into the finest chocolate. I'm so lucky to have you! 💕",
  "Did you know? You're sweeter than any chocolate in the world. Thank you for being my favourite person! 🍫❤️",
  "To Jaan: My heart melts for you like chocolate in the sun. Happy Chocolate Day, my love! Forever yours. 💝",
  "Jaan, life without you would be like coffee without sugar—incomplete! You're my perfect blend. I love you! ☕💗",
  "You're the cocoa to my milk, the sugar to my life. Happy Chocolate Day, Jaan! Here's to many more sweet moments together! 🍩✨",
  "Jaan, I don't need a map—I get lost in your eyes every time. Stay this sweet forever. 😘💝",
  "They say chocolate is addictive. Well, so are you—and I'm not even trying to quit. 💋🍫",
  "Jaan, you're the only one I want to share my last piece of chocolate with. That's true love. ❤️"
];

function initSurpriseButton() {
  const btn = document.getElementById('surpriseBtn');
  const modal = document.getElementById('secretModal');
  const secretEl = document.getElementById('secretMessage');
  const heartsFall = document.getElementById('heartsFall');

  btn.addEventListener('click', () => {
    const msg = secretMessages[Math.floor(Math.random() * secretMessages.length)];
    secretEl.textContent = msg;
    modal.classList.add('active');
    createFallingHearts(heartsFall);
    // Confetti burst
    createConfetti();
  });
}

// ===== 3. FALLING HEARTS IN MODAL =====
function createFallingHearts(container) {
  container.innerHTML = '';
  const symbols = ['💝', '❤️', '🍫', '💕', '✨'];
  for (let i = 0; i < 15; i++) {
    const heart = document.createElement('span');
    heart.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    heart.style.cssText = `
      position: absolute;
      left: ${Math.random() * 100}%;
      top: -20px;
      font-size: ${16 + Math.random() * 20}px;
      animation: fallHeart ${2 + Math.random() * 2}s linear forwards;
      animation-delay: ${Math.random() * 0.5}s;
    `;
    container.appendChild(heart);
  }
  const style = document.createElement('style');
  if (!document.getElementById('fall-heart-style')) {
    style.id = 'fall-heart-style';
    style.textContent = `
      @keyframes fallHeart {
        to { transform: translateY(100vh) rotate(720deg); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }
}

// ===== 4. CONFETTI BURST =====
function createConfetti() {
  const colors = ['#8b5a2b', '#d2691e', '#cd853f', '#a0522d', '#f5deb3', '#c4844a'];
  for (let i = 0; i < 40; i++) {
    const angle = (Math.PI * 2 * i) / 40 + Math.random();
    const dist = 150 + Math.random() * 150;
    const x = Math.cos(angle) * dist;
    const y = Math.sin(angle) * dist - 50;
    const confetti = document.createElement('div');
    confetti.style.cssText = `
      position: fixed;
      left: 50%;
      top: 50%;
      width: ${8 + Math.random() * 8}px;
      height: ${8 + Math.random() * 8}px;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
      transform: translate(-50%, -50%);
      animation: confettiBurst${i} 1.5s ease-out forwards;
    `;
    const keyframes = `
      @keyframes confettiBurst${i} {
        0% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
        100% { transform: translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(0); opacity: 0; }
      }
    `;
    const style = document.createElement('style');
    style.textContent = keyframes;
    document.head.appendChild(style);
    document.body.appendChild(confetti);
    setTimeout(() => {
      confetti.remove();
      style.remove();
    }, 1500);
  }
}

// ===== 5. HIDDEN LOVE MESSAGE - Reveal on first scroll =====
function initMessageReveal() {
  const hiddenLove = document.querySelector('.hidden-love');
  let revealed = false;
  window.addEventListener('scroll', () => {
    if (!revealed && window.scrollY > 100) {
      hiddenLove.classList.add('reveal');
      revealed = true;
    }
  });
}

// ===== 6. CHOCO BOXES - Tooltip already in CSS, add click surprise =====
function initChocoBoxes() {
  document.querySelectorAll('.choco-box').forEach((box, i) => {
    box.addEventListener('click', () => {
      box.style.animation = 'none';
      box.offsetHeight; // trigger reflow
      box.style.animation = 'chocoPop 0.5s ease';
      const style = document.createElement('style');
      style.textContent = `
        @keyframes chocoPop {
          0% { transform: scale(1); }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }
      `;
      document.head.appendChild(style);
      setTimeout(() => style.remove(), 500);
    });
  });
}

// ===== 7. MODAL CLOSE =====
function initModal() {
  const modal = document.getElementById('secretModal');
  document.getElementById('modalClose').addEventListener('click', () => {
    modal.classList.remove('active');
  });
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('active');
  });
}

// ===== 8. EASTER EGG - Triple click on name "Jaan" =====
function initEasterEgg() {
  const nameEl = document.getElementById('nameDisplay');
  const eggEl = document.getElementById('easterEgg');
  let clickCount = 0;
  let timer = null;

  nameEl.addEventListener('click', () => {
    clickCount++;
    clearTimeout(timer);
    if (clickCount === 3) {
      eggEl.textContent = '🍫 You found the secret! Jaan, you\'re the best! I love you! 💝';
      eggEl.classList.add('show');
      clickCount = 0;
      setTimeout(() => eggEl.classList.remove('show'), 4000);
    }
    timer = setTimeout(() => { clickCount = 0; }, 500);
  });
}

// ===== 9. NAME TYPING / GLOW ANIMATION ON LOAD =====
function initNameAnimation() {
  const nameEl = document.getElementById('nameDisplay');
  const name = 'Jaan';
  nameEl.textContent = '';
  nameEl.style.opacity = '1';
  let i = 0;
  const typeInterval = setInterval(() => {
    if (i < name.length) {
      nameEl.textContent += name[i];
      i++;
    } else {
      clearInterval(typeInterval);
      nameEl.style.textShadow = '0 0 25px rgba(245, 222, 179, 0.8), 0 0 50px rgba(205, 133, 63, 0.5)';
    }
  }, 200);
}
