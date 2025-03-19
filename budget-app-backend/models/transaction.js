const mongoose = require('mongoose');

// Liste des catégories autorisées
// const validCategories = ['Alimentation', 'Transport', 'Loisirs', 'Santé', 'Revenu'];

// Définir le schéma pour une transaction
const transactionSchema = new mongoose.Schema({
    description: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: Date, required: true },
    category: {
        type: String,
        enum: ['Alimentation', 'Transport', 'Loisirs', 'Santé', 'Salaire', 'Investissement', 'Autres'],
        required: true
    },
    type: { 
        type: String, 
        enum: ['revenu', 'dépense'], 
        required: true 
    }
});





// Créer le modèle de la transaction
const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;