import type { FormEntry } from '../types'
import { SIGNAL_META } from '../types'
import { edgarUrl } from '../data'

export default function FilingCard({ form }: { form: FormEntry }) {
  const sig = SIGNAL_META[form.signal]
  return (
    <a
      href={edgarUrl(form.type)}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col gap-2.5 px-5 py-[18px] bg-[#111620] border border-[#1f2937] rounded-xl transition-all text-[#e2e8f0] no-underline hover:border-blue-500 hover:-translate-y-0.5 hover:shadow-[0_6px_28px_rgba(59,130,246,0.12)]"
    >
      <div className="flex items-start justify-between gap-2.5">
        <div className="text-base font-bold">{form.label}</div>
        <span className={`text-[0.68rem] font-bold tracking-[0.03em] px-2 py-0.5 rounded-full border uppercase whitespace-nowrap shrink-0 ${sig.cls}`}>
          {sig.label}
        </span>
      </div>
      <div className="text-[0.82rem] font-semibold text-[#8892a4]">{form.description}</div>
      <div className="text-[0.8rem] text-[#8892a4] leading-relaxed flex-1">{form.tip}</div>
      <div className="mt-1 pt-2.5 border-t border-[#1f2937]">
        <span className="text-[0.78rem] font-semibold text-blue-500 group-hover:text-blue-400 transition-colors">
          Open in EDGAR ↗
        </span>
      </div>
    </a>
  )
}
