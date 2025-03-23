import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { getUserEvents } from '../services/apiService';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function AnalyticsPage() {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [stats, setStats] = useState({
    totalEvents: 0,
    totalParticipants: 0,
    totalVolunteers: 0,
    totalVolunteerHours: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        const response = await getUserEvents();
        if (response.success) {
          const events = response.data;

          // Calculate stats
          const totalEvents = events.length;
          const totalParticipants = events.reduce(
            (sum, event) => sum + event.registeredParticipants.length,
            0
          );
          const totalVolunteers = events.reduce(
            (sum, event) => sum + event.volunteers.length,
            0
          );
          const totalVolunteerHours = events.reduce((sum, event) => {
            const eventHours = event.tasks.reduce((taskSum, task) => {
              const start = new Date(task.startTime);
              const end = new Date(task.endTime);
              const hours = (end - start) / (1000 * 60 * 60);
              return taskSum + (hours > 0 ? hours * task.currentVolunteerCount : 0);
            }, 0);
            return sum + eventHours;
          }, 0);

          setStats({
            totalEvents,
            totalParticipants,
            totalVolunteers,
            totalVolunteerHours: Math.round(totalVolunteerHours),
          });

          // Prepare chart data
          const labels = events.map((event) => event.name);
          const participantsData = events.map(
            (event) => event.registeredParticipants.length
          );
          const volunteersData = events.map((event) => event.volunteers.length);

          setChartData({
            labels,
            datasets: [
              {
                label: 'Participants',
                data: participantsData,
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                yAxisID: 'y',
              },
              {
                label: 'Volunteers',
                data: volunteersData,
                backgroundColor: 'rgba(255, 99, 132, 0.6)',
                yAxisID: 'y',
              },
            ],
          });
        } else {
          setError(response.message || 'Failed to fetch events');
        }
      } catch (err) {
        setError(err.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    };
    fetchAnalyticsData();
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Event Participants and Volunteers' },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: 'Count' },
      },
    },
  };

  if (loading) return <div className="text-center p-8">Loading...</div>;
  if (error) return <div className="text-center p-8 text-red-500">Error: {error}</div>;

  return (
    <div className="min-h-screen bg-tertiary p-8">
      <h1 className="text-3xl font-bold text-primary mb-6">Event Analytics</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-accent p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-primary">Total Events</h2>
          <p className="text-2xl text-secondary">{stats.totalEvents}</p>
        </div>
        <div className="bg-accent p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-primary">Total Participants</h2>
          <p className="text-2xl text-secondary">{stats.totalParticipants}</p>
        </div>
        <div className="bg-accent p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-primary">Total Volunteers</h2>
          <p className="text-2xl text-secondary">{stats.totalVolunteers}</p>
        </div>
        <div className="bg-accent p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-primary">Total Volunteer Hours</h2>
          <p className="text-2xl text-secondary">{stats.totalVolunteerHours}</p>
        </div>
      </div>
      {chartData.labels.length > 0 ? (
        <div className="bg-accent p-6 rounded-lg shadow-md max-w-4xl mx-auto">
          <Bar data={chartData} options={options} />
        </div>
      ) : (
        <p className="text-secondary text-center">No data available for chart.</p>
      )}
    </div>
  );
}