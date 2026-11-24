export type ColorVariant =
  | 'rose'
  | 'blush'
  | 'mauve'
  | 'ivory'
  | 'burgundy'
  | 'crimson'

export type Flower = {
  id: number
  colorVariant: ColorVariant
  memoryLabel: string
  message: string
}

export const intro = {
  eyebrow: 'A little flowers, just for you',
  name: 'Kamama❤️',
  line: 'Every flower holds something I wanted to tell you. Open them slowly.',
  progress: (found: number, total: number) =>
    found === total ? 'All six found' : `${found} of ${total} found`,
}

export const finale = {
  title: 'You found them all.',
  message: 'I love you.',
  note: 'Yours, Daddy',
}

export const flowers: Flower[] = [
  {
    id: 1,
    colorVariant: 'rose',
    memoryLabel: 'The day we met',
    message: 'The first time i met you, is a feeling i cant begin to explain and will stick with me forever.',
  },
  {
    id: 2,
    colorVariant: 'blush',
    memoryLabel: 'That first long talk',
    message: 'How the hours disappeared and the room went quiet.',
  },
  {
    id: 3,
    colorVariant: 'mauve',
    memoryLabel: 'Our first kiss',
    message: 'How the taste of your lips and warmth of your body made my head go silence with peace.',
  },
  {
    id: 4,
    colorVariant: 'ivory',
    memoryLabel: 'The small talks',
    message: 'All the small talks that end up with you laughing and smiling are what i live for.',
  },
  {
    id: 5,
    colorVariant: 'burgundy',
    memoryLabel: 'When you stayed',
    message: 'The moment I knew I wanted to keep you close.',
  },
  {
    id: 6,
    colorVariant: 'crimson',
    memoryLabel: 'Always',
    message: 'Everything I still want to say, in every flower still to come.',
  },
]
