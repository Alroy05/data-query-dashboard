import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ChartComponent = ({ data }) => {
  const countries = Object.keys(data);
  const years = Object.keys(data[countries[0]]).map(Number).sort((a, b) => a - b);
  
  // Generate vibrant colors
  const generateColors = (count) => {
    const colors = [];
    const hueStep = 360 / count;
    
    for (let i = 0; i < count; i++) {
      const hue = i * hueStep;
      colors.push({
        bg: `hsla(${hue}, 80%, 60%, 0.7)`,
        border: `hsla(${hue}, 80%, 40%, 1)`,
        point: `hsla(${hue}, 80%, 40%, 1)`
      });
    }
    
    return colors;
  };
  
  const colors = generateColors(countries.length);
  
  const chartData = {
    labels: years,
    datasets: countries.map((country, idx) => ({
      label: country,
      data: years.map(year => data[country][year]),
      backgroundColor: colors[idx].bg,
      borderColor: colors[idx].border,
      borderWidth: 2,
      tension: 0.1,
      pointRadius: 4,
      pointHoverRadius: 6,
      pointBackgroundColor: colors[idx].point,
      pointBorderColor: '#fff',
      pointBorderWidth: 2
    }))
  };
  
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          boxWidth: 12,
          padding: 16,
          usePointStyle: true,
          pointStyle: 'circle',
          font: {
            family: 'Inter, sans-serif',
            size: 12,
            weight: '500'
          }
        }
      },
      title: {
        display: true,
        text: 'Crude Oil Imports (Thousand Barrels per Day)',
        font: {
          family: 'Inter, sans-serif',
          size: 16,
          weight: '600'
        },
        padding: {
          top: 10,
          bottom: 20
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        titleFont: {
          family: 'Inter, sans-serif',
          size: 14,
          weight: '600'
        },
        bodyFont: {
          family: 'Inter, sans-serif',
          size: 12
        },
        padding: 12,
        cornerRadius: 8,
        displayColors: true,
        callbacks: {
          label: (context) => {
            const label = context.dataset.label || '';
            const value = context.raw || 0;
            return `${label}: ${value.toLocaleString()}k bbl/day`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text: 'Thousand Barrels per Day',
          font: {
            family: 'Inter, sans-serif',
            weight: '600'
          }
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        },
        ticks: {
          callback: (value) => `${value}k`
        }
      },
      x: {
        title: {
          display: true,
          text: 'Year',
          font: {
            family: 'Inter, sans-serif',
            weight: '600'
          }
        },
        grid: {
          display: false
        }
      }
    },
    animation: {
      duration: 1000,
      easing: 'easeOutQuart'
    }
  };
  
  return (
    <div className="h-[400px]">
      {countries.length > 5 ? (
        <Line 
          data={chartData} 
          options={options}
          className="animate-fade-in"
        />
      ) : (
        <Bar 
          data={chartData} 
          options={options}
          className="animate-fade-in"
        />
      )}
    </div>
  );
};

export default ChartComponent;