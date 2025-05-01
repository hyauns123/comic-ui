"use client"

import { Book, Users, MessageSquare, Eye } from "lucide-react"
import StatCard from "@/components/admin/dashboard/StatCard"
import TrafficChart from "@/components/admin/dashboard/TrafficChart"
import QuickActions from "@/components/admin/dashboard/QuickActions"
import DashboardWidget from "@/components/admin/dashboard/DashboardWidget"
import DashboardCustomizer from "@/components/admin/dashboard/DashboardCustomizer"
import { DashboardCustomizationProvider } from "@/contexts/dashboard-customization-context"

export default function DashboardPage() {
  return (
    <DashboardCustomizationProvider>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Dashboard</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <DashboardWidget id="stats">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard
                title="Total Comics"
                value="156"
                icon={<Book className="h-6 w-6" />}
                trend={{ value: 12, isPositive: true }}
                color="blue"
              />
              <StatCard
                title="Total Users"
                value="2,845"
                icon={<Users className="h-6 w-6" />}
                trend={{ value: 8, isPositive: true }}
                color="green"
              />
              <StatCard
                title="Comments"
                value="1,257"
                icon={<MessageSquare className="h-6 w-6" />}
                trend={{ value: 5, isPositive: true }}
                color="purple"
              />
              <StatCard
                title="Page Views"
                value="42,853"
                icon={<Eye className="h-6 w-6" />}
                trend={{ value: 15, isPositive: true }}
                color="yellow"
              />
            </div>
          </DashboardWidget>

          <DashboardWidget id="traffic">
            <TrafficChart />
          </DashboardWidget>

          <DashboardWidget id="quickActions">
            <QuickActions />
          </DashboardWidget>

          <DashboardWidget id="recentComics">
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 shadow-sm">
              <h2 className="text-lg font-medium mb-4">Recent Comics</h2>
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center p-2 hover:bg-gray-700 rounded-md">
                    <div className="w-10 h-10 bg-gray-700 rounded mr-3"></div>
                    <div>
                      <p className="font-medium">Comic Title {i}</p>
                      <p className="text-sm text-gray-400">Added 2 days ago</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </DashboardWidget>

          <DashboardWidget id="recentUsers">
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 shadow-sm">
              <h2 className="text-lg font-medium mb-4">Recent Users</h2>
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center p-2 hover:bg-gray-700 rounded-md">
                    <div className="w-8 h-8 bg-gray-700 rounded-full mr-3"></div>
                    <div>
                      <p className="font-medium">User {i}</p>
                      <p className="text-sm text-gray-400">Joined recently</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </DashboardWidget>
        </div>

        <DashboardCustomizer />
      </div>
    </DashboardCustomizationProvider>
  )
}
