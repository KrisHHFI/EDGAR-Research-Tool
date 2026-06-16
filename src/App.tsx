import { useState } from 'react'
import './App.css'

interface FormEntry {
  type: string
  label: string
  description: string
  signal: 'bullish' | 'bearish' | 'neutral' | 'info'
  tip: string
}

interface Category {
  id: string
  name: string
  icon: string
  forms: FormEntry[]
}

const BASE_URL = 'https://www.sec.gov/cgi-bin/browse-edgar'

function edgarUrl(type: string): string {
  return `${BASE_URL}?company=&CIK=&type=${encodeURIComponent(type)}&owner=include&count=40&action=getcurrent`
}

const CATEGORIES: Category[] = [
  {
    id: 'high-signal',
    name: 'High-Signal / Time-Sensitive',
    icon: '⚡',
    forms: [
      {
        type: '8-K',
        label: 'Form 8-K',
        description: 'Current report — material corporate events',
        signal: 'neutral',
        tip: 'Watch items 1.01 (major agreements), 2.02 (earnings), 2.01 (acquisitions), 5.02 (exec changes). Often moves stocks before news media.'
      },
      {
        type: '4',
        label: 'Form 4',
        description: 'Insider change in beneficial ownership',
        signal: 'bullish',
        tip: 'Insider buying personal shares is one of the strongest bullish signals. Required within 2 business days. Cluster buying by multiple insiders is especially meaningful.'
      },
      {
        type: '3',
        label: 'Form 3',
        description: 'Initial insider ownership statement',
        signal: 'info',
        tip: 'Filed when a new officer, director, or 10%+ holder is appointed. Establishes their baseline ownership position.'
      },
      {
        type: '5',
        label: 'Form 5',
        description: 'Annual insider ownership catch-up',
        signal: 'info',
        tip: 'Covers deferred or small transactions not previously reported on Form 4. Less time-sensitive but worth reviewing annually.'
      },
    ],
  },
  {
    id: 'activist',
    name: 'Activist & Institutional',
    icon: '🏦',
    forms: [
      {
        type: 'SC 13D',
        label: 'SC 13D',
        description: 'Activist investor crosses 5% ownership',
        signal: 'bullish',
        tip: 'An activist (hedge fund, etc.) has taken a large stake and intends to push for change. Historically a strong bullish catalyst for small/mid-cap stocks.'
      },
      {
        type: 'SC 13G',
        label: 'SC 13G',
        description: 'Passive investor crosses 5% ownership',
        signal: 'bullish',
        tip: 'A large passive institution (Vanguard, BlackRock) has built a significant position. Signals institutional validation of the business.'
      },
      {
        type: 'SC 13D/A',
        label: 'SC 13D/A',
        description: 'Activist ownership amendment',
        signal: 'neutral',
        tip: 'Watch whether the activist is increasing or decreasing their stake — direction is the critical signal here.'
      },
      {
        type: 'SC 13G/A',
        label: 'SC 13G/A',
        description: 'Passive ownership amendment',
        signal: 'neutral',
        tip: 'Tracks changes in institutional passive positions. Significant increases/decreases can indicate shifting conviction.'
      },
    ],
  },
  {
    id: 'financials',
    name: 'Company Financials',
    icon: '📊',
    forms: [
      {
        type: '10-K',
        label: 'Form 10-K',
        description: 'Annual report',
        signal: 'info',
        tip: 'The most comprehensive picture of a business: full financials, risk factors, MD&A, and management commentary. Read this before investing.'
      },
      {
        type: '10-Q',
        label: 'Form 10-Q',
        description: 'Quarterly report',
        signal: 'info',
        tip: 'Filed three times a year between 10-Ks. Track revenue trends, gross margin, cash burn, and debt levels quarter over quarter.'
      },
      {
        type: '10-K/A',
        label: 'Form 10-K/A',
        description: 'Amended annual report',
        signal: 'bearish',
        tip: 'Restated financials are a red flag. Investigate the reason for the amendment carefully — accounting errors can indicate deeper issues.'
      },
      {
        type: '10-Q/A',
        label: 'Form 10-Q/A',
        description: 'Amended quarterly report',
        signal: 'bearish',
        tip: 'Like 10-K/A, restated quarterly results warrant scrutiny. May signal accounting control weaknesses.'
      },
    ],
  },
  {
    id: 'capital-markets',
    name: 'Capital Markets & Dilution',
    icon: '💸',
    forms: [
      {
        type: 'S-1',
        label: 'Form S-1',
        description: 'IPO registration statement',
        signal: 'info',
        tip: 'New company filing to go public. Research financials, risk factors, and use of proceeds before the IPO. Often available weeks before listing.'
      },
      {
        type: 'S-3',
        label: 'Form S-3',
        description: 'Shelf registration statement',
        signal: 'bearish',
        tip: 'Company registers shares for future sale — a potential dilution warning. Common in small-caps and biotechs needing ongoing capital.'
      },
      {
        type: '424B3',
        label: 'Form 424B3',
        description: 'Prospectus supplement (Rule 424(b)(3))',
        signal: 'bearish',
        tip: 'Confirms a stock offering is actively happening at a specific price. Immediate dilution signal — price often drops on or after filing.'
      },
      {
        type: '424B4',
        label: 'Form 424B4',
        description: 'Final IPO or offering prospectus',
        signal: 'neutral',
        tip: 'The final priced prospectus for a new offering. Contains exact share count, price, and use of proceeds.'
      },
      {
        type: '144',
        label: 'Form 144',
        description: 'Notice of proposed insider sale',
        signal: 'bearish',
        tip: 'An insider is planning to sell restricted shares. The opposite signal to Form 4 buys. Monitor volume relative to their total holdings.'
      },
      {
        type: 'D',
        label: 'Form D',
        description: 'Notice of exempt offering (private placement)',
        signal: 'neutral',
        tip: 'Company is raising money privately (PIPE, venture, etc.). Sometimes precedes a public announcement. Check total offering amount.'
      },
    ],
  },
  {
    id: 'ma-proxy',
    name: 'M&A & Proxy',
    icon: '🤝',
    forms: [
      {
        type: 'DEF 14A',
        label: 'DEF 14A',
        description: 'Definitive proxy statement',
        signal: 'info',
        tip: 'Covers shareholder votes on mergers, executive compensation, and board elections. Essential reading for activist and governance-focused investing.'
      },
      {
        type: 'DEFA14A',
        label: 'DEFA14A',
        description: 'Additional proxy soliciting materials',
        signal: 'neutral',
        tip: 'Supplemental materials filed during contested proxy situations or merger votes. Often signals a competitive bidding situation.'
      },
      {
        type: 'DEFM14A',
        label: 'DEFM14A',
        description: 'Merger proxy statement',
        signal: 'bullish',
        tip: 'Full details of a proposed merger including valuation, fairness opinion, and shareholder vote date. Key document for merger arbitrage.'
      },
      {
        type: 'SC TO-T',
        label: 'SC TO-T',
        description: 'Third-party tender offer',
        signal: 'bullish',
        tip: 'An acquirer is offering to buy shares directly from shareholders at a premium. Strong immediate price catalyst — check offer price vs. current market.'
      },
    ],
  },
  {
    id: 'foreign',
    name: 'Foreign Issuers',
    icon: '🌍',
    forms: [
      {
        type: '20-F',
        label: 'Form 20-F',
        description: 'Annual report — foreign private issuer',
        signal: 'info',
        tip: 'The foreign equivalent of a 10-K for non-US companies listed on US exchanges. Same due diligence applies; also review ADR structure and currency risk.'
      },
      {
        type: '6-K',
        label: 'Form 6-K',
        description: 'Current report — foreign private issuer',
        signal: 'neutral',
        tip: 'Foreign equivalent of 8-K. Contains earnings releases, press releases, and material events. High volume filer — filter by company for relevance.'
      },
    ],
  },
]

