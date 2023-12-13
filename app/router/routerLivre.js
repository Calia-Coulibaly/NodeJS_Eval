// utilisation d'un routeur Express
const express = require("express");
const RouterLivre = express.Router();

// utilisation du controller de gestion des livres
const ControllerLivre = require("../controller/controllerLivre.js");

// route / qui affiche API de gestion des livres
RouterLivre.get("/", (req, res) => {
    res.send("API de gestion des livres");
});

// route /livres qui affiche Liste des livres
RouterLivre.get("/livres", ControllerLivre.AfficherAllLivres);

// route /livres qui affiche les infos d'un livre
RouterLivre.get("/livres/:numero", ControllerLivre.AfficherLivre);

// route /livres qui affiche Liste des pages
RouterLivre.get("/livres/:numero/pages", ControllerLivre.AfficherAllPages);

// route /livres qui affiche une page d'un livre
RouterLivre.get("/livres/:numero/pages/:numpage", ControllerLivre.AfficherPage);

// route /livres qui affiche ajout d'un livre
RouterLivre.post("/livres", ControllerLivre.AjoutLivre)

// route /livres qui supprime un livre
RouterLivre.delete("/livres/:numero", ControllerLivre.SupprimerLivre)

// route /livres qui modifie un livre
RouterLivre.put("/livres/:numero", ControllerLivre.ModifierLivre)


module.exports = { RouterLivre }