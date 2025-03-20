import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Transactions from './pages/transactions';
import NotFound from './pages/notfound';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/transactions" element={<Transactions />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
