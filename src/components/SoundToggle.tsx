type SoundToggleProps = {
  enabled: boolean
  onToggle: () => void
}

export function SoundToggle({ enabled, onToggle }: SoundToggleProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={enabled}
      aria-label={enabled ? 'Mute music' : 'Unmute music'}
      className="inline-flex min-h-11 items-center gap-2 rounded-full border border-gold/30 bg-cream/60 px-4 py-2 text-xs font-medium tracking-wide text-muted backdrop-blur-sm transition-colors hover:border-gold/60 hover:text-ink"
    >
      <svg
        viewBox="0 0 24 24"
        width="16"
        height="16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M4 9v6h4l5 4V5L8 9H4Z" />
        {enabled ? (
          <>
            <path d="M16 9a4 4 0 0 1 0 6" />
            <path d="M18.5 6.5a7.5 7.5 0 0 1 0 11" />
          </>
        ) : (
          <path d="M17 10l4 4m0-4-4 4" />
        )}
      </svg>
      <span>{enabled ? 'Music on' : 'Music off'}</span>
    </button>
  )
}
