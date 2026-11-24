import type { ColorVariant } from './flowers'

export const palette: Record<
  ColorVariant,
  { outer: string; inner: string; center: string; edge: string }
> = {
  rose: {
    outer: '#E69AA6',
    inner: '#F7CFD1',
    center: '#C6A15B',
    edge: '#B6556C',
  },
  blush: {
    outer: '#F0C2C1',
    inner: '#FCE4DE',
    center: '#C6A15B',
    edge: '#C98B8D',
  },
  mauve: {
    outer: '#C795A8',
    inner: '#ECD6DD',
    center: '#B9954F',
    edge: '#98617A',
  },
  ivory: {
    outer: '#F0DACB',
    inner: '#FFF5EA',
    center: '#C6A15B',
    edge: '#C6A08B',
  },
  burgundy: {
    outer: '#9C3E5C',
    inner: '#C8788C',
    center: '#D8B66E',
    edge: '#6E2239',
  },
  crimson: {
    outer: '#C0556D',
    inner: '#E79BA7',
    center: '#D8B66E',
    edge: '#8E3550',
  },
}
