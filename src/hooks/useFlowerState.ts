import { useCallback, useEffect, useRef, useState } from 'react'

export function useFlowerState(total: number) {
  const [openedIds, setOpenedIds] = useState<ReadonlySet<number>>(
    () => new Set<number>(),
  )
  const [activeId, setActiveId] = useState<number | null>(null)
  const [showCompletion, setShowCompletion] = useState(false)
  const [settled, setSettled] = useState(false)
  const completionSeen = useRef(false)

  const toggle = (id: number) => {
    setOpenedIds((prev) => (prev.has(id) ? prev : new Set(prev).add(id)))
    setActiveId((prev) => (prev === id ? null : id))
  }

  useEffect(() => {
    if (openedIds.size !== total || completionSeen.current) return
    const timer = window.setTimeout(() => {
      completionSeen.current = true
      setShowCompletion(true)
    }, 1100)
    return () => window.clearTimeout(timer)
  }, [openedIds, total])

  const dismissCompletion = useCallback(() => {
    setShowCompletion(false)
    setSettled(true)
  }, [])

  return {
    openedIds,
    activeId,
    toggle,
    showCompletion,
    dismissCompletion,
    settled,
  }
}
