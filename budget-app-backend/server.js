const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config(); // Charger les variables d'environnement

const app = express();

// Middleware pour analyser le corps des requêtes en JSON
app.use(express.json());


mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("✅ Connecté à MongoDB"))
    .catch((err) => console.error("❌ Erreur de connexion à MongoDB :", err));


const Transaction = require('./models/transaction');



// Route POST pour ajouter une transaction
app.post('/transactions', async (req, res) => {
    try {
        const { description, amount, date, category, type } = req.body;
        if (!['revenu', 'dépense'].includes(type)) {
            return res.status(400).json({ message: "Le type doit être 'revenu' ou 'dépense'" });
        }
        const newTransaction = new Transaction({ description, amount, date, category, type });
        await newTransaction.save();
        res.status(201).json({ message: 'Transaction ajoutée avec succès', newTransaction });
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: "Erreur lors de l'ajout de la transaction", error: err.message });
    }
});


// Route DELETE pour supprimer une transaction par ID
app.delete('/transactions/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const transaction = await Transaction.findByIdAndDelete(id);
        if (!transaction) {
            return res.status(404).json({ message: 'Transaction non trouvée' });
        }
        res.json({ message: 'Transaction supprimée avec succès' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la suppression de la transaction' });
    }
});




// Route GET pour récupérer toutes les transactions
app.get('/transactions', async (req, res) => {
    try {
        const { type, category } = req.query;  // Récupérer le type et la catégorie depuis l'URL (query param)
        let filter = {};

        if (type) {
            filter.type = type;  // Ajouter le type comme filtre si fourni
        }

        if (category) {
            filter.category = category;  // Ajouter la catégorie comme filtre si fournie
        }

        const transactions = await Transaction.find(filter);
        res.json(transactions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la récupération des transactions' });
    }
});



// Route PATCH pour mettre à jour une transaction par ID
app.patch('/transactions/:id', async (req, res) => {
    const { id } = req.params;
    const { description, amount, date, category, type } = req.body;

    // Vérifier si le type est valide
    if (type && !['dépense', 'revenu'].includes(type)) {
        return res.status(400).json({ message: 'Type incorrect, il doit être "dépense" ou "revenu"' });
    }

    try {
        // Mettre à jour la transaction avec les nouvelles valeurs
        const transaction = await Transaction.findByIdAndUpdate(
            id, 
            { description, amount, date, category, type }, 
            { new: true }
        );
        
        if (!transaction) {
            return res.status(404).json({ message: 'Transaction non trouvée' });
        }
        
        res.json(transaction);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la mise à jour de la transaction' });
    }
});





app.get('/totaux', async (req, res) => {
    try {
        const { startDate, endDate } = req.query;

        // Construire la condition de filtrage pour les dates
        const filter = {};

        if (startDate) {
            filter.date = { ...filter.date, $gte: new Date(startDate) };
        }
        if (endDate) {
            filter.date = { ...filter.date, $lte: new Date(endDate) };
        }

        // Récupérer les transactions avec le filtre de date
        const transactions = await Transaction.find(filter);

        // Calculer le total des dépenses et des revenus
        const totalRevenus = transactions
            .filter(transaction => transaction.type === 'revenu')
            .reduce((sum, transaction) => sum + transaction.amount, 0);
        
        const totalDepenses = transactions
            .filter(transaction => transaction.type === 'dépense')
            .reduce((sum, transaction) => sum + transaction.amount, 0);

        res.json({
            totalRevenus,
            totalDepenses
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la récupération des totaux' });
    }
});





app.get('/totaux-par-categorie', async (req, res) => {
    try {
        const { startDate, endDate } = req.query;

        // Construire la condition de filtrage pour les dates
        const filter = {};

        if (startDate) {
            filter.date = { ...filter.date, $gte: new Date(startDate) };
        }
        if (endDate) {
            filter.date = { ...filter.date, $lte: new Date(endDate) };
        }

        // Récupérer toutes les transactions avec filtre de date
        const transactions = await Transaction.find(filter);

        // Calculer les totaux par catégorie
        const totauxParCategorie = transactions.reduce((totaux, transaction) => {
            const { category, amount } = transaction;

            if (!totaux[category]) {
                totaux[category] = 0;
            }

            totaux[category] += amount;

            return totaux;
        }, {});

        res.json(totauxParCategorie);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la récupération des totaux par catégorie' });
    }
});


// Démarrer le serveur
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`🚀 Serveur lancé sur le port ${port}`);
});
