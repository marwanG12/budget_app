import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../navbar.css';

const Navbar = () => {
  const [activeLink, setActiveLink] = useState('/');

  const handleLinkClick = (path) => {
    setActiveLink(path);
  };

  return (
    <nav>
      <ul>
        <li>
          <Link
            to="/"
            className={activeLink === '/' ? 'active' : ''}
            onClick={() => handleLinkClick('/')}
          >
            Accueil
          </Link>
        </li>
        <li>
          <Link
            to="/transactions"
            className={activeLink === '/transactions' ? 'active' : ''}
            onClick={() => handleLinkClick('/transactions')}
          >
            Transactions
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

