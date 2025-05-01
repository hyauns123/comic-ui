"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface KeyboardShortcutsHelpProps {
  isOpen: boolean
  onClose: () => void
  direction: "ltr" | "rtl"
}

export function KeyboardShortcutsHelp({ isOpen, onClose, direction }: KeyboardShortcutsHelpProps) {
  const nextKey = direction === "rtl" ? "Left Arrow" : "Right Arrow"
  const prevKey = direction === "rtl" ? "Right Arrow" : "Left Arrow"

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Keyboard Shortcuts</DialogTitle>
        </DialogHeader>

        <div className="py-4">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="font-medium">{nextKey} / Space</div>
              <div>Next page</div>

              <div className="font-medium">{prevKey}</div>
              <div>Previous page</div>

              <div className="font-medium">F</div>
              <div>Toggle fullscreen</div>

              <div className="font-medium">S</div>
              <div>Open settings</div>

              <div className="font-medium">H</div>
              <div>Show/hide this help</div>

              <div className="font-medium">R</div>
              <div>Report an issue</div>

              <div className="font-medium">Esc</div>
              <div>Close any open dialog</div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
