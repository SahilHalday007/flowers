import { AnimatePresence, useReducedMotion } from 'framer-motion'
import { BackgroundScene } from './components/BackgroundScene'
import { Bouquet } from './components/Bouquet'
import { CompletionMoment } from './components/CompletionMoment'
import { FallingFlowers } from './components/FallingFlowers'
import { FlowerContent } from './components/FlowerContent'
import { MoreFlowers } from './components/MoreFlowers'
import { SoundToggle } from './components/SoundToggle'
import { flowers, intro } from './data/flowers'
import { useAmbientSound } from './hooks/useAmbientSound'
import { useFlowerState } from './hooks/useFlowerState'

export default function App() {
  const {
    openedIds,
    activeId,
    toggle,
    showCompletion,
    dismissCompletion,
    settled,
  } = useFlowerState(flowers.length)
  const { enabled, toggle: toggleSound } = useAmbientSound()
  const reduced = useReducedMotion() ?? false
  const activeFlower = flowers.find((flower) => flower.id === activeId) ?? null

  return (
    <>
      <BackgroundScene />

      <div className="relative z-10 flex h-dvh w-full flex-col overflow-hidden px-4 pt-3 pb-3 sm:px-8 sm:pt-8 sm:pb-4">
        <header className="shrink-0 text-center">
          <p className="text-[10px] font-medium uppercase tracking-[0.36em] text-burgundy/70">
            {intro.eyebrow}
          </p>
          <h1 className="mt-2 font-display text-4xl leading-none text-ink sm:text-6xl">
            For <em className="font-normal italic text-burgundy">{intro.name}</em>
          </h1>
          <p className="mx-auto mt-2 max-w-md font-display text-lg leading-snug text-muted sm:mt-3 sm:text-xl">
            {intro.line}
          </p>
          <div className="mt-2 flex items-center justify-center gap-2 sm:mt-3">
            {flowers.map((flower) => (
              <span
                key={flower.id}
                aria-hidden="true"
                className={`h-1.5 w-1.5 rounded-full transition-colors duration-300 ${
                  openedIds.has(flower.id) ? 'bg-burgundy' : 'bg-burgundy/20'
                }`}
              />
            ))}
          </div>
          {/* <p className="mt-1 text-[10px] tracking-[0.2em] text-muted/80">
            {intro.progress(openedIds.size, flowers.length)}
          </p> */}
        </header>

        <section
          className="bouquet-stage min-h-0 flex-1"
          aria-label="The bouquet"
        >
          <Bouquet
            openedIds={openedIds}
            activeId={activeId}
            reduced={reduced}
            settled={settled}
            onToggle={toggle}
          />
        </section>

        <section
          id="flower-reveal"
          className="reveal-slot shrink-0"
          aria-live="polite"
          aria-label="Flower message"
        >
          <AnimatePresence mode="wait">
            {settled ? (
              <MoreFlowers key="more" reduced={reduced} />
            ) : (
              activeFlower && (
                <FlowerContent
                  key={activeFlower.id}
                  flower={activeFlower}
                  reduced={reduced}
                  onClose={() => toggle(activeFlower.id)}
                />
              )
            )}
          </AnimatePresence>
        </section>

        <footer className="flex shrink-0 items-center justify-between gap-4 border-t border-burgundy/10 pt-2 sm:pt-3">
          <p className="font-display text-sm italic text-muted">
            Take your time.
          </p>
          <SoundToggle enabled={enabled} onToggle={toggleSound} />
        </footer>
      </div>

      {settled && !reduced && <FallingFlowers />}

      <CompletionMoment
        open={showCompletion}
        reduced={reduced}
        onDismiss={dismissCompletion}
      />
    </>
  )
}
