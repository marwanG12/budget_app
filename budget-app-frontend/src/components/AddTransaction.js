import React, { useState } from 'react';

const AddTransaction = ({ onTransactionAdded }) => {
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    date: '',
    category: '',
    type: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const transaction = {
      description: formData.description,
      amount: formData.amount,
      date: formData.date,
      category: formData.category,
      type: formData.type
    };

    try {
      const response = await fetch('http://localhost:5000/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transaction),
      });

      if (response.ok) {
        const newTransaction = await response.json();
        onTransactionAdded(newTransaction);
        setFormData({
          description: '',
          amount: '',
          date: '',
          category: '',
          type: ''
        });
      } else {
        console.error('Erreur lors de l\'ajout de la transaction');
      }
    } catch (error) {
      console.error('Erreur de réseau ou autre erreur :', error);
    }
  };

  return (
    <div>
      <h2>Ajouter une transaction</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="amount">Montant:</label>
        <input
          type="number"
          name="amount"
          id="amount"
          placeholder="Montant"
          value={formData.amount}
          onChange={handleChange}
          required
        />

        <label htmlFor="category">Catégorie:</label>
        <select
          name="category"
          id="category"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="">Choisir la catégorie</option>
          <option value="Alimentation">Alimentation</option>
          <option value="Transport">Transport</option>
          <option value="Loisirs">Loisirs</option>
          <option value="Santé">Santé</option>
          <option value="Salaire">Salaire</option>
          <option value="Investissement">Investissement</option>
          <option value="Autres">Autres</option>
        </select>

        <label htmlFor="description">Description:</label>
        <input
          type="text"
          name="description"
          id="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <label htmlFor="date">Date:</label>
        <input
          type="date"
          name="date"
          id="date"
          value={formData.date}
          onChange={handleChange}
          required
        />

        <label htmlFor="type">Type:</label>
        <select
          name="type"
          id="type"
          value={formData.type}
          onChange={handleChange}
          required
        >
          <option value="">Choisir le type</option>
          <option value="revenu">Revenu</option>
          <option value="dépense">Dépense</option>
        </select>

        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
};

export default AddTransaction;
