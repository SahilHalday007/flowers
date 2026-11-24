const colors = ['#E69AA6', '#F0C2C1', '#C795A8', '#F0DACB', '#9C3E5C', '#C0556D']

const fallingFlowers = Array.from({ length: 16 }, (_, index) => ({
  left: `${(index * 61 + 7) % 100}%`,
  size: 12 + (index % 5) * 4,
  delay: `${-((index * 1.3) % 14)}s`,
  duration: `${9 + (index % 7) * 1.5}s`,
  sway: `${((index % 5) - 2) * 12}vw`,
  color: colors[index % colors.length],
}))

export function FallingFlowers() {
  return (
    <div className="pointer-events-none fixed inset-0 z-20 overflow-hidden" aria-hidden="true">
      {fallingFlowers.map((flower, index) => (
        <span
          key={index}
          className="falling-flower"
          style={{
            left: flower.left,
            width: flower.size,
            height: flower.size,
            animationDelay: flower.delay,
            animationDuration: flower.duration,
            ['--sway' as string]: flower.sway,
          }}
        >
          <svg viewBox="0 0 24 24" width="100%" height="100%">
            {[0, 72, 144, 216, 288].map((angle) => (
              <ellipse
                key={angle}
                cx="12"
                cy="7"
                rx="3.2"
                ry="5.2"
                fill={flower.color}
                opacity="0.92"
                transform={`rotate(${angle} 12 12)`}
              />
            ))}
            <circle cx="12" cy="12" r="2.6" fill="#C6A15B" />
          </svg>
        </span>
      ))}
    </div>
  )
}
