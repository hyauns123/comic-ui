import type React from "react"
import { Card } from "react-bootstrap"

interface StatCardProps {
  title: string
  value: string | number
  icon: React.ReactNode
  trend?: {
    value: number
    isPositive: boolean
  }
  color?: string
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, trend, color = "primary" }) => {
  return (
    <Card className={`stat-card bg-dark text-white border-${color} mb-4`}>
      <Card.Body className="d-flex justify-content-between align-items-center">
        <div>
          <h6 className="card-subtitle text-muted mb-1">{title}</h6>
          <h3 className="card-title mb-0">{value}</h3>
          {trend && (
            <div className={`small mt-2 ${trend.isPositive ? "text-success" : "text-danger"}`}>
              <i className={`bi bi-arrow-${trend.isPositive ? "up" : "down"}`}></i> {Math.abs(trend.value)}% since last
              month
            </div>
          )}
        </div>
        <div className={`stat-icon bg-${color} bg-opacity-10 p-3 rounded`}>{icon}</div>
      </Card.Body>
    </Card>
  )
}

export default StatCard
