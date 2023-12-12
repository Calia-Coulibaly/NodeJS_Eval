// -- utilisation du module Express
const express = require("express");
const app = express();
const { RouterLivre } = require('./app/router/routerLivre');
app.use(RouterLivre);

// //=================================================================== JOI ===================================================================================

// const Joi = require('joi').extend(require('@joi/date'));
// const schemalivreadd = Joi.object({
//     titre: Joi.string().required(),
//     numero: Joi.number().integer().required(),
//     resume: Joi.string().required(),
//     pages: Joi.array().items(Joi.string().required()),
//     auteur: Joi.string().required(),
//     date: Joi.date().format("DD/MM/YYYY").required(),
//     nombrePages: Joi.number().integer().required(),
//     isbn: Joi.number().integer().required()
// })

// const schemalivremodif = Joi.object({
//     _id: Joi.string(),
//     _rev: Joi.string(),
//     titre: Joi.string(),
//     numero: Joi.number().integer(),
//     resume: Joi.string(),
//     pages: Joi.array().items(Joi.string()),
//     auteur: Joi.string(),
//     date: Joi.date().format("DD/MM/YYYY"),
//     nombrePages: Joi.number().integer(),
//     isbn: Joi.number().integer()
// })

// //======================================================================================================================================================

// // route /livres qui affiche ajout d'un livre
// app.post("/livres", async (req, res) => {
//     const { value, error } = schemalivreadd.validate(req.body);
//     console.log(value)
//     if (error == undefined) {
//         let add = await dbSLivres.insert(req.body);
//         console.log(add)
//     } else {
//         console.log(error)
//     }
// })

// // route /livres qui affiche modification d'un livre
// app.put("/livres/:numero", async (req, res) => {
//     const query = {
//         "selector": { "numero": parseInt(req.params.numero) },
//         "fields": ["_id", "_rev"],
//     }
//     let livresafficher = await dbSLivres.find(query)
//     console.log(livresafficher)

//     let modiflivre = {
//         "_id": livresafficher.docs[0]._id,
//         "_rev": livresafficher.docs[0]._rev,
//         "titre": req.body.titre,
//         "numero": req.body.numero,
//         "resume": req.body.resume,
//         "pages": req.body.pages,
//         "auteur": req.body.auteur,
//         "date": req.body.date,
//         "nombrePages": req.body.nombrePages,
//         "isbn": req.body.isbn
//     }

//     const { value, error } = schemalivremodif.validate(modiflivre);
//     if (error == undefined) {
//         let modif = await dbSLivres.insert(modiflivre);
//         console.log(modif)
//     } else {
//         console.log(error)
//     }
//     let livresafficher2 = await dbSLivres.find(query)
//     console.log(livresafficher2)
// })

// // route /livres qui supprime un livre
// app.delete("/livres/:numero", async (req, res) => {
//     const query = {
//         "selector": { "numero": parseInt(req.params.numero) },
//         "fields": ["_id", "_rev"],
//     }
//     let livresupr = await dbSLivres.find(query)
//     console.log(livresupr)

//     let livresupprimer = await dbSLivres.destroy(livresupr.docs[0]._id, livresupr.docs[0]._rev)
//     console.log(livresupprimer)

//     let livresupr2 = await dbSLivres.find(query)
//     console.log(livresupr2)
// })


// -- lancer le serveur pour qu'il écoute sur le port 8080
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
 console.log(`Le serveur est lancé sur le port : ${PORT}`);
});