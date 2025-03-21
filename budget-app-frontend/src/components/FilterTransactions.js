import React, { useState } from 'react';

const FilterTransactions = ({ onCategoryChange }) => {
  const [selectedCategory, setSelectedCategory] = useState('Toutes');

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const applyFilter = () => {
    onCategoryChange(selectedCategory);  // 🔥 Appelle la fonction avec la catégorie choisie
  };

  return (
    <div>
      <label htmlFor="categoryFilter">Filtrer par catégorie :</label>
      <select id="categoryFilter" value={selectedCategory} onChange={handleCategoryChange}>
        <option value="Toutes">Toutes</option>
        <option value="Alimentation">Alimentation</option>
        <option value="Transport">Transport</option>
        <option value="Loisirs">Loisirs</option>
        <option value="Santé">Santé</option>
        <option value="Salaire">Salaire</option>
        <option value="Investissement">Investissement</option>
        <option value="Autres">Autres</option>
      </select>
      <button onClick={applyFilter}>Appliquer</button> {/* 🔥 Ajout du bouton */}
    </div>
  );
};

export default FilterTransactions;
