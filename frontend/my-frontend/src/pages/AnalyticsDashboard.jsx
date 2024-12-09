// AnalyticsDashboard.js
import React, { useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

const AnalyticsDashboard = () => {
  const [analyticsData, setAnalyticsData] = useState({
    views: {
      labels: ['Home', 'Projects', 'Media Coverage', 'Photo Gallery'],
      data: [120, 90, 60, 150],
    },
    downloads: {
      labels: ['Resume', 'Publication 1', 'Publication 2'],
      data: [45, 30, 25],
    },
  });

  const barData = {
    labels: analyticsData.views.labels,
    datasets: [
      {
        label: 'Page Views',
        data: analyticsData.views.data,
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const pieData = {
    labels: analyticsData.downloads.labels,
    datasets: [
      {
        label: 'Downloads',
        data: analyticsData.downloads.data,
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(255, 206, 86, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="container analytics-dashboard">
      <h2 className="text-center mb-4">Interactive Analytics Dashboard</h2>

      <div className="card shadow mb-4 p-4">
        <h5 className="mb-3">Page Views</h5>
        <Bar data={barData} options={{ maintainAspectRatio: true }} />
      </div>

      <div className="card shadow p-4">
        <h5 className="mb-3">Downloads</h5>
        <Pie data={pieData} options={{ maintainAspectRatio: true }} />
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
