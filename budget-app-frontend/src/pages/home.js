import React from 'react';
import TotalTransactions from '../components/TotalTransactions';
import TotalTransactionsCategory from '../components/TotalTransactionsCategory';

const Home = () => {
  return (
    <div>
      <h2>Bienvenue sur la page d'accueil</h2>
      <TotalTransactions />
      <TotalTransactionsCategory />
    </div>
  );
};

export default Home;