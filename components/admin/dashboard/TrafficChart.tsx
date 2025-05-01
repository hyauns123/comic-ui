"use client"

import { useState } from "react"
import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const TrafficChart = () => {
  const [timeRange, setTimeRange] = useState("30")

  // Dummy data for the chart
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Page Views",
        data: [12000, 19000, 15000, 25000, 22000, 30000, 28000, 25000, 38000, 41000, 35000, 42000],
        borderColor: "#8e44ad",
        backgroundColor: "rgba(142, 68, 173, 0.1)",
        tension: 0.4,
        fill: true,
      },
      {
        label: "Unique Visitors",
        data: [8000, 12000, 10000, 15000, 14000, 18000, 17000, 16000, 23000, 25000, 22000, 26000],
        borderColor: "#3498db",
        backgroundColor: "rgba(52, 152, 219, 0.1)",
        tension: 0.4,
        fill: true,
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          color: "#ffffff",
        },
      },
      tooltip: {
        mode: "index" as const,
        intersect: false,
      },
    },
    scales: {
      y: {
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
        ticks: {
          color: "#ffffff",
        },
      },
      x: {
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
        ticks: {
          color: "#ffffff",
        },
      },
    },
    interaction: {
      mode: "nearest" as const,
      axis: "x" as const,
      intersect: false,
    },
  }

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-sm">
      <div className="flex justify-between items-center p-4 border-b border-gray-700">
        <h2 className="text-lg font-medium">Traffic Overview</h2>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="bg-gray-700 border border-gray-600 text-white rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="30">Last 30 Days</option>
          <option value="90">Last 90 Days</option>
          <option value="180">Last 6 Months</option>
          <option value="365">Last Year</option>
        </select>
      </div>
      <div className="p-4">
        <Line data={data} options={options} />
      </div>
    </div>
  )
}

export default TrafficChart
