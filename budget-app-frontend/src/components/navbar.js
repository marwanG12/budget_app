import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={{ padding: '10px', background: '#282c34', color: 'white' }}>
      <ul style={{ display: 'flex', listStyle: 'none', gap: '20px' }}>
        <li>
          <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Accueil</Link>
        </li>
        <li>
          <Link to="/transactions" style={{ color: 'white', textDecoration: 'none' }}>Transactions</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
