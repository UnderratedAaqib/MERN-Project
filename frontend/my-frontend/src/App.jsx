import React from 'react';
import './styles/styles.css';
import AppRoutes from './routes/AppRoutes';  // Routes handling
import './styles/global.css';  // Global styles
import 'bootstrap/dist/css/bootstrap.min.css';
const App = () => {
  return (
    <div className="app-container">
      <AppRoutes />
    </div>
  );
};

export default App;
