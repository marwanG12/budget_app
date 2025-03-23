import React, { useState, useEffect } from 'react';
import '../TotalTransactions.css';

const TotalTransactions = ({ startDate, endDate }) => {
  const [totals, setTotals] = useState({ totalRevenus: 0, totalDepenses: 0 });

  useEffect(() => {
    const fetchTotals = async () => {
      try {
        const queryParams = new URLSearchParams();
        if (startDate) queryParams.append('startDate', startDate);
        if (endDate) queryParams.append('endDate', endDate);

        const response = await fetch(`http://localhost:5000/totaux?${queryParams}`);
        if (response.ok) {
          const data = await response.json();
          setTotals(data);
        } else {
          console.error('Erreur lors de la récupération des totaux');
        }
      } catch (error) {
        console.error('Erreur de réseau ou autre problème:', error);
      }
    };

    fetchTotals();
  }, [startDate, endDate]); // Recharger les données lorsqu'on change les dates

  return (
    <div>
      <h3>Résumé des transactions</h3>
      <div className="card-container">
        <div className="card revenus">
          <h4>💰 Total Revenus</h4>
          <p>{totals.totalRevenus} €</p>
        </div>
        <div className="card depenses">
          <h4>💸 Total Dépenses</h4>
          <p>{totals.totalDepenses} €</p>
        </div>
      </div>
    </div>
  );
};

export default TotalTransactions;
