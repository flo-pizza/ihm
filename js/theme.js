console.log("Script chargé !");

/* fonctionnement bouton jour/nuit */
const themeToggle = document.getElementById('themeToggle');

// Appliquer le thème sauvegardé
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark');
    themeToggle.checked = true;
}

// Réagir au clic sur le switch
themeToggle.addEventListener('change', () => {
    if (themeToggle.checked) {
        document.body.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    } else {
        document.body.classList.remove('dark');
        localStorage.setItem('theme', 'light');
    }

    // Appliquer la police choisie (si elle existe en localStorage)
    document.addEventListener("DOMContentLoaded", () => {
        const savedFont = localStorage.getItem("fontFamily");
        if (savedFont) {
            document.body.style.fontFamily = `'${savedFont}', sans-serif`;
        }
    });

});
