import React from 'react';
import AppRoutes from './routes';
import Navbar from './components/navbar';

const App = () => {
  return (
    <div>
      <Navbar />
      <AppRoutes />
    </div>
  );
};

export default App;