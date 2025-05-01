import { ReadingPreferencesSection } from "./reading-preferences-section"

export function ReadingPreferences() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Reading Preferences</h2>
      <ReadingPreferencesSection />

      <div className="bg-gray-900 rounded-lg p-6">
        <h3 className="text-lg font-medium mb-4">Keyboard Shortcuts</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-400">Next Page</span>
              <span className="px-2 py-1 bg-gray-800 rounded text-sm">→ or Space</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Previous Page</span>
              <span className="px-2 py-1 bg-gray-800 rounded text-sm">←</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Toggle Fullscreen</span>
              <span className="px-2 py-1 bg-gray-800 rounded text-sm">F</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-400">Open Settings</span>
              <span className="px-2 py-1 bg-gray-800 rounded text-sm">S</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Exit Fullscreen</span>
              <span className="px-2 py-1 bg-gray-800 rounded text-sm">Esc</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Close Settings</span>
              <span className="px-2 py-1 bg-gray-800 rounded text-sm">Esc</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
