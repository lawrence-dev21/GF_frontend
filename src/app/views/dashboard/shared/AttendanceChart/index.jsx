// BarChart.js
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { BarElement, BarController, Chart, CategoryScale, LinearScale } from 'chart.js';
import { Card } from '@mui/material';
import { interpolateRgb } from 'd3-interpolate';



class RoundedBarElement extends BarElement {
  draw(ctx) {
    const { x, y, width, height } = this;
    const radius = Math.min(width, height) * 0.15;

    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();

    ctx.fill();
  }
}
Chart.register(RoundedBarElement, BarController, CategoryScale, LinearScale);

const AttendanceChart = ({ data, labels, title }) => {
  const minColor = 'rgba(54, 162, 235, 0.2)';
  const maxColor = 'rgba(54, 162, 235, 1)';
  const colorInterpolator = interpolateRgb(minColor, maxColor);

  const backgroundColors = data.map((value) => {
    const maxValue = Math.max(...data);
    const minValue = Math.min(...data);
    const normalizedValue = (value - minValue) / (maxValue - minValue);
    return colorInterpolator(normalizedValue);
  });
  
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: title,
        data: data,
        backgroundColor: backgroundColors,
        // backgroundColor: generateShadesOfBlue([theme.palette.primary.main]).map((color) => color.opacity(0.2)),
        barPercentage: 0.6,
        borderWidth: .6,
        borderRadius: 5,
        barElement: RoundedBarElement,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        display: true,
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        grid: {
          display: false
        },
        display: true,
        title: {
          display: true,
          text: 'Number of Attendants',
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <Card style={{ borderRadius: '20px', backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: '20px' }}>
      <Bar data={chartData} options={options} />
    </Card>
  );
};

export default AttendanceChart;
