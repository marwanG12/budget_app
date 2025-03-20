import React from 'react';

const TransactionList = () => {
  // Simulations de transactions (à remplacer par des données du backend)
  const transactions = [
    { id: 1, description: 'Achat supermarché', amount: -50, date: '2025-03-19' },
    { id: 2, description: 'Salaire', amount: 2000, date: '2025-03-15' },
    { id: 3, description: 'Netflix', amount: -15, date: '2025-03-10' },
  ];

  return (
    <div>
      <h2>Liste des Transactions</h2>
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction.id}>
            {transaction.date} - {transaction.description} : <strong>{transaction.amount}€</strong>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;