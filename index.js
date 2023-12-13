// -- utilisation du module Express
const express = require("express");
const app = express(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const { RouterLivre } = require('./app/router/routerLivre');
app.use(RouterLivre);

// -- lancer le serveur pour qu'il écoute sur le port 8080
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
 console.log(`Le serveur est lancé sur le port : ${PORT}`);
});