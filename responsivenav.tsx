// src/components/Navbar.js
import React, { useState } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="nav-logo">MyLogo</div>
      <div className={`nav-links ${isOpen ? 'open' : ''}`}>
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/services">Services</a>
        <a href="/contact">Contact</a>
      </div>
      <div className="nav-toggle" onClick={toggleNavbar}>
        ☰
      </div>
    </nav>
  );
};

export default Navbar;

*****************Style.css********************

/* src/components/Navbar.css */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #333;
  color: #fff;
}

.nav-logo {
  font-size: 1.5rem;
}

.nav-links {
  display: flex;
  gap: 1rem;
}

.nav-links a {
  color: #fff;
  text-decoration: none;
}

.nav-toggle {
  display: none;
  font-size: 1.5rem;
  cursor: pointer;
}

@media (max-width: 768px) {
  .nav-links {
    display: none;
    flex-direction: column;
    width: 100%;
    position: absolute;
    top: 60px;
    left: 0;
    background-color: #333;
    text-align: center;
  }

  .nav-links.open {
    display: flex;
  }

  .nav-toggle {
    display: block;
  }
}

****************************

// src/App.js
import React from 'react';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar />
      <div style={{ padding: '1rem' }}>
        <h1>Welcome to My Website</h1>
        <p>This is a sample page with a responsive navbar.</p>
      </div>
    </div>
  );
}

export default App;
