import React from 'react';
import '../styles/Footer.css'; // Custom styles for footer

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-3 mt-5">
      <div className="container text-center">
        <p className="mb-2">&copy; 2023 Portfolio Helper. All Rights Reserved.</p>
        <ul className="list-inline">
          <li className="list-inline-item">
            <a href="/about" className="text-white text-decoration-none">About</a>
          </li>
          <li className="list-inline-item">
            <a href="/contact" className="text-white text-decoration-none">Contact</a>
          </li>
          <li className="list-inline-item">
            <a href="/privacy" className="text-white text-decoration-none">Privacy</a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
