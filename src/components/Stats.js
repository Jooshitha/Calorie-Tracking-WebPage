import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import './Stats.css';

const Stats = ({ meals }) => {
  const mealsByDate = meals.reduce((acc, meal) => {
    acc[meal.date] = acc[meal.date] || [];
    acc[meal.date].push(meal);
    return acc;
  }, {});

  const chartData = Object.entries(mealsByDate).map(([date, meals]) => ({
    date,
    calories: meals.reduce((sum, m) => sum + m.calories, 0),
  })).sort((a, b) => new Date(a.date) - new Date(b.date));

  const avgCalories = chartData.length
    ? Math.round(chartData.reduce((sum, d) => sum + d.calories, 0) / chartData.length)
    : 0;

  const mealFrequency = meals.reduce((acc, m) => {
    acc[m.name] = (acc[m.name] || 0) + 1;
    return acc;
  }, {});

  const topMeals = Object.entries(mealFrequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text('Calorie Tracker Report', 14, 15);
    const tableColumn = ['Date', 'Meal', 'Category', 'Calories'];
    const tableRows = [];

    meals.forEach(meal => {
      const row = [meal.date, meal.name, meal.category, meal.calories];
      tableRows.push(row);
    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 25,
    });

    const totalCalories = meals.reduce((acc, m) => acc + m.calories, 0);
    doc.text(`Total Calories: ${totalCalories}`, 14, doc.lastAutoTable.finalY + 10);
    doc.save('calorie_report.pdf');
  };

  return (
    <div className="stats-container">
      <h2>Statistics</h2>

      <div className="stats-summary">
        <div><strong>Average Daily Calories:</strong> {avgCalories}</div>
        <div>
          <strong>Top Meals:</strong>
          <ul>
            {topMeals.map(([meal, count]) => (
              <li key={meal}>{meal} ({count}x)</li>
            ))}
          </ul>
        </div>
        <button className="pdf-btn" onClick={handleExportPDF}>Download PDF</button>
      </div>

      <div className="chart-wrapper">
        <h3>Daily Calorie Intake</h3>
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="calories" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p>No data to display.</p>
        )}
      </div>
    </div>
  );
};

export default Stats;
