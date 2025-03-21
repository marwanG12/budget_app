import React, { useState, useEffect } from 'react';
import TransactionList from '../components/TransactionList';
import AddTransaction from '../components/AddTransaction';
import FilterTransactions from '../components/FilterTransactions';
import '../Transactions.css';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Toutes');

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
    setTransactions([...transactions, newTransaction]); 
  };

  const handleFilterChange = (category) => {
    console.log('Filtre changé:', category); // Log pour vérifier le changement de filtre
    setSelectedCategory(category);
  };

  const filteredTransactions = selectedCategory === 'Toutes'
    ? transactions
    : transactions.filter(transaction => transaction.category === selectedCategory);

  console.log('Transactions filtrées:', filteredTransactions); // Log pour vérifier les transactions filtrées

  return (
    <div>
      <h1>Transactions</h1>
      <AddTransaction onTransactionAdded={handleTransactionAdded} />
      <FilterTransactions onCategoryChange={handleFilterChange} />
      <TransactionList transactions={filteredTransactions} />
    </div>
  );
};

export default Transactions;
