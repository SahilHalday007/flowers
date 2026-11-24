import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { finale } from '../data/flowers'

type CompletionMomentProps = {
  open: boolean
  reduced: boolean
  onDismiss: () => void
}

const fallingPetals = Array.from({ length: 22 }, (_, index) => ({
  left: `${(index * 47) % 100}%`,
  size: 7 + (index % 5) * 3,
  delay: `${-((index * 1.7) % 9)}s`,
  duration: `${7 + (index % 6)}s`,
  sway: `${((index % 7) - 3) * 8}vw`,
}))

export function CompletionMoment({
  open,
  reduced,
  onDismiss,
}: CompletionMomentProps) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const previousFocus = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!open) return
    previousFocus.current = document.activeElement as HTMLElement | null
    closeRef.current?.focus()
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onDismiss()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      previousFocus.current?.focus()
    }
  }, [open, onDismiss])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 grid place-items-center overflow-hidden px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduced ? 0.18 : 0.6 }}
        >
          <div className="absolute inset-0 bg-wine/88 backdrop-blur-md" />
          {!reduced && (
            <div className="absolute inset-0" aria-hidden="true">
              {fallingPetals.map((petal, index) => (
                <span
                  key={index}
                  className="falling-petal"
                  style={{
                    left: petal.left,
                    width: petal.size,
                    height: petal.size,
                    animationDelay: petal.delay,
                    animationDuration: petal.duration,
                    ['--sway' as string]: petal.sway,
                  }}
                />
              ))}
            </div>
          )}

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="finale-title"
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 26, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.98 }}
            transition={{
              duration: reduced ? 0.18 : 0.8,
              delay: reduced ? 0 : 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative w-full max-w-lg rounded-3xl border border-gold/25 bg-cream/95 px-8 py-12 text-center shadow-2xl"
          >
            <p className="text-[10px] font-medium uppercase tracking-[0.34em] text-gold">
              Every petal, opened
            </p>
            <h2
              id="finale-title"
              className="mt-5 font-display text-4xl leading-tight text-wine sm:text-5xl"
            >
              {finale.title}
            </h2>
            <p className="mt-1 font-display text-5xl italic text-burgundy sm:text-6xl">
              {finale.message}
            </p>
            <div className="mx-auto my-7 h-px w-24 bg-gold/60" />
            <p className="font-display text-xl text-muted">{finale.note}</p>
            <button
              ref={closeRef}
              type="button"
              onClick={onDismiss}
              className="mt-9 min-h-11 rounded-full border border-burgundy/25 px-7 py-2 text-xs font-medium tracking-widest text-burgundy transition-colors hover:bg-burgundy hover:text-cream"
            >
              Keep the flowers
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
