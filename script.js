/**
 * 20/10 GỬI MẸ YÊU DẤU - JAVASCRIPT
 * 1. Gentle falling petals & ambient light particles on HTML5 Canvas
 * 2. Background soothing lullaby melody (Acoustic music box, adjusted tempo to be slightly faster)
 * 3. Interactive bouquet click with blossoming floral petals & sparkles
 */

document.addEventListener('DOMContentLoaded', () => {
  initCanvas();
  initMusicBox();
  initBouquetInteractions();
});

/* ==========================================================================
   1. Canvas Ambient Petals & Magical Dust Particles
   ========================================================================== */
function initCanvas() {
  const canvas = document.getElementById('ambient-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const petals = [];
  const sparkles = [];
  const petalCount = window.innerWidth < 600 ? 20 : 32;
  const sparkleCount = window.innerWidth < 600 ? 16 : 26;

  const petalColors = [
    'rgba(255, 182, 193, 0.75)',
    'rgba(255, 192, 203, 0.8)',
    'rgba(244, 124, 148, 0.7)',
    'rgba(254, 215, 226, 0.85)',
    'rgba(255, 230, 235, 0.7)',
    'rgba(255, 218, 185, 0.75)'
  ];

  class Petal {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : -20;
      this.size = Math.random() * 8 + 8;
      this.speedY = Math.random() * 1.1 + 0.6;
      this.speedX = Math.random() * 0.8 - 0.4;
      this.angle = Math.random() * Math.PI * 2;
      this.angleSpeed = (Math.random() - 0.5) * 0.03;
      this.swing = Math.random() * 2;
      this.swingSpeed = Math.random() * 0.02 + 0.01;
      this.color = petalColors[Math.floor(Math.random() * petalColors.length)];
      this.opacity = Math.random() * 0.4 + 0.5;
    }

    update() {
      this.angle += this.angleSpeed;
      this.y += this.speedY;
      this.x += Math.sin(this.y * this.swingSpeed) * this.swing + this.speedX;

      if (this.y > height + 20 || this.x < -30 || this.x > width + 30) {
        this.reset();
      }
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angle);
      ctx.fillStyle = this.color;
      ctx.globalAlpha = this.opacity;

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.quadraticCurveTo(this.size / 2, -this.size / 1.5, this.size, 0);
      ctx.quadraticCurveTo(this.size / 2, this.size / 1.5, 0, 0);
      ctx.fill();

      ctx.restore();
    }
  }

  class Sparkle {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = width * 0.5 + (Math.random() - 0.5) * Math.min(width * 0.85, 520);
      this.y = initial ? Math.random() * height : height * 0.75 + Math.random() * 80;
      this.radius = Math.random() * 2 + 1;
      this.speedY = -(Math.random() * 0.6 + 0.3);
      this.speedX = (Math.random() - 0.5) * 0.4;
      this.alpha = Math.random() * 0.6 + 0.2;
      this.alphaChange = (Math.random() * 0.01 + 0.005) * (Math.random() > 0.5 ? 1 : -1);
    }

    update() {
      this.y += this.speedY;
      this.x += this.speedX;
      this.alpha += this.alphaChange;

      if (this.alpha <= 0.1 || this.alpha >= 0.85) {
        this.alphaChange *= -1;
      }

      if (this.y < 30) {
        this.reset();
      }
    }

    draw() {
      ctx.save();
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 235, 175, ${this.alpha})`;
      ctx.shadowBlur = 6;
      ctx.shadowColor = 'rgba(255, 220, 130, 0.8)';
      ctx.fill();
      ctx.restore();
    }
  }

  for (let i = 0; i < petalCount; i++) petals.push(new Petal());
  for (let i = 0; i < sparkleCount; i++) sparkles.push(new Sparkle());

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < sparkles.length; i++) {
      sparkles[i].update();
      sparkles[i].draw();
    }

    for (let i = 0; i < petals.length; i++) {
      petals[i].update();
      petals[i].draw();
    }

    requestAnimationFrame(animate);
  }

  animate();
}

/* ==========================================================================
   2. Web Audio API Soothing Lullaby Music Box (Tuning: Faster & Flowing)
   Tender, maternal melody in F Major / D Minor, tempo increased by ~33%
   ========================================================================== */
function initMusicBox() {
  let audioCtx = null;
  let isPlaying = false;
  let melodyTimer = null;
  let noteIndex = 0;

  // Lullaby melody notes with duration
  const notes = [
    { freq: 349.23, dur: 1.1 }, // F4
    { freq: 440.00, dur: 1.1 }, // A4
    { freq: 523.25, dur: 1.3 }, // C5
    { freq: 587.33, dur: 1.1 }, // D5
    { freq: 523.25, dur: 1.2 }, // C5
    { freq: 440.00, dur: 1.1 }, // A4
    { freq: 392.00, dur: 1.2 }, // G4
    { freq: 349.23, dur: 1.6 }, // F4

    { freq: 392.00, dur: 1.1 }, // G4
    { freq: 440.00, dur: 1.1 }, // A4
    { freq: 466.16, dur: 1.2 }, // Bb4
    { freq: 523.25, dur: 1.3 }, // C5
    { freq: 440.00, dur: 1.2 }, // A4
    { freq: 349.23, dur: 1.1 }, // F4
    { freq: 293.66, dur: 1.3 }, // D4
    { freq: 349.23, dur: 1.8 }, // F4
  ];

  const chordRoots = [174.61, 220.00, 261.63, 146.83]; // F3, A3, C4, D3

  function playTone(freq, duration, type = 'sine', volume = 0.16) {
    if (!audioCtx) return;
    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

      gain.gain.setValueAtTime(0.0001, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(volume, audioCtx.currentTime + 0.06);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      // Audio playback caught
    }
  }

  function stepMelody() {
    if (!isPlaying) return;

    const currentNote = notes[noteIndex % notes.length];

    // Primary music box bell
    playTone(currentNote.freq, currentNote.dur * 1.3, 'sine', 0.15);
    // Warm harmonic sparkle
    playTone(currentNote.freq * 2, currentNote.dur * 0.9, 'triangle', 0.04);

    // Warm bass chord on every 4th note
    if (noteIndex % 4 === 0) {
      const bassFreq = chordRoots[(noteIndex / 4) % chordRoots.length];
      playTone(bassFreq, 2.2, 'sine', 0.09);
    }

    noteIndex++;
    // Tempo increased from 720ms to 480ms per beat
    melodyTimer = setTimeout(stepMelody, currentNote.dur * 480);
  }

  function startMusic() {
    if (isPlaying) return;

    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }

    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    isPlaying = true;
    stepMelody();
  }

  // Smoothly start music on first user touch / click anywhere on page
  const unlockAudio = () => {
    startMusic();
    document.removeEventListener('click', unlockAudio);
    document.removeEventListener('touchstart', unlockAudio);
  };

  document.addEventListener('click', unlockAudio, { once: true });
  document.addEventListener('touchstart', unlockAudio, { once: true });
}

/* ==========================================================================
   3. Interactive Bouquet Reactions (Clicking emits fluttering flowers & hearts)
   ========================================================================== */
function initBouquetInteractions() {
  const flowerWrapper = document.getElementById('flower-wrapper');
  if (!flowerWrapper) return;

  const flowerIcons = ['🌸', '💐', '🌷', '🌼', '✨', '💖', '🌹'];

  flowerWrapper.addEventListener('click', (e) => {
    const rect = flowerWrapper.getBoundingClientRect();
    const x = e.clientX || rect.left + rect.width / 2;
    const y = e.clientY || rect.top + rect.height / 2;

    for (let i = 0; i < 14; i++) {
      const el = document.createElement('div');
      el.className = 'floating-heart';
      el.textContent = flowerIcons[Math.floor(Math.random() * flowerIcons.length)];
      el.style.left = `${x}px`;
      el.style.top = `${y}px`;
      el.style.fontSize = `${Math.random() * 12 + 18}px`;
      el.style.setProperty('--tx', `${(Math.random() - 0.5) * 260}px`);
      el.style.setProperty('--rot', `${(Math.random() - 0.5) * 80}deg`);

      document.body.appendChild(el);
      setTimeout(() => el.remove(), 2600);
    }
  });
}