const SIGNAL_META = {
  bullish: { label: 'Bullish Signal', color: '#10b981' },
  bearish: { label: 'Bearish Signal', color: '#ef4444' },
  neutral: { label: 'Watch Closely', color: '#f59e0b' },
  info: { label: 'Due Diligence', color: '#6366f1' },
}

function App() {
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [search, setSearch] = useState('')
  const [hoveredForm, setHoveredForm] = useState<string | null>(null)

  const filteredCategories = CATEGORIES.map(cat => ({
    ...cat,
    forms: cat.forms.filter(
      f =>
        f.type.toLowerCase().includes(search.toLowerCase()) ||
        f.label.toLowerCase().includes(search.toLowerCase()) ||
        f.description.toLowerCase().includes(search.toLowerCase())
    ),
  })).filter(cat =>
    (activeCategory === 'all' || cat.id === activeCategory) && cat.forms.length > 0
  )

  const totalForms = CATEGORIES.reduce((a, c) => a + c.forms.length, 0)

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="header-inner">
          <div className="logo">
            <span className="logo-badge">SEC</span>
            <div>
              <h1>EDGAR Filing Dashboard</h1>
              <p>Real-time SEC filings for retail investors</p>
            </div>
          </div>
          <div className="header-actions">
            <a
              href="https://www.sec.gov/cgi-bin/browse-edgar?action=getcurrent"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              View Live Feed ↗
            </a>
          </div>
        </div>
      </header>

      <div className="layout">
        {/* Sidebar */}
        <aside className="sidebar">
          <div className="search-wrap">
            <input
              className="search"
              type="text"
              placeholder="Search forms…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <nav className="nav">
            <button
              className={`nav-item ${activeCategory === 'all' ? 'active' : ''}`}
              onClick={() => setActiveCategory('all')}
            >
              <span className="nav-icon">🗂</span>
              <span>All Forms</span>
              <span className="nav-count">{totalForms}</span>
            </button>
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                className={`nav-item ${activeCategory === cat.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                <span className="nav-icon">{cat.icon}</span>
                <span>{cat.name}</span>
                <span className="nav-count">{cat.forms.length}</span>
              </button>
            ))}
          </nav>
          <div className="sidebar-footer">
            <p>Data sourced directly from</p>
            <a href="https://www.sec.gov/edgar" target="_blank" rel="noopener noreferrer">SEC EDGAR</a>
          </div>
        </aside>

        {/* Main */}
        <main className="main">
          {filteredCategories.length === 0 && (
            <div className="empty">No forms match your search.</div>
          )}
          {filteredCategories.map(cat => (
            <section key={cat.id} className="category">
              <div className="category-header">
                <span className="category-icon">{cat.icon}</span>
                <h2>{cat.name}</h2>
                <span className="category-count">{cat.forms.length} forms</span>
              </div>
              <div className="cards">
                {cat.forms.map(form => {
                  const sig = SIGNAL_META[form.signal]
                  const isHovered = hoveredForm === `${cat.id}-${form.type}`
                  return (
                    <a
                      key={form.type}
                      href={edgarUrl(form.type)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`card ${isHovered ? 'card-hovered' : ''}`}
                      onMouseEnter={() => setHoveredForm(`${cat.id}-${form.type}`)}
                      onMouseLeave={() => setHoveredForm(null)}
                    >
                      <div className="card-top">
                        <div className="card-type">{form.label}</div>
                        <span
                          className="signal-badge"
                          style={{ color: sig.color, borderColor: sig.color + '44', background: sig.color + '12' }}
                        >
                          {sig.label}
                        </span>
                      </div>
                      <div className="card-desc">{form.description}</div>
                      <div className="card-tip">{form.tip}</div>
                      <div className="card-footer">
                        <span className="card-link">Open in EDGAR ↗</span>
                      </div>
                    </a>
                  )
                })}
              </div>
            </section>
          ))}
        </main>
      </div>
    </div>
  )
}

export default App

