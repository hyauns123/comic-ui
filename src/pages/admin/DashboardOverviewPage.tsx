"use client"

import type React from "react"
import { Container, Row, Col } from "react-bootstrap"
import { useRouter } from "next/router"
import StatCard from "../../components/admin/dashboard/StatCard"
import TrafficChart from "../../components/admin/dashboard/TrafficChart"
import QuickActions from "../../components/admin/dashboard/QuickActions"
import { FaBook, FaUsers, FaComments, FaEye } from "react-icons/fa"

const DashboardOverviewPage: React.FC = () => {
  const router = useRouter()

  return (
    <Container fluid className="p-0">
      <h1 className="h3 mb-3 text-white">Dashboard</h1>

      <Row>
        <Col md={6} xl={3} className="mb-4">
          <StatCard
            title="Total Comics"
            value="248"
            icon={<FaBook />}
            trend="+12%"
            trendLabel="Since last month"
            trendPositive={true}
          />
        </Col>
        <Col md={6} xl={3} className="mb-4">
          <StatCard
            title="Total Users"
            value="15,832"
            icon={<FaUsers />}
            trend="+25%"
            trendLabel="Since last month"
            trendPositive={true}
          />
        </Col>
        <Col md={6} xl={3} className="mb-4">
          <StatCard
            title="Comments"
            value="1,245"
            icon={<FaComments />}
            trend="+18%"
            trendLabel="Since last month"
            trendPositive={true}
          />
        </Col>
        <Col md={6} xl={3} className="mb-4">
          <StatCard
            title="Page Views"
            value="2.4M"
            icon={<FaEye />}
            trend="-3%"
            trendLabel="Since last month"
            trendPositive={false}
          />
        </Col>
      </Row>

      <Row>
        <Col lg={8} className="mb-4">
          <TrafficChart />
        </Col>
        <Col lg={4} className="mb-4">
          <QuickActions />
        </Col>
      </Row>
    </Container>
  )
}

export default DashboardOverviewPage
