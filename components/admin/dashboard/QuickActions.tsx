"use client"

import Link from "next/link"
import { Plus, Upload, UserPlus, Settings } from "lucide-react"

const QuickActions = () => {
  const actions = [
    {
      icon: <Plus className="h-5 w-5 text-blue-500" />,
      title: "Add New Comic",
      description: "Create a new comic series",
      href: "/admin/comics/new",
      color: "blue",
    },
    {
      icon: <Upload className="h-5 w-5 text-green-500" />,
      title: "Upload Chapter",
      description: "Add a new chapter to a comic",
      href: "/admin/comics/1/chapters/new",
      color: "green",
    },
    {
      icon: <UserPlus className="h-5 w-5 text-purple-500" />,
      title: "Add User",
      description: "Create a new user account",
      href: "/admin/users/new",
      color: "purple",
    },
    {
      icon: <Settings className="h-5 w-5 text-yellow-500" />,
      title: "Site Settings",
      description: "Configure site options",
      href: "/admin/settings",
      color: "yellow",
    },
  ]

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-sm h-full">
      <div className="p-4 border-b border-gray-700">
        <h2 className="text-lg font-medium">Quick Actions</h2>
      </div>
      <div className="divide-y divide-gray-700">
        {actions.map((action, index) => (
          <Link key={index} href={action.href} className="flex items-center p-4 hover:bg-gray-700 transition-colors">
            <div className="mr-4">{action.icon}</div>
            <div>
              <h3 className="font-medium">{action.title}</h3>
              <p className="text-sm text-gray-400">{action.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default QuickActions
