import React, { useState, useEffect } from 'react';
import '../TransactionList.css';  // Assure-toi que ce chemin est correct

const TransactionList = ({ transactions }) => {
  const [transactionsList, setTransactionsList] = useState([]);

  // Fonction pour formater les montants en euros
  const formatAmount = (amount) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
    }).format(amount);
  };

    
    
  useEffect(() => {
    //fonction async qui continent un call api axios vers ton backend qui vas te retourner ta liste de course
    //si tas un resultat tu le stocke dans ton state
    const fetchTransactions = async () => {
      try {
        const response = await fetch("http://localhost:5000/transactions");
        const data = await response.json();
        setTransactionsList(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des transactions :", error);
      }
    };
    fetchTransactions();
  }, []);

  // Fonction pour supprimer une transaction
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/transactions/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Mettre à jour l'état des transactions en supprimant la transaction
        setTransactionsList(transactionsList.filter((transaction) => transaction._id !== id));
      } else {
        console.error('Erreur lors de la suppression de la transaction');
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionList;
