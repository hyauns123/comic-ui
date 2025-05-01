import type React from "react"
import { Card, Form, Row, Col } from "react-bootstrap"
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

const TrafficChart: React.FC = () => {
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
    <Card className="bg-dark text-white mb-4">
      <Card.Header className="d-flex justify-content-between align-items-center">
        <h5 className="mb-0">Traffic Overview</h5>
        <Row className="align-items-center g-3">
          <Col xs="auto">
            <Form.Select size="sm" className="bg-dark text-white border-secondary">
              <option>Last 30 Days</option>
              <option>Last 90 Days</option>
              <option>Last 6 Months</option>
              <option>Last Year</option>
            </Form.Select>
          </Col>
        </Row>
      </Card.Header>
      <Card.Body>
        <Line data={data} options={options} />
      </Card.Body>
    </Card>
  )
}

export default TrafficChart
