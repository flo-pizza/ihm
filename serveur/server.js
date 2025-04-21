const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*"); // ou précise l'origine exacte si besoin
    res.setHeader("Access-Control-Allow-Methods", "GET, POST");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
});

// 1. Servir les images statiques depuis /imagettes
app.use('/images', express.static(path.join(__dirname, 'imagettes')));

// 2. Permettre l'accès au fichier JSON via une route
app.get('/api/tools', (req, res) => {
    fs.readFile(path.join(__dirname, 'tools.js'), 'utf8', (err, data) => {
        if (err) {
            res.status(500).send("Erreur de lecture du fichier JSON.");
            return;
        }
        res.setHeader('Content-Type', 'application/json');
        res.send(data);
    });
});

// 3. Lancer le serveur
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Serveur en écoute sur http://localhost:${PORT}`);
});
