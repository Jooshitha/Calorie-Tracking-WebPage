// src/components/SearchBar.js
import React from 'react';

function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <input
      type="text"
      placeholder="Search meals..."
      value={searchTerm}
      onChange={(e) => onSearchChange(e.target.value)}
      style={{
        padding: '10px',
        fontSize: '16px',
        borderRadius: '8px',
        border: '1px solid #ccc',
        width: '100%',
        maxWidth: '400px',
        margin: '0 auto',
        display: 'block',
      }}
    />
  );
}

export default SearchBar;
