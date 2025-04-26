const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

// Define the root directory (one level up from 'serveur')
const rootDir = path.join(__dirname, '..');

// Middleware for CORS
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
});

// Serve static files from the root directory
app.use('/images', express.static(path.join(rootDir, 'images'))); // favicon.png
app.use('/css', express.static(path.join(rootDir, 'css'))); // style.css
app.use('/js', express.static(path.join(rootDir, 'js'))); // theme.js
app.use('/cours/Css', express.static(path.join(rootDir, 'cours', 'Css'))); // defaultPrinter.css, pleinePage.css
app.use('/cours/js', express.static(path.join(rootDir, 'cours', 'js'))); // menu.js

// Serve images from the 'imagettes' folder inside 'serveur'
app.use('/imagettes', express.static(path.join(__dirname, 'imagettes'))); // adobeXD.png, balsamiq.png, etc.

// Serve all static files from the root directory (for HTML files like a-propos.html, faq.html, etc.)
app.use(express.static(rootDir));

// Serve API route for tools.js (located in 'serveur')
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

// Serve API route for ressources.json (located in 'serveur/api')
app.get('/api/ressources', (req, res) => {
    fs.readFile(path.join(__dirname, 'api', 'ressources.json'), 'utf8', (err, data) => {
        if (err) {
            res.status(500).send("Erreur de lecture du fichier JSON.");
            return;
        }
        res.setHeader('Content-Type', 'application/json');
        res.send(data);
    });
});

// Serve index.html at the root route
app.get('/', (req, res) => {
    const filePath = path.join(rootDir, 'index.html');
    if (fs.existsSync(filePath)) {
        res.sendFile(filePath);
    } else {
        res.status(404).send('File not found: index.html');
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
