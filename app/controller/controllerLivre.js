const { query } = require('express');
const ModelLivre = require('../model/modelLivre');
const Joi = require('joi').extend(require('@joi/date'));

async function AfficherAllLivres(req, res) {
    let livres = await ModelLivre.AfficherAllLivres()
    if (livres != 0) {
        res.json(livres)
        console.log(livres)
    } else {
        res.status(400).json("[Erreur 404] Aucun livres trouvés")
    }
}

async function AfficherLivre(req, res) {
    const numero = req.params.numero;
    let livresafficher = await ModelLivre.AfficherLivre(numero)
    if (livresafficher.docs.length != 0) {
        res.json(livresafficher.docs[0]);
        console.log(livresafficher.docs[0])
    } else {
        res.status(404).json("[Erreur 404] Aucun livre trouvé");
    }
}

async function AfficherAllPages(req, res) {
    const numero = req.params.numero;
    let livrepages = await ModelLivre.AfficherAllPages(numero)
    if (livrepages.docs.length != 0) {
        res.json(livrepages.docs[0])
        console.log(livrepages.docs[0])
    } else {
        res.status(404).json("[Erreur 404] Ce livre ne contient aucune pages")
    }
}

async function AfficherPage(req, res) {
    const numero = req.params.numero;
    let livrepage = await ModelLivre.AfficherPage(numero)
    if (livrepage.pages.length > 0) {
        if (livrepage.pages[req.params.numpage - 1] != undefined) {
            console.log(livrepage.pages[req.params.numpage - 1])
            res.json(livrepage.pages[req.params.numpage - 1])
        }
        else {
            res.status(404).json("[Erreur 404] Aucune page ne correspond à votre recherche")
        }
    } else {
        res.status(404).json("[Erreur 404] Ce livre ne contient aucune pages")
    }
}

//=================================================================== JOI ===================================================================================

const schemalivreadd = Joi.object({
    titre: Joi.string().required(),
    numero: Joi.number().integer().required(),
    resume: Joi.string().required(),
    pages: Joi.array().items(Joi.string().required()),
    auteur: Joi.string().required(),
    date: Joi.date().format("DD/MM/YYYY").required(),
    nombrePages: Joi.number().integer().required(),
    isbn: Joi.number().integer().required()
})

const schemalivremodif = Joi.object({
    _id: Joi.string(),
    _rev: Joi.string(),
    titre: Joi.string(),
    numero: Joi.number().integer(),
    resume: Joi.string(),
    pages: Joi.array().items(Joi.string()),
    auteur: Joi.string(),
    date: Joi.date().format("DD/MM/YYYY"),
    nombrePages: Joi.number().integer(),
    isbn: Joi.number().integer()
})

//=================================================================== /JOI/ ===================================================================================

async function AjoutLivre(req, res) {
    console.log(req.body)
    let ajoutLivre = req.body
    const { value, error } = schemalivreadd.validate(ajoutLivre);
    console.log(value)
    console.log(error);
    console.log(ajoutLivre)
    if (error == undefined) {
        console.log("coucou1")
        const result = await ModelLivre.AjoutLivre(req.body);
        if (result.ok == true) {
            // res.json({ "Resultat": "Ajout d'un livre" })
            console.log("Livre Ajouté")
        }
        else {

            // res.json({ "Resultat": "Echec de l'ajout" })
            console.log("Livre non Ajouté")

        }
    }else{
        console.log("coucou2")
        console.log(error)
    }
}


module.exports = { AfficherAllLivres, AfficherLivre, AfficherAllPages, AfficherPage, AjoutLivre }
