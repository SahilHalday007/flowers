import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { flowers as bouquetFlowers, type ColorVariant } from '../data/flowers'
import { Flower } from './Flower'

type Bloom = {
  id: number
  x: number
  y: number
  color: ColorVariant
  rotate: number
  size: number
}

type MoreFlowersProps = {
  reduced: boolean
}

const MAX_BLOOMS = 50
const colors = bouquetFlowers.map((flower) => flower.colorVariant)
const noop = () => {}

function makeBloom(id: number, existing: Bloom[]): Bloom {
  let best = { x: 50, y: 50 }
  let bestDistance = -1

  for (let attempt = 0; attempt < 40; attempt += 1) {
    const candidate = {
      x: 9 + Math.random() * 82,
      y: 24 + Math.random() * 66,
    }
    const distance = existing.length
      ? Math.min(
          ...existing.map((bloom) =>
            Math.hypot(bloom.x - candidate.x, bloom.y - candidate.y),
          ),
        )
      : Number.POSITIVE_INFINITY

    if (distance > bestDistance) {
      bestDistance = distance
      best = candidate
    }
  }

  return {
    id,
    ...best,
    color: colors[id % colors.length],
    rotate: -22 + Math.random() * 44,
    size: 1.3 + Math.random() * 0.2,
  }
}

function ExtraBloom({ bloom, reduced }: { bloom: Bloom; reduced: boolean }) {
  const colorIndex = (bloom.id - 1) % bouquetFlowers.length

  return (
    <div
      className="extra-bloom-anchor"
      style={{
        left: `${bloom.x}%`,
        top: `${bloom.y}%`,
        ['--bloom-rotate' as string]: `${bloom.rotate}deg`,
      }}
    >
      <motion.div
        className="extra-bloom"
        style={{ transformOrigin: '50% 100%' }}
        initial={
          reduced
            ? { opacity: 0 }
            : { opacity: 0, scaleX: 0.26, scaleY: 0.04 }
        }
        animate={
          reduced
            ? { opacity: 1 }
            : { opacity: 1, scaleX: bloom.size, scaleY: bloom.size }
        }
        transition={
          reduced
            ? { duration: 0.2 }
            : { duration: 1.15, ease: [0.22, 1, 0.36, 1] }
        }
      >
        <div aria-hidden="true">
          <Flower
            flower={bouquetFlowers[colorIndex]}
            index={colorIndex}
            open
            active={false}
            reduced={reduced}
            swayDelay={0}
            swayDuration={5}
            growing
            onToggle={noop}
          />
        </div>
      </motion.div>
    </div>
  )
}

export function MoreFlowers({ reduced }: MoreFlowersProps) {
  const [blooms, setBlooms] = useState<Bloom[]>([])
  const [full, setFull] = useState(false)

  const addFlower = () => {
    if (full) return
    setBlooms((previous) => {
      const next = [...previous, makeBloom(previous.length + 1, previous)]
      if (next.length >= MAX_BLOOMS) setFull(true)
      return next
    })
  }

  return (
    <>
      <div
        className="pointer-events-none fixed inset-0 z-30 overflow-hidden"
        aria-hidden="true"
      >
        <AnimatePresence>
          {blooms.map((bloom) => (
            <ExtraBloom key={bloom.id} bloom={bloom} reduced={reduced} />
          ))}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {!full && (
          <div className="pointer-events-none fixed inset-x-0 bottom-20 z-40 flex justify-center px-4">
            <motion.button
              type="button"
              onClick={addFlower}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{
                opacity: 1,
                scale: 1,
                y: reduced ? 0 : [0, -4, 0],
              }}
              exit={{ opacity: 0, scale: 0.94 }}
              whileHover={reduced ? undefined : { scale: 1.06 }}
              whileTap={{ scale: 0.96 }}
              transition={
                reduced
                  ? { duration: 0.2 }
                  : {
                      opacity: { duration: 0.4 },
                      scale: { duration: 0.4 },
                      y: { duration: 3.2, repeat: Infinity, ease: 'easeInOut' },
                    }
              }
              className="pointer-events-auto rounded-full border border-burgundy/25 bg-cream/95 px-7 py-3 font-display text-lg text-burgundy shadow-[0_12px_32px_rgba(74,21,39,0.16)]"
            >
              Click me for more flowers
            </motion.button>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {full && (
          <div className="pointer-events-none fixed inset-x-0 top-1/2 z-40 flex -translate-y-1/2 justify-center px-6">
            <motion.div
              role="status"
              initial={{ opacity: 0, y: 18, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduced ? 0.2 : 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="pointer-events-auto max-w-md rounded-3xl border border-gold/25 bg-cream/95 px-6 py-8 text-center shadow-[0_24px_64px_rgba(74,21,39,0.24)]"
            >
              <p className="font-display text-2xl leading-snug text-wine sm:text-3xl">
                Sorry baby, i could give you all the flowers you want but the
                screen isnt enough. But my love for you is eternal and never ending baby
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
