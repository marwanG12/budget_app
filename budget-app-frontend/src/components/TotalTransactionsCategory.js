import React, { useState, useEffect } from 'react';
import '../TotalTransactionsCategory.css';

const TotalTransactionsCategory = () => {
  const [totalsByCategory, setTotalsByCategory] = useState({});

  useEffect(() => {
    const fetchTotalsByCategory = async () => {
      try {
        const response = await fetch('http://localhost:5000/totaux-par-categorie');
        if (response.ok) {
          const data = await response.json();
          setTotalsByCategory(data);
        } else {
          console.error('Erreur lors de la récupération des totaux par catégorie');
        }
      } catch (error) {
        console.error('Erreur de réseau ou autre problème:', error);
      }
    };

    fetchTotalsByCategory();
  }, []);

  return (
    <div className="total-transactions-category">
      <h3>Totaux par Catégorie</h3>
      <div className="category-container">
        {Object.entries(totalsByCategory).map(([category, amount]) => (
          <div key={category} className="category-card">
            <h4>{category}</h4>
            <p>{amount} €</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TotalTransactionsCategory;