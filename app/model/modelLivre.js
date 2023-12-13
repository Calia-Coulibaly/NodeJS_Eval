// -- utilisation du module nano
// utilisation du module et tentative de connexion Loclahost = 127.0.0.1
const nano = require('nano')('http://horsedarkfire:Fire_horse84@127.0.0.1:5984');

// choix d’une base de données
const dbsLivres = nano.db.use('livres');

const AfficherAllLivres = async () => {
    // Afficher tous les livres de la BDD
    const query = {
        "selector": {},
        "fields": ["titre", "resume", "auteur", "date"],
    }
    const result = await dbsLivres.find(query);
    return await result.docs
}

const AfficherLivre = async (numero) => {
    const query = {
        "selector": { "numero": parseInt(numero) },
        "fields": ["titre", "resume", "auteur", "date", "nombrePages", "pages"],
    };
    const result = await dbsLivres.find(query);
    return result;
};

const AfficherAllPages = async (numero) => {
    const query = {
        "selector": { "numero": parseInt(numero) },
        "fields": ["pages"],
    }
    const result = await dbsLivres.find(query);
    return result;
}

const AfficherPage = async (numero) => {
    const query = {
        "selector": { "numero": parseInt(numero) },
        "fields": ["pages"],
    }
    const result = await dbsLivres.find(query);
    return result.docs[0]

}

const AjoutLivre = async (newlivre) => {
    const result = await dbsLivres.insert(newlivre);
    return result
}

const SupprimerLivre = async (numero) => {
    const query = {
        "selector": { "numero": parseInt(numero) },
        "fields": ["_id", "_rev"],
    }
    const result = await dbsLivres.find(query);
    if (result.docs.length !== 0) {
        return await dbsLivres.destroy(result.docs[0]._id, result.docs[0]._rev);
    }
    return result;
}


const ModifLivre = async (numero, modifLivre) => {
    const query = {
        "selector": { "numero": parseInt(numero) },
        "fields": ["_id", "_rev"],
    };

    const result = await dbsLivres.find(query);
    if (result.docs.length !== 0) {
        let modiflivre = {
            "_id": result.docs[0]._id,
            "_rev": result.docs[0]._rev,
            "titre": modifLivre.titre,
            "numero": modifLivre.numero,
            "resume": modifLivre.resume,
            "pages": modifLivre.pages,
            "auteur": modifLivre.auteur,
            "date": modifLivre.date,
            "nombrePages": modifLivre.nombrePages,
            "isbn": modifLivre.isbn
        }
        let modif = await dbsLivres.insert(modiflivre);
        return modif;
    }
    

}

module.exports = { AfficherAllLivres, AfficherLivre, AfficherAllPages, AfficherPage, AjoutLivre, SupprimerLivre, ModifLivre }