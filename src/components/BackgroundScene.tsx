const motes = Array.from({ length: 18 }, (_, index) => ({
  left: `${(index * 37) % 100}%`,
  top: `${(index * 61) % 100}%`,
  size: 4 + ((index * 13) % 9),
  duration: 13 + ((index * 7) % 11),
  delay: -((index * 3) % 12),
}))

export function BackgroundScene() {
  return (
    <div className="scene" aria-hidden="true">
      <div className="scene-glow" />
      {motes.map((mote, index) => (
        <span
          key={index}
          className="mote"
          style={{
            left: mote.left,
            top: mote.top,
            width: mote.size,
            height: mote.size,
            animationDuration: `${mote.duration}s`,
            animationDelay: `${mote.delay}s`,
          }}
        />
      ))}
    </div>
  )
}
