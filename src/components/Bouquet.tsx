import { flowers } from '../data/flowers'
import { Flower } from './Flower'

type BouquetProps = {
  openedIds: ReadonlySet<number>
  activeId: number | null
  reduced: boolean
  settled: boolean
  onToggle: (id: number) => void
}

const sway = flowers.map((_, index) => ({
  duration: 4.8 + (index % 3) * 0.9,
  delay: -((index * 1.4) % 5),
}))

export function Bouquet({
  openedIds,
  activeId,
  reduced,
  settled,
  onToggle,
}: BouquetProps) {
  return (
    <div
      className={`relative h-full w-full${settled ? ' is-gathered' : ''}`}
    >
      {flowers.map((flower, index) => (
        <div
          key={flower.id}
          className={`flower-slot flower-slot--${index + 1}${
            openedIds.size === 0 && index === 0 ? ' flower-slot--hint' : ''
          }`}
        >
          <Flower
            flower={flower}
            index={index}
            open={openedIds.has(flower.id)}
            active={activeId === flower.id}
            reduced={reduced}
            swayDelay={sway[index].delay}
            swayDuration={sway[index].duration}
            onToggle={onToggle}
          />
        </div>
      ))}
    </div>
  )
}
