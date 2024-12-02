import React from 'react';
import './styles/Header.css'; // Custom styles for additional designs

const Header = () => {
  return (
    <header className="bg-primary text-white py-3 shadow">
      <div className="container d-flex justify-content-between align-items-center">
        <h1 className="mb-0">Portfolio Helper</h1>
        <p className="mb-0">Your one-stop solution for project management</p>
      </div>
    </header>
  );
};

export default Header;
