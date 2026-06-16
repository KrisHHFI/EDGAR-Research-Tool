import { useState } from 'react'
import { CATEGORIES } from './data'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import CategorySection from './components/CategorySection'
import type { FormEntry } from './types'

export default function App() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [search, setSearch] = useState('')
  const [activeSignal, setActiveSignal] = useState<FormEntry['signal'] | 'all'>('all')

  const filteredCategories = CATEGORIES
    .map(cat => ({
      ...cat,
      forms: cat.forms.filter(
        f =>
          (activeSignal === 'all' || f.signal === activeSignal) &&
          (
            f.type.toLowerCase().includes(search.toLowerCase()) ||
            f.label.toLowerCase().includes(search.toLowerCase()) ||
            f.description.toLowerCase().includes(search.toLowerCase())
          )
      ),
    }))
    .filter(cat => (activeCategory === 'all' || cat.id === activeCategory) && cat.forms.length > 0)

  const totalForms = CATEGORIES.reduce((a, c) => a + c.forms.length, 0)

  return (
    <div className="flex flex-col min-h-screen bg-[#0a0d13] text-[#e2e8f0]">
      <Header />
      <div className="flex flex-1 max-w-[1400px] mx-auto w-full px-6 max-[860px]:flex-col max-[860px]:px-4">
        <Sidebar
          activeCategory={activeCategory}
          search={search}
          activeSignal={activeSignal}
          onCategoryChange={setActiveCategory}
          onSearchChange={setSearch}
          onSignalChange={setActiveSignal}
          totalForms={totalForms}
        />
        <main className="flex-1 py-8 pb-12 pl-8 min-w-0 flex flex-col gap-11 max-[860px]:pl-0 max-[860px]:pt-6">
          {filteredCategories.length === 0 && (
            <div className="text-[#8892a4] text-[0.95rem] py-10">No forms match your search.</div>
          )}
          {filteredCategories.map(cat => (
            <CategorySection key={cat.id} category={cat} />
          ))}
        </main>
      </div>
    </div>
  )
}

