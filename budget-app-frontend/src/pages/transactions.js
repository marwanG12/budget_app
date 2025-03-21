import React, { useState, useEffect } from 'react';
import TransactionList from '../components/TransactionList';
import AddTransaction from '../components/AddTransaction';
import '../Transactions.css';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await fetch("http://localhost:5000/transactions");
      const data = await response.json();
      setTransactions(data);
    } catch (error) {
      console.error("Erreur lors de la récupération des transactions :", error);
    }
  };

  const handleTransactionAdded = (newTransaction) => {
    setTransactions([...transactions, newTransaction]); // Met à jour la liste en live
  };

  return (
    <div>
      <h1>Transactions</h1>
      <AddTransaction onTransactionAdded={handleTransactionAdded} />
      <TransactionList transactions={transactions} />
    </div>
  );
};

export default Transactions;
