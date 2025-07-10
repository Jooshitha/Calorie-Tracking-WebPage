// src/components/MealCalendar.js
import React from 'react';

function MealCalendar({ selectedDate, onDateChange }) {
  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <input
        type="date"
        value={selectedDate}
        onChange={(e) => onDateChange(e.target.value)}
        style={{
          padding: '10px',
          fontSize: '16px',
          borderRadius: '8px',
          border: '1px solid #ccc',
        }}
      />
    </div>
  );
}

export default MealCalendar;
