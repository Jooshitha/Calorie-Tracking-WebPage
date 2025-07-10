import React from 'react';

function MealItem({ meal, onDelete, onEdit }) {
  return (
    <div className="meal-item">
      <div>
        <h3>{meal.name}</h3>
        <p>{meal.calories} calories | {meal.category}</p>
        <p>{meal.date}</p>
      </div>
      <div className="actions">
        <button onClick={() => onEdit(meal)}>Edit</button>
        <button onClick={() => onDelete(meal.id)}>Delete</button>
      </div>
    </div>
  );
}

export default MealItem;
