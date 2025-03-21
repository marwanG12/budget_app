import React, { useState, useEffect } from 'react';
import '../TransactionList.css';  // Assure-toi que ce chemin est correct

const TransactionList = ({ transactions }) => {
  console.log('Transactions dans TransactionList:', transactions); // Log pour vérifier les transactions reçues

  const [transactionsList, setTransactionsList] = useState([]);
  const [editingTransaction, setEditingTransaction] = useState(null); // Etat pour la transaction en cours d'édition
  const [formData, setFormData] = useState({ description: '', amount: '', category: '', type: '' }); // Données du formulaire

  // Fonction pour formater les montants en euros
  const formatAmount = (amount) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
    }).format(amount);
  };

  // Mise à jour de la liste des transactions chaque fois que `transactions` change
  useEffect(() => {
    setTransactionsList(transactions); // Utilise directement les transactions passées en props
  }, [transactions]); // Se déclenche à chaque fois que `transactions` change

  // Fonction pour supprimer une transaction
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/transactions/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setTransactionsList(transactionsList.filter((transaction) => transaction._id !== id));
      } else {
        console.error('Erreur lors de la suppression de la transaction');
      }
    } catch (error) {
      console.error('Erreur de réseau ou autre erreur :', error);
    }
  };

  // Fonction pour éditer une transaction
  const handleEdit = (transaction) => {
    setEditingTransaction(transaction);
    setFormData({
      description: transaction.description,
      amount: transaction.amount,
      category: transaction.category,
      type: transaction.type,
    });
  };

  // Fonction pour gérer les changements dans le formulaire
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Fonction pour soumettre la modification
  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedTransaction = { ...formData };

    try {
      const response = await fetch(`http://localhost:5000/transactions/${editingTransaction._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTransaction),
      });

      if (response.ok) {
        const updatedData = await response.json();
        setTransactionsList(
          transactionsList.map((transaction) =>
            transaction._id === editingTransaction._id ? updatedData : transaction
          )
        );
        setEditingTransaction(null); // Fermer le formulaire après la modification
      } else {
        console.error('Erreur lors de la mise à jour de la transaction');
      }
    } catch (error) {
      console.error('Erreur de réseau ou autre erreur :', error);
    }
  };

  return (
    <div>
      <h2>Liste des transactions</h2>
      <div className="transaction-list">
        {transactionsList.map((transaction) => (
          <div className="transaction-item" key={transaction._id}>
            <h3>{transaction.description}</h3>
            <p><strong>Montant:</strong> {formatAmount(transaction.amount)}</p>
            <p><strong>Date:</strong> {new Date(transaction.date).toLocaleDateString()}</p>
            <p><strong>Catégorie:</strong> {transaction.category}</p>
            <p><strong>Type:</strong> {transaction.type}</p>
            <button onClick={() => handleDelete(transaction._id)}>Supprimer</button>
            <button onClick={() => handleEdit(transaction)}>Modifier</button>
          </div>
        ))}
      </div>

      {editingTransaction && (
        <div className="edit-form">
          <h3>Modifier la transaction</h3>
          <form onSubmit={handleSubmit}>
            <label>
              Description:
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </label>
            <label>
              Montant:
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
              />
            </label>
            <label>
              Catégorie:
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
              />
            </label>
            <label>
              Type:
              <input
                type="text"
                name="type"
                value={formData.type}
                onChange={handleChange}
              />
            </label>
            <button type="submit">Sauvegarder</button>
            <button type="button" onClick={() => setEditingTransaction(null)}>
              Annuler
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
//comment
export default TransactionList;
