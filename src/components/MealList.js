import React from 'react';
import MealItem from './MealItem';

function MealList({ meals, onDeleteMeal, onEditMeal }) {
  if (meals.length === 0) return <p>No meals added yet.</p>;

  return (
    <div className="meal-list">
      {meals.map((meal) => (
        <MealItem
          key={meal.id}
          meal={meal}
          onDelete={onDeleteMeal}
          onEdit={onEditMeal}
        />
      ))}
    </div>
  );
}

export default MealList;
