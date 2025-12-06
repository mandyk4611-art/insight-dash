import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface LineChartProps {
  title: string;
  labels: string[];
  data: number[];
}

const LineChart = ({ title, labels, data }: LineChartProps) => {
  const chartData = {
    labels,
    datasets: [
      {
        label: 'Call Volume',
        data,
        fill: true,
        backgroundColor: 'hsla(199, 89%, 48%, 0.1)',
        borderColor: 'hsl(199, 89%, 48%)',
        borderWidth: 3,
        tension: 0.4,
        pointBackgroundColor: 'hsl(199, 89%, 48%)',
        pointBorderColor: 'hsl(222, 47%, 9%)',
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8,
        pointHoverBackgroundColor: 'hsl(168, 84%, 40%)',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'hsl(222, 47%, 11%)',
        titleColor: 'hsl(210, 40%, 98%)',
        bodyColor: 'hsl(215, 20%, 65%)',
        borderColor: 'hsl(217, 33%, 20%)',
        borderWidth: 1,
        cornerRadius: 8,
        padding: 12,
        titleFont: {
          family: 'Inter',
          weight: '600' as const,
        },
        bodyFont: {
          family: 'JetBrains Mono',
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: 'hsl(217, 33%, 15%)',
        },
        ticks: {
          color: 'hsl(215, 20%, 65%)',
          font: {
            family: 'Inter',
            size: 11,
          },
        },
      },
      y: {
        grid: {
          color: 'hsl(217, 33%, 15%)',
        },
        ticks: {
          color: 'hsl(215, 20%, 65%)',
          font: {
            family: 'JetBrains Mono',
            size: 11,
          },
        },
      },
    },
  };

  return (
    <div className="chart-container animate-fade-in h-full">
      <h3 className="text-lg font-semibold text-foreground mb-4">{title}</h3>
      <div className="h-64">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default LineChart;
