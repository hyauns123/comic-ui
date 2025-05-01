"use client"

interface WaveTextProps {
  text: string
  className?: string
}

export function WaveText({ text, className = "" }: WaveTextProps) {
  // Replace spaces with non-breaking spaces to ensure they're included in the animation
  const characters = text.replace(/ /g, "\u00A0").split("")

  return (
    <div className={`wave-text ${className}`}>
      {characters.map((char, index) => (
        <span key={index} className="uppercase">
          {char}
        </span>
      ))}
    </div>
  )
}
