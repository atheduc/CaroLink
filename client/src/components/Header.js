// src/components/Header.js
import React from 'react';

const Header = () => {
  return (
    <header>
      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/posts">Posts</a></li>
          {/* Add more links if necessary */}
        </ul>
      </nav>
      <h1>Carolink</h1>
    </header>
  );
};

export default Header;
