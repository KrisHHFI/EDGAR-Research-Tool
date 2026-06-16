import { CATEGORIES } from '../data'
import { SIGNAL_META } from '../types'
import type { FormEntry } from '../types'

type SignalFilter = FormEntry['signal'] | 'all'

interface Props {
  activeCategory: string
  search: string
  activeSignal: SignalFilter
  onCategoryChange: (id: string) => void
  onSearchChange: (value: string) => void
  onSignalChange: (signal: SignalFilter) => void
  totalForms: number
}

interface NavItemProps {
  icon: string
  label: string
  count: number
  active: boolean
  onClick: () => void
}

function NavItem({ icon, label, count, active, onClick }: NavItemProps) {
  const base = 'flex items-center gap-2.5 w-full px-3 py-[9px] rounded-lg border-none text-[0.82rem] font-medium cursor-pointer text-left transition-all'
  const style = active
    ? 'bg-blue-500/14 text-blue-500'
    : 'bg-transparent text-[#8892a4] hover:bg-[#161c2a] hover:text-[#e2e8f0]'
  const countStyle = active ? 'bg-blue-500/20 text-blue-500' : 'bg-[#1f2937] text-[#8892a4]'
  return (
    <button onClick={onClick} className={`${base} ${style}`}>
      <span className="text-base shrink-0">{icon}</span>
      <span>{label}</span>
      <span className={`ml-auto rounded-full text-[0.72rem] font-bold px-1.5 py-px ${countStyle}`}>{count}</span>
    </button>
  )
}

export default function Sidebar({ activeCategory, search, activeSignal, onCategoryChange, onSearchChange, onSignalChange, totalForms }: Props) {
  const signals: { value: SignalFilter; label: string; cls: string }[] = [
    { value: 'all', label: 'All', cls: activeSignal === 'all' ? 'bg-blue-500/20 text-blue-400 border-blue-500/40' : 'bg-[#111620] text-[#8892a4] border-[#2d3748] hover:border-[#4a5568] hover:text-[#e2e8f0]' },
    ...( Object.entries(SIGNAL_META) as [FormEntry['signal'], typeof SIGNAL_META[keyof typeof SIGNAL_META]][]).map(([key, meta]) => ({
      value: key as SignalFilter,
      label: meta.label,
      cls: activeSignal === key ? meta.cls + ' border-current' : 'bg-[#111620] text-[#8892a4] border-[#2d3748] hover:border-[#4a5568] hover:text-[#e2e8f0]',
    })),
  ]

  return (
    <aside className="w-[252px] shrink-0 py-6 sticky top-16 h-[calc(100vh-64px)] overflow-y-auto flex flex-col gap-2 border-r border-[#1f2937] pr-5 max-[860px]:w-full max-[860px]:static max-[860px]:h-auto max-[860px]:border-r-0 max-[860px]:border-b max-[860px]:border-b-[#1f2937] max-[860px]:pr-0 max-[860px]:pb-4">
      <div className="mb-1.5">
        <input
          className="w-full px-[14px] py-[9px] rounded-lg border border-[#2d3748] bg-[#111620] text-[#e2e8f0] text-[0.85rem] outline-none placeholder:text-[#8892a4] focus:border-blue-500 focus:ring-2 focus:ring-blue-500/15 transition-all"
          type="text"
          placeholder="Search forms…"
          value={search}
          onChange={e => onSearchChange(e.target.value)}
        />
      </div>
      <div className="mb-2">
        <p className="text-[0.72rem] font-semibold uppercase tracking-wider text-[#8892a4] mb-1.5 px-1">Signal</p>
        <div className="flex flex-col gap-1">
          {signals.map(s => (
            <button
              key={s.value}
              onClick={() => onSignalChange(s.value)}
              className={`w-full text-left px-3 py-[7px] rounded-lg border text-[0.8rem] font-medium cursor-pointer transition-all ${s.cls}`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>
      <nav className="flex flex-col gap-0.5 flex-1 max-[860px]:flex-row max-[860px]:flex-wrap">
        <NavItem icon="🗂" label="All Forms" count={totalForms} active={activeCategory === 'all'} onClick={() => onCategoryChange('all')} />
        {CATEGORIES.map(cat => (
          <NavItem key={cat.id} icon={cat.icon} label={cat.name} count={cat.forms.length} active={activeCategory === cat.id} onClick={() => onCategoryChange(cat.id)} />
        ))}
      </nav>
      <div className="border-t border-[#1f2937] pt-3.5 mt-2 text-[0.75rem] text-[#8892a4] max-[860px]:hidden">
        <p>Data sourced directly from</p>
        <a href="https://www.sec.gov/edgar" target="_blank" rel="noopener noreferrer" className="text-blue-500 font-medium hover:underline">SEC EDGAR</a>
      </div>
    </aside>
  )
}
