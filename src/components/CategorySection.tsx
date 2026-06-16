import type { Category } from '../types'
import FilingCard from './FilingCard'

export default function CategorySection({ category }: { category: Category }) {
  return (
    <section>
      <div className="flex items-center gap-2.5 mb-[18px]">
        <span className="text-[1.15rem]">{category.icon}</span>
        <h2 className="text-base font-bold text-[#e2e8f0] tracking-[0.01em]">{category.name}</h2>
        <span className="ml-auto text-[0.75rem] text-[#8892a4] bg-[#161c2a] border border-[#1f2937] rounded-full px-2.5 py-0.5">
          {category.forms.length} forms
        </span>
      </div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-3.5">
        {category.forms.map(form => (
          <FilingCard key={form.type} form={form} />
        ))}
      </div>
    </section>
  )
}
