import React, { useEffect, useState } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import MealCalendar from './components/MealCalendar';
import ChartSection from './components/ChartSection';
import { v4 as uuidv4 } from 'uuid';

const recipeSuggestions = [
  { name: 'Grilled Chicken Salad', calories: 350 },
  { name: 'Fruit Smoothie', calories: 200 },
  { name: 'Oats with Almond Milk', calories: 250 },
  { name: 'Steamed Veggies', calories: 150 },
  { name: 'Boiled Eggs & Toast', calories: 300 }
];

function App() {
  const [meals, setMeals] = useState([]);
  const [mealName, setMealName] = useState('');
  const [calories, setCalories] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [dailyGoal, setDailyGoal] = useState(2000);

  useEffect(() => {
    const storedMeals = JSON.parse(localStorage.getItem('meals')) || [];
    setMeals(storedMeals);
  }, []);

  useEffect(() => {
    localStorage.setItem('meals', JSON.stringify(meals));
  }, [meals]);

  const handleAddMeal = () => {
    if (!mealName || !calories) {
      alert('Please fill in all fields');
      return;
    }

    const newMeal = {
      id: uuidv4(),
      name: mealName,
      calories: parseInt(calories),
      date: selectedDate
    };

    setMeals([newMeal, ...meals]);
    setMealName('');
    setCalories('');
  };

  const handleDeleteMeal = (id) => {
    const updatedMeals = meals.filter((meal) => meal.id !== id);
    setMeals(updatedMeals);
  };

  const filteredMeals = meals.filter((meal) =>
    meal.name.toLowerCase().includes(searchTerm.toLowerCase()) && meal.date === selectedDate
  );

  const totalCalories = filteredMeals.reduce((sum, meal) => sum + Number(meal.calories), 0);

  const remainingCalories = dailyGoal - totalCalories;

  const suggestedRecipes = recipeSuggestions.filter((recipe) => recipe.calories <= remainingCalories);

  return (
    <div className="app">
      <h1 className="main-title">Calorie Tracker</h1>

      <MealCalendar selectedDate={selectedDate} onDateChange={setSelectedDate} />
      <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      <div className="goal-section">
        <label>Daily Calorie Goal:</label>
        <input
          type="number"
          value={dailyGoal}
          onChange={(e) => setDailyGoal(Number(e.target.value))}
          min={100}
        />
      </div>

      <div className="progress-bar-container">
        <div className="progress-label">
          {totalCalories}/{dailyGoal} kcal
        </div>
        <div className="progress-bar">
          <div
            className={`progress-fill ${totalCalories > dailyGoal ? 'over-limit' : ''}`}
            style={{ width: `${Math.min((totalCalories / dailyGoal) * 100, 100)}%` }}
          ></div>
        </div>
        {totalCalories > dailyGoal && <p className="warning-text">Calorie limit exceeded!</p>}
      </div>

      <div className="form">
        <input
          type="text"
          placeholder="Meal name"
          value={mealName}
          onChange={(e) => setMealName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Calories"
          value={calories}
          onChange={(e) => setCalories(e.target.value)}
        />
        <button onClick={handleAddMeal}>Add Meal</button>
      </div>

      <div className="summary">
        <h2>Total Calories: {totalCalories}</h2>
      </div>

      <div className="meal-list">
        {filteredMeals.length > 0 ? (
          filteredMeals.map((meal) => (
            <div key={meal.id} className="meal-item">
              <span>{meal.name}</span>
              <span>{meal.calories} cal</span>
              <button onClick={() => handleDeleteMeal(meal.id)}>🗑️</button>
            </div>
          ))
        ) : (
          <p className="no-meals">No meals found for selected date or search.</p>
        )}
      </div>

      {remainingCalories > 0 && (
        <div className="suggestion-section">
          <h3>Suggestions under {remainingCalories} cal</h3>
          <ul>
            {suggestedRecipes.length > 0 ? (
              suggestedRecipes.map((item, idx) => (
                <li key={idx}>
                  {item.name} - {item.calories} cal
                </li>
              ))
            ) : (
              <li>No suggestions fit your remaining calories</li>
            )}
          </ul>
        </div>
      )}

      <ChartSection meals={filteredMeals} />
    </div>
  );
}

export default App;
