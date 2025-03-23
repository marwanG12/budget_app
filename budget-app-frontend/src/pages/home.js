import React, { useState } from 'react';
import TotalTransactions from '../components/TotalTransactions';
import TotalTransactionsCategory from '../components/TotalTransactionsCategory';

const Home = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  return (
    <div>
      <h2>Bienvenue sur la page d'accueil</h2>
      
      {/* Sélecteur de dates */}
      <div>
        <label>Début :</label>
        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />

        <label>Fin :</label>
        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
      </div>

      <TotalTransactions startDate={startDate} endDate={endDate} />
      <TotalTransactionsCategory startDate={startDate} endDate={endDate} />
    </div>
  );
};

export default Home;
