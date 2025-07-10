// src/components/ChartSection.js
import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, ArcElement, Tooltip, Legend, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(BarElement, ArcElement, Tooltip, Legend, CategoryScale, LinearScale);

function ChartSection({ meals }) {
  const totalCalories = meals.reduce((sum, meal) => sum + Number(meal.calories), 0);
  const labels = meals.map((meal) => meal.name);
  const data = meals.map((meal) => Number(meal.calories));

  const barData = {
    labels,
    datasets: [
      {
        label: 'Calories',
        data,
        backgroundColor: '#3b82f6',
      },
    ],
  };

  const pieData = {
    labels,
    datasets: [
      {
        label: 'Calories',
        data,
        backgroundColor: ['#f97316', '#10b981', '#6366f1', '#f43f5e', '#14b8a6', '#eab308'],
      },
    ],
  };

  return (
    <div style={{ marginTop: '40px' }}>
      <h3 style={{ textAlign: 'center' }}>📊 Calorie Chart</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '30px' }}>
        <div style={{ width: '300px' }}>
          <Bar data={barData} />
        </div>
        <div style={{ width: '300px' }}>
          <Pie data={pieData} />
        </div>
      </div>
    </div>
  );
}

export default ChartSection;
