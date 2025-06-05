// script.js
const typingText = document.getElementById("typing-text");
const texts = [
  "Wishing you joy, love, and cake! 🎂",
  "This day is all about you ❤️",
  "May all your wishes come true! ✨"
];

let index = 0, charIndex = 0;
let isTyping = false;

function type() {
  if (isTyping) return;
  isTyping = true;
  typingText.textContent = "";
  charIndex = 0;
  typeWriterEffect();
}

function typeWriterEffect() {
  if (charIndex < texts[index].length) {
    typingText.textContent += texts[index].charAt(charIndex++);
    setTimeout(typeWriterEffect, 80);
  } else {
    typingText.style.borderRight = "2px solid black";
    setTimeout(() => {
      typingText.style.borderRight = "none";
      typingText.textContent = "";
      charIndex = 0;
      index = (index + 1) % texts.length;
      isTyping = false;
      setTimeout(type, 500);
    }, 2000);
  }
}

// NEW: Fancy Wish Box elements and variables
const fancyTypingText = document.getElementById("fancy-typing-text");
const fancyWishes = [
    "“May your special day be wrapped in happiness, tied with joy, and sealed with love.”",
    "“Another year, another adventure! Wishing you the happiest of birthdays.”",
    "“Life’s a journey, not a destination. Enjoy the ride, especially today!”",
    "“Here's to a year of health, wealth, and all the happiness you can handle!”"
];
let fancyIndex = 0, fancyCharIndex = 0;
let isFancyTyping = false;

// NEW: Function for Fancy Wish Box typing animation
function typeFancyWish() {
    if (isFancyTyping) return;
    isFancyTyping = true;
    fancyTypingText.textContent = "";
    fancyCharIndex = 0;
    fancyTypeWriterEffect();
}

function fancyTypeWriterEffect() {
    if (fancyCharIndex < fancyWishes[fancyIndex].length) {
        fancyTypingText.textContent += fancyWishes[fancyIndex].charAt(fancyCharIndex++);
        setTimeout(fancyTypeWriterEffect, 60); // Slightly faster typing for fancy text
    } else {
        fancyTypingText.style.borderRight = "2px solid #8a2be2"; // Show caret for fancy text
        setTimeout(() => {
            fancyTypingText.style.borderRight = "none"; // Hide caret
            fancyTypingText.textContent = "";
            fancyCharIndex = 0;
            fancyIndex = (fancyIndex + 1) % fancyWishes.length;
            isFancyTyping = false;
            setTimeout(typeFancyWish, 2500); // Longer pause for fancy wishes
        }, 4000); // Pause duration after fancy wish is typed
    }
}


function initParticles() {
  if (window.particlesJS) {
    particlesJS("particles-bg", {
      particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: "#ffffff" },
        shape: {
          type: "circle",
          stroke: { width: 0, color: "#000000" },
          polygon: { nb_sides: 5 },
          image: { src: "img/github.svg", width: 100, height: 100 }
        },
        opacity: {
          value: 0.5,
          random: false,
          anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false }
        },
        size: {
          value: 3,
          random: true,
          anim: { enable: false, speed: 40, size_min: 0.1, sync: false }
        },
        line_linked: {
          enable: false,
          distance: 150,
          color: "#ffffff",
          opacity: 0.4,
          width: 1
        },
        move: {
          enable: true,
          speed: 3,
          direction: "none",
          random: false,
          straight: false,
          out_mode: "out",
          bounce: false,
          attract: { enable: false, rotateX: 600, rotateY: 1200 }
        }
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: { enable: true, mode: "grab" },
          onclick: { enable: true, mode: "push" },
          resize: true
        },
        modes: {
          grab: { distance: 140, line_linked: { opacity: 1 } },
          bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 },
          repulse: { distance: 200, duration: 0.4 },
          push: { particles_nb: 4 },
          remove: { particles_nb: 2 }
        }
      },
      retina_detect: true
    });
  }
}

