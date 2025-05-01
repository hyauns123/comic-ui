"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { format } from "date-fns"
import { CalendarIcon, Users, TrendingUp, BarChart3 } from "lucide-react"
import {
  Line,
  LineChart,
  Bar,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Pie,
  PieChart,
  Cell,
} from "recharts"

export default function AnalyticsPage() {
  // Date range state
  const [dateRange, setDateRange] = useState({
    from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
    to: new Date(),
  })

  // Dummy data for charts
  const trafficData = [
    { date: "Apr 1", users: 120, pageViews: 340 },
    { date: "Apr 2", users: 132, pageViews: 378 },
    { date: "Apr 3", users: 141, pageViews: 389 },
    { date: "Apr 4", users: 154, pageViews: 402 },
    { date: "Apr 5", users: 162, pageViews: 415 },
    { date: "Apr 6", users: 159, pageViews: 405 },
    { date: "Apr 7", users: 151, pageViews: 390 },
    { date: "Apr 8", users: 148, pageViews: 385 },
    { date: "Apr 9", users: 165, pageViews: 430 },
    { date: "Apr 10", users: 175, pageViews: 450 },
    { date: "Apr 11", users: 180, pageViews: 470 },
    { date: "Apr 12", users: 191, pageViews: 490 },
    { date: "Apr 13", users: 201, pageViews: 520 },
    { date: "Apr 14", users: 185, pageViews: 480 },
  ]

  const sourceData = [
    { name: "Direct", value: 40 },
    { name: "Search", value: 30 },
    { name: "Social", value: 20 },
    { name: "Referral", value: 10 },
  ]

  const deviceData = [
    { name: "Mobile", value: 55 },
    { name: "Desktop", value: 35 },
    { name: "Tablet", value: 10 },
  ]

  const locationData = [
    { name: "United States", value: 45 },
    { name: "Japan", value: 20 },
    { name: "United Kingdom", value: 15 },
    { name: "Canada", value: 10 },
    { name: "Other", value: 10 },
  ]

  const topComicsData = [
    { name: "Naruto", views: 12500, chapters: 700 },
    { name: "One Piece", views: 11200, chapters: 1000 },
    { name: "Attack on Titan", views: 9800, chapters: 139 },
    { name: "Demon Slayer", views: 8900, chapters: 205 },
    { name: "My Hero Academia", views: 7600, chapters: 340 },
  ]

  const topChaptersData = [
    { name: "One Piece Ch. 1044", views: 3200, comic: "One Piece" },
    { name: "Attack on Titan Ch. 139", views: 2900, comic: "Attack on Titan" },
    { name: "Demon Slayer Ch. 205", views: 2700, comic: "Demon Slayer" },
    { name: "Naruto Ch. 700", views: 2500, comic: "Naruto" },
    { name: "My Hero Academia Ch. 340", views: 2200, comic: "My Hero Academia" },
  ]

  // Colors for charts
  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#0088FE"]

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Analytics</h1>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="sources">Sources</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview">
          <div className="grid gap-6">
            {/* Date Range Selector */}
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle>Traffic Overview</CardTitle>
                  <div className="flex items-center gap-2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="flex items-center gap-2">
                          <CalendarIcon className="h-4 w-4" />
                          {format(dateRange.from, "MMM d, yyyy")} - {format(dateRange.to, "MMM d, yyyy")}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="end">
                        <Calendar
                          mode="range"
                          selected={{
                            from: dateRange.from,
                            to: dateRange.to,
                          }}
                          onSelect={(range) => {
                            if (range?.from && range?.to) {
                              setDateRange({ from: range.from, to: range.to })
                            }
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>

                    <Select defaultValue="daily">
                      <SelectTrigger className="w-[120px]">
                        <SelectValue placeholder="Interval" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hourly">Hourly</SelectItem>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={trafficData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                      <XAxis dataKey="date" stroke="#888" />
                      <YAxis stroke="#888" />
                      <Tooltip
                        contentStyle={{ backgroundColor: "#333", border: "none" }}
                        itemStyle={{ color: "#fff" }}
                      />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="pageViews"
                        stroke="#8884d8"
                        activeDot={{ r: 8 }}
                        name="Page Views"
                      />
                      <Line type="monotone" dataKey="users" stroke="#82ca9d" name="Users" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Key Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,234</div>
                  <p className="text-xs text-muted-foreground">+12% from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Page Views</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">45,231</div>
                  <p className="text-xs text-muted-foreground">+5.3% from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Avg. Session Duration</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">5m 42s</div>
                  <p className="text-xs text-muted-foreground">+1.2% from last month</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Sources Tab */}
        <TabsContent value="sources">
          <div className="grid gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Traffic Sources */}
              <Card>
                <CardHeader>
                  <CardTitle>Traffic Sources</CardTitle>
                  <CardDescription>Where your visitors are coming from</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={sourceData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {sourceData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{ backgroundColor: "#333", border: "none" }}
                          itemStyle={{ color: "#fff" }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Devices */}
              <Card>
                <CardHeader>
                  <CardTitle>Devices</CardTitle>
                  <CardDescription>What devices your visitors are using</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={deviceData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {deviceData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{ backgroundColor: "#333", border: "none" }}
                          itemStyle={{ color: "#fff" }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Locations */}
            <Card>
              <CardHeader>
                <CardTitle>Geographic Distribution</CardTitle>
                <CardDescription>Where your visitors are located</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={locationData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                      <XAxis type="number" stroke="#888" />
                      <YAxis dataKey="name" type="category" stroke="#888" width={100} />
                      <Tooltip
                        contentStyle={{ backgroundColor: "#333", border: "none" }}
                        itemStyle={{ color: "#fff" }}
                      />
                      <Bar dataKey="value" fill="#8884d8" name="Visitors">
                        {locationData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Content Tab */}
        <TabsContent value="content">
          <div className="grid gap-6">
            {/* Top Comics */}
            <Card>
              <CardHeader>
                <CardTitle>Top Comics</CardTitle>
                <CardDescription>Most viewed comics in the selected period</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={topComicsData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                      <XAxis dataKey="name" stroke="#888" />
                      <YAxis stroke="#888" />
                      <Tooltip
                        contentStyle={{ backgroundColor: "#333", border: "none" }}
                        itemStyle={{ color: "#fff" }}
                      />
                      <Legend />
                      <Bar dataKey="views" fill="#8884d8" name="Views" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="mt-6">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-700">
                        <th className="text-left py-2">Comic</th>
                        <th className="text-right py-2">Views</th>
                        <th className="text-right py-2">Chapters</th>
                      </tr>
                    </thead>
                    <tbody>
                      {topComicsData.map((comic, index) => (
                        <tr key={index} className="border-b border-gray-800">
                          <td className="py-2">{comic.name}</td>
                          <td className="text-right py-2">{comic.views.toLocaleString()}</td>
                          <td className="text-right py-2">{comic.chapters}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Top Chapters */}
            <Card>
              <CardHeader>
                <CardTitle>Top Chapters</CardTitle>
                <CardDescription>Most viewed chapters in the selected period</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={topChaptersData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                      <XAxis dataKey="name" stroke="#888" />
                      <YAxis stroke="#888" />
                      <Tooltip
                        contentStyle={{ backgroundColor: "#333", border: "none" }}
                        itemStyle={{ color: "#fff" }}
                      />
                      <Legend />
                      <Bar dataKey="views" fill="#82ca9d" name="Views" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="mt-6">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-700">
                        <th className="text-left py-2">Chapter</th>
                        <th className="text-left py-2">Comic</th>
                        <th className="text-right py-2">Views</th>
                      </tr>
                    </thead>
                    <tbody>
                      {topChaptersData.map((chapter, index) => (
                        <tr key={index} className="border-b border-gray-800">
                          <td className="py-2">{chapter.name}</td>
                          <td className="py-2">{chapter.comic}</td>
                          <td className="text-right py-2">{chapter.views.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
