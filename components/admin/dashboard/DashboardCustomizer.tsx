"use client"
import { Settings, X, Move, Eye, EyeOff, RotateCcw } from "lucide-react"
import { useDashboardCustomization } from "@/contexts/dashboard-customization-context"

const DashboardCustomizer = () => {
  const {
    widgets,
    updateWidgetVisibility,
    updateWidgetOrder,
    updateWidgetSize,
    resetToDefaults,
    isCustomizing,
    setIsCustomizing,
  } = useDashboardCustomization()

  const widgetNames = {
    stats: "Statistics Cards",
    traffic: "Traffic Chart",
    quickActions: "Quick Actions",
    recentComics: "Recent Comics",
    recentUsers: "Recent Users",
  }

  return (
    <>
      {/* Customization toggle button */}
      <button
        onClick={() => setIsCustomizing(!isCustomizing)}
        className="fixed bottom-4 right-4 z-50 p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg"
        aria-label="Customize Dashboard"
      >
        <Settings className="h-5 w-5" />
      </button>

      {/* Customization panel */}
      {isCustomizing && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-gray-800 rounded-lg shadow-xl w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Customize Dashboard</h2>
              <button onClick={() => setIsCustomizing(false)} className="p-1 hover:bg-gray-700 rounded-full">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4 mb-6">
              {widgets
                .sort((a, b) => a.order - b.order)
                .map((widget) => (
                  <div key={widget.id} className="flex items-center justify-between p-3 bg-gray-700 rounded-md">
                    <div className="flex items-center">
                      <Move className="h-4 w-4 mr-3 text-gray-400" />
                      <span>{widgetNames[widget.id as keyof typeof widgetNames]}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <select
                        value={widget.size}
                        onChange={(e) => updateWidgetSize(widget.id, e.target.value as any)}
                        className="bg-gray-600 border border-gray-500 rounded px-2 py-1 text-sm"
                      >
                        <option value="small">Small</option>
                        <option value="medium">Medium</option>
                        <option value="large">Large</option>
                        <option value="full">Full Width</option>
                      </select>
                      <button
                        onClick={() => updateWidgetVisibility(widget.id, !widget.visible)}
                        className="p-1 hover:bg-gray-600 rounded"
                        aria-label={widget.visible ? "Hide widget" : "Show widget"}
                      >
                        {widget.visible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                ))}
            </div>

            <div className="flex justify-between">
              <button
                onClick={resetToDefaults}
                className="flex items-center px-3 py-2 bg-gray-600 hover:bg-gray-700 rounded"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset to Default
              </button>
              <button
                onClick={() => setIsCustomizing(false)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded"
              >
                Apply Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default DashboardCustomizer
