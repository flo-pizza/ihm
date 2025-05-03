document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.getElementById('themeToggle');
    const bubbleToggle = document.getElementById('bubbleToggle');
    const bubbleContainer = document.querySelector('.bubble-container');
    let bubbleInterval = null;

    // Appliquer le thème sauvegardé
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark');
        themeToggle.checked = true;
    }

    // Réagir au clic sur le switch de thème
    themeToggle.addEventListener('change', () => {
        if (themeToggle.checked) {
            document.body.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    });

    // Appliquer la police choisie
    const savedFont = localStorage.getItem("fontFamily");
    if (savedFont) {
        document.body.style.fontFamily = `'${savedFont}', sans-serif`;
        document.documentElement.style.setProperty('--font-active', `'${savedFont}', sans-serif`);
    }

    // Bubble animation
    function createBubble() {
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        const size = Math.random() * 200 + 200; // 200-400px
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        bubble.style.left = `${Math.random() * 100}vw`;
        bubble.style.animationDuration = `${Math.random() * 4 + 8}s`; // 8-12s
        bubble.style.animationDelay = `${Math.random() * 1}s`; // 0-1s delay
        // Random color
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        bubble.style.background = `radial-gradient(circle, rgba(${r},${g},${b},0.4), rgba(${r},${g},${b},0.1))`;
        // Random horizontal drift
        const randomX = (Math.random() - 0.5) * 40; // -20 to +20vw
        bubble.style.setProperty('--random-x', randomX);
        if (bubbleContainer) {
            bubbleContainer.appendChild(bubble);
            bubble.addEventListener('animationend', () => {
                bubble.remove();
            });
        }
    }

    // Gérer l'état des bulles
    function toggleBubbles() {
        const isEnabled = localStorage.getItem('bubbles') !== 'disabled';
        if (isEnabled) {
            clearInterval(bubbleInterval);
            bubbleContainer.classList.add('bubbles-disabled');
            bubbleToggle.textContent = '⚫';
            localStorage.setItem('bubbles', 'disabled');
            // Remove existing bubbles
            bubbleContainer.innerHTML = '';
        } else {
            bubbleContainer.classList.remove('bubbles-disabled');
            bubbleInterval = setInterval(createBubble, 2000);
            bubbleToggle.textContent = '🫧';
            localStorage.setItem('bubbles', 'enabled');
        }
    }

    // Initialiser l'état des bulles
    if (bubbleContainer && bubbleToggle) {
        if (localStorage.getItem('bubbles') === 'disabled') {
            bubbleContainer.classList.add('bubbles-disabled');
            bubbleToggle.textContent = '⚫';
        } else {
            bubbleInterval = setInterval(createBubble, 2000);
            bubbleToggle.textContent = '🫧';
        }
        bubbleToggle.addEventListener('click', toggleBubbles);
    }
});