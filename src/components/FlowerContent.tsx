import { motion } from 'framer-motion'
import type { Flower } from '../data/flowers'

type FlowerContentProps = {
  flower: Flower
  reduced: boolean
  onClose: () => void
}

export function FlowerContent({ flower, reduced, onClose }: FlowerContentProps) {
  return (
    <motion.article
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={reduced ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.98 }}
      transition={{ duration: reduced ? 0.18 : 0.42, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-xl text-center"
    >
      <p className="text-[10px] font-medium uppercase tracking-[0.34em] text-burgundy/75">
        {flower.memoryLabel}
      </p>
      <h2 className="mt-2 font-display text-3xl leading-tight text-ink sm:text-4xl">
        {flower.message}
      </h2>
      <div className="mx-auto mt-4 h-px w-14 bg-gold/60" />
      <button
        type="button"
        onClick={onClose}
        className="mt-3 min-h-11 rounded-full px-4 text-xs tracking-wide text-muted underline decoration-gold/50 underline-offset-4 transition-colors hover:text-ink"
      >
        Close this flower
      </button>
    </motion.article>
  )
}
