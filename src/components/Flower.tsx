import { motion, type Variants } from 'framer-motion'
import type { Flower as FlowerData } from '../data/flowers'
import { palette } from '../data/palette'

type FlowerProps = {
  flower: FlowerData
  index: number
  open: boolean
  active: boolean
  reduced: boolean
  swayDelay: number
  swayDuration: number
  growing?: boolean
  onToggle: (id: number) => void
}

const outerPetal = 'M 80 68 C 56 47, 54 15, 80 5 C 106 15, 104 47, 80 68 Z'
const innerPetal = 'M 80 68 C 66 55, 64 31, 80 22 C 96 31, 94 55, 80 68 Z'
const petalOrigin = {
  transformBox: 'view-box' as const,
  transformOrigin: '80px 68px',
}
const leafOrigin = {
  transformBox: 'view-box' as const,
  transformOrigin: '80px 150px',
}

const dots = Array.from({ length: 8 }, (_, index) => ({
  cx: 80 + Math.cos((index / 8) * Math.PI * 2) * 7,
  cy: 68 + Math.sin((index / 8) * Math.PI * 2) * 7,
}))

export function Flower({
  flower,
  index,
  open,
  active,
  reduced,
  swayDelay,
  swayDuration,
  growing = false,
  onToggle,
}: FlowerProps) {
  const colors = palette[flower.colorVariant]
  const spring = { type: 'spring' as const, stiffness: 170, damping: 16 }

  const headVariants: Variants = {
    closed: {},
    open: {
      transition: {
        staggerChildren: reduced ? 0 : 0.05,
        delayChildren: growing ? (reduced ? 0.05 : 0.75) : 0.02,
      },
    },
  }
  const outerVariants: Variants = {
    closed: {
      scale: reduced ? 0.92 : 0.4,
      rotate: reduced ? 0 : 14,
      opacity: reduced ? 0.45 : 0.9,
    },
    open: { scale: 1, rotate: 0, opacity: 1 },
  }
  const innerVariants: Variants = {
    closed: {
      scale: reduced ? 0.92 : 0.32,
      opacity: reduced ? 0.4 : 0.65,
    },
    open: { scale: 1, opacity: 1 },
  }
  const centerVariants: Variants = {
    closed: { scale: reduced ? 0.9 : 0.35, opacity: reduced ? 0.5 : 0 },
    open: { scale: 1, opacity: 1 },
  }

  return (
    <motion.div
      className="flower-sway"
      animate={
        reduced ? undefined : { rotate: [-2.5, 2.5, -2.5], y: [0, -5, 0] }
      }
      transition={
        reduced
          ? undefined
          : {
              duration: swayDuration,
              delay: swayDelay,
              repeat: Infinity,
              ease: 'easeInOut',
            }
      }
    >
      <motion.button
        type="button"
        className="flower-button"
        onClick={() => onToggle(flower.id)}
        aria-label={`${active ? 'Close' : 'Open'} flower ${index + 1}: ${flower.memoryLabel}`}
        aria-expanded={active}
        aria-controls="flower-reveal"
        data-open={open}
        whileHover={reduced ? undefined : { scale: 1.025 }}
        whileTap={reduced ? undefined : { scale: 0.97 }}
        style={{ width: 160, height: 210 }}
      >
        <svg
          className="petal-art block h-full w-full overflow-visible"
          viewBox="0 0 160 210"
          width="160"
          height="210"
          aria-hidden="true"
        >
          <motion.path
            d="M 80 76 Q 76 140 80 206"
            stroke="#78805F"
            strokeWidth="3.4"
            fill="none"
            strokeLinecap="round"
            initial={growing && !reduced ? { pathLength: 0 } : false}
            animate={growing && !reduced ? { pathLength: 1 } : undefined}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          />
          <motion.path
            d="M 79 138 Q 55 122 48 140 Q 62 156 79 142 Z"
            fill="#8B9470"
            initial={growing && !reduced ? { opacity: 0, scale: 0 } : false}
            animate={growing && !reduced ? { opacity: 1, scale: 1 } : undefined}
            transition={{ duration: 0.35, delay: 0.45, ease: 'easeOut' }}
            style={leafOrigin}
          />
          <motion.path
            d="M 80 164 Q 104 150 112 168 Q 98 182 80 168 Z"
            fill="#7C8663"
            initial={growing && !reduced ? { opacity: 0, scale: 0 } : false}
            animate={growing && !reduced ? { opacity: 1, scale: 1 } : undefined}
            transition={{ duration: 0.35, delay: 0.52, ease: 'easeOut' }}
            style={leafOrigin}
          />

          <motion.g
            variants={headVariants}
            initial="closed"
            animate={open ? 'open' : 'closed'}
            style={{ ...petalOrigin, scale: 0.76 }}
          >
            {Array.from({ length: 6 }, (_, petal) => (
              <g key={petal} transform={`rotate(${petal * 60} 80 68)`}>
                <motion.path
                  d={outerPetal}
                  fill={colors.outer}
                  stroke={colors.edge}
                  strokeOpacity="0.35"
                  strokeWidth="1"
                  variants={outerVariants}
                  transition={reduced ? { duration: 0.2 } : spring}
                  style={petalOrigin}
                />
                <motion.path
                  d="M 80 60 L 80 15"
                  stroke="#FFFFFF"
                  strokeOpacity="0.3"
                  strokeWidth="1.2"
                  variants={outerVariants}
                  transition={reduced ? { duration: 0.2 } : spring}
                  style={petalOrigin}
                />
              </g>
            ))}
            {Array.from({ length: 5 }, (_, petal) => (
              <g key={petal} transform={`rotate(${petal * 72 + 36} 80 68)`}>
                <motion.path
                  d={innerPetal}
                  fill={colors.inner}
                  stroke={colors.edge}
                  strokeOpacity="0.22"
                  strokeWidth="0.8"
                  variants={innerVariants}
                  transition={reduced ? { duration: 0.2 } : spring}
                  style={petalOrigin}
                />
              </g>
            ))}
            <motion.path
              d="M 55 78 Q 80 104 105 78 Q 98 100 80 106 Q 62 100 55 78 Z"
              fill="#78805F"
              animate={{ opacity: open ? 0 : 0.95, scale: open ? 0.7 : 1 }}
              transition={{ duration: reduced ? 0.18 : 0.4 }}
              style={petalOrigin}
            />
            <motion.g
              variants={centerVariants}
              transition={reduced ? { duration: 0.2 } : spring}
              style={petalOrigin}
            >
              <circle cx="80" cy="68" r="12" fill={colors.center} />
              <circle cx="80" cy="68" r="7.5" fill="#F8E9C9" opacity="0.5" />
              {dots.map((dot, dotIndex) => (
                <circle
                  key={dotIndex}
                  cx={dot.cx}
                  cy={dot.cy}
                  r="1.5"
                  fill="#7A5226"
                  opacity="0.75"
                />
              ))}
            </motion.g>
          </motion.g>
        </svg>
      </motion.button>
    </motion.div>
  )
}
