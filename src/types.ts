export interface FormEntry {
  type: string
  label: string
  description: string
  signal: 'bullish' | 'bearish' | 'neutral' | 'info'
  tip: string
}

export interface Category {
  id: string
  name: string
  icon: string
  forms: FormEntry[]
}

export const SIGNAL_META = {
  bullish: { label: 'Bullish Signal', cls: 'text-emerald-400 border-emerald-400/30 bg-emerald-400/10' },
  bearish: { label: 'Bearish Signal', cls: 'text-red-400 border-red-400/30 bg-red-400/10' },
  neutral: { label: 'Watch Closely', cls: 'text-amber-400 border-amber-400/30 bg-amber-400/10' },
  info:    { label: 'Due Diligence', cls: 'text-indigo-400 border-indigo-400/30 bg-indigo-400/10' },
} as const
