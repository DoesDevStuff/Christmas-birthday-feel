const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

class Particle {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.speed = Math.random() / 5 + 0.1;
    this.opacity = 1;
    this.fadeStart = Date.now() + Math.random() * 600 + 100;
    this.fadingOut = false;
  }

  update() {
    //change to -= if you want this to go upwards like a starry effect instead
    // to have it shine in place the operation is * or +, do not add the equal to sign.
    this.y += this.speed; 
    
    // how shimmery do you want it, lower the speed here, also do you want it to fully fade out and reset or a continuous glitter/ shimmer
    if (this.y < 0 || (this.fadingOut && (this.opacity -= 0.0075) <= 0)) {
      this.reset();
    }
    if (!this.fadingOut && Date.now() > this.fadeStart) {
      this.fadingOut = true;
    }
  }

  draw() {
    ctx.fillStyle = `rgba(${255 - (Math.random() * 127.5)}, 255, 255, ${this.opacity})`;
    // size of the particles is determined here and how wide/ long too
    ctx.fillRect(this.x, this.y, 0.75, Math.random() * 2 + 1);
  }
}

function initParticles() {
  particles = Array.from({ length: Math.floor((canvas.width * canvas.height) / 6000) }, () => new Particle());
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(animate);
}

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initParticles();
});

initParticles();
animate();

// cat magic
const catElement = document.getElementById("cat");
const shadowBackElements = document.getElementsByClassName("shadow-2");
const shadowMedElements = document.getElementsByClassName("shadow-1");

function initCatAnimation() {
  const tlc = new TimelineLite();
  const tl = new TimelineLite();

  // Cat animation timeline (initial hover effect)
  tlc.fromTo(catElement, 1, { opacity: 1, y: 60 }, { opacity: 1, y: 0, delay: 0, ease: Power4.easeOut });

  // Shadow animation timeline
  tl
    .fromTo(shadowBackElements, 2, { opacity: 0 }, { opacity: 0.5, repeat: -1, yoyo: true, delay: 0.5 })
    .fromTo(shadowMedElements, 2, { opacity: 0.25 }, { opacity: 0.5, repeat: -1, yoyo: true });

  // Event listeners for mouseover and mouseout
  addCatHoverEvents(tlc);
}

function addCatHoverEvents(tlc) {
  catElement.onmouseover = function() {
    tlc.reverse();
  };

  catElement.onmouseout = function() {
    tlc.play();
  };
}

// Initialize the cat animation when the page loads
initCatAnimation();