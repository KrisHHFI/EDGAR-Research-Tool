export default function Header() {
  return (
    <header className="sticky top-0 z-[100] bg-[#0a0d13]/[0.92] backdrop-blur-md border-b border-[#1f2937]">
      <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-[14px]">
          <span className="inline-flex items-center justify-center w-[42px] h-[42px] rounded-[10px] bg-linear-to-br from-blue-700 to-blue-500 font-black text-[13px] tracking-[0.5px] text-white shrink-0 shadow-[0_2px_12px_rgba(59,130,246,0.35)]">
            SEC
          </span>
          <div>
            <h1 className="text-[1.1rem] font-bold text-[#e2e8f0] leading-tight">EDGAR Filing Dashboard</h1>
            <p className="text-[0.78rem] text-[#8892a4] mt-px">Real-time SEC filings for retail investors</p>
          </div>
        </div>
        <a
          href="https://www.sec.gov/cgi-bin/browse-edgar?action=getcurrent"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-[18px] py-2 rounded-lg bg-linear-to-br from-blue-700 to-blue-500 text-white text-[0.85rem] font-semibold whitespace-nowrap shadow-[0_2px_10px_rgba(59,130,246,0.3)] hover:opacity-90 hover:-translate-y-px transition-all"
        >
          View Live Feed ↗
        </a>
      </div>
    </header>
  )
}
