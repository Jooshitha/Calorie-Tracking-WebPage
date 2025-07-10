import React from 'react';

function Header({ totalCalories }) {
  return (
    <header>
      <h1>Calorie Tracker</h1>
      <p>Total Calories: {totalCalories}</p>
    </header>
  );
}

export default Header;