function createDecorativeParticles() {
    const container = document.getElementById('decorative-particles-container');
    container.innerHTML = '';
    const particleCount = 20;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('decorative-particle');

        const size = Math.random() * 8 + 5;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;

        particle.style.left = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${Math.random() * 10}s`;
        particle.style.setProperty('--float-x-offset', `${(Math.random() - 0.5) * 100}px`);

        if (Math.random() > 0.7) {
            particle.classList.add('star');
            particle.textContent = '✨';
            particle.style.fontSize = `${size * 1.5}px`;
            particle.style.width = 'auto';
            particle.style.height = 'auto';
            particle.style.backgroundColor = 'transparent';
            particle.style.borderRadius = '0';
        }

        container.appendChild(particle);
    }
}


document.getElementById("open-btn").addEventListener("click", () => {
  document.getElementById("entry-screen").classList.add("hidden");
  document.getElementById("main-content").classList.remove("hidden");
  const bgMusic = document.getElementById("bg-music");
  bgMusic.play().catch(e => console.error("Music auto-play failed:", e));
  type(); // Start the original typing animation
  typeFancyWish(); // NEW: Start the fancy wish typing animation
  confetti({
    particleCount: 150,
    spread: 180,
    origin: { y: 0.6 }
  });
  initParticles();
  createDecorativeParticles();
});

document.getElementById("message-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const msg = document.getElementById("message").value.trim();
  if (!msg) return;

  const templateParams = {
    message: msg,
    name: "Birthday Visitor"
  };

  emailjs.send("service_2sn9eqv", "template_whj4ljt", templateParams)
    .then(() => {
      alert("🎉 Message sent to Munja's email!");
      document.getElementById("message").value = "";
      const messageWall = document.getElementById("message-wall");
      const newMessageElement = document.createElement("p");
      newMessageElement.textContent = msg;
      messageWall.appendChild(newMessageElement);
    }, (error) => {
      console.error("Failed to send message:", error);
      alert("❌ Failed to send message. Try again later.");
    });
});


const emojis = ["💖", "✨", "🥳", "🎉", "🎂", "🎈", "🎁"];

document.body.addEventListener("click", (e) => {
  const heart = document.createElement("div");
  heart.textContent = emojis[Math.floor(Math.random() * emojis.length)];
  heart.style.position = "absolute";
  heart.style.left = e.pageX + "px";
  heart.style.top = e.pageY + "px";
  heart.style.fontSize = "28px";
  heart.style.pointerEvents = "none";
  heart.style.zIndex = "1000";
  heart.style.setProperty('--random-x', (Math.random() - 0.5) * 100);
  heart.style.animation = "floatUp 2s ease-out forwards";
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 2000);
});

const bgMusic = document.getElementById("bg-music");
const musicToggleButton = document.getElementById("music-toggle-btn");
let isPlaying = false;

musicToggleButton.addEventListener("click", () => {
    if (isPlaying) {
        bgMusic.pause();
        musicToggleButton.innerHTML = '<i class="fas fa-play"></i>';
    } else {
        bgMusic.play().catch(e => console.error("Music play failed:", e));
        musicToggleButton.innerHTML = '<i class="fas fa-pause"></i>';
    }
    isPlaying = !isPlaying;
});

// Adjusted event listener for open-btn to ensure music starts playing and icon updates
document.getElementById("open-btn").addEventListener("click", () => {
    document.getElementById("entry-screen").classList.add("hidden");
    document.getElementById("main-content").classList.remove("hidden");
    const bgMusic = document.getElementById("bg-music");
    bgMusic.play().then(() => {
        isPlaying = true;
        musicToggleButton.innerHTML = '<i class="fas fa-pause"></i>';
    }).catch(e => {
        console.error("Music auto-play failed on open-btn:", e);
        isPlaying = false;
        musicToggleButton.innerHTML = '<i class="fas fa-play"></i>';
    });
    type(); // Start the main typing animation
    typeFancyWish(); // Start the new fancy typing animation
    confetti({
        particleCount: 150,
        spread: 180,
        origin: { y: 0.6 }
    });
    initParticles();
    createDecorativeParticles();
});


document.getElementById("cake").addEventListener("click", () => {
  alert("Candles blown out! 🎉");
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.7 }
  });
});

document.getElementById("download-card").addEventListener("click", () => {
  const msg = document.getElementById("display-message").textContent || "Happy Birthday!";
  const canvas = document.createElement("canvas");
  canvas.width = 600;
  canvas.height = 400;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#fff0f5";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.font = "24px Comic Sans MS";
  ctx.fillStyle = "#d63384";
  ctx.fillText("Happy Birthday XYZ", 180, 100);
  ctx.fillText(msg, 50, 200);
    const link = document.createElement("a");
    link.download = "birthday_card.png";
    link.href = canvas.toDataURL();
    link.click();
});