const ITEMS = [
  { name: 'Helvetia',     sub: 'Versichert bis CHF 5 Mio.' },
  { name: 'EU Ecolabel',  sub: 'Zertifizierte Mittel' },
  { name: 'BDO Schweiz',  sub: 'Geprüfte Buchhaltung' },
  { name: 'allpura',      sub: 'Verband Schweizer Reinigung' },
  { name: 'SUVA',         sub: 'Konforme Arbeitssicherheit' },
];

export function TrustBar() {
  return (
    <div className="frost-light">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 trust-bar">
        <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-12 justify-between">
          <p className="font-mono text-[11px] text-[#6F6F6F] uppercase tracking-[0.14em] whitespace-nowrap">
            Vertrauen &amp; Zertifikate
          </p>
          <div className="flex flex-wrap items-center gap-x-10 gap-y-4">
            {ITEMS.map(it => (
              <div key={it.name} className="trust-logo">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" style={{ width: 22, height: 22 }}>
                  <path d="M12 2L3 7v6c0 5 4 8 9 9 5-1 9-4 9-9V7l-9-5z" strokeLinejoin="round" />
                  <path d="M8.5 12l2.5 2.5L16 9" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="font-display italic text-lg leading-none">{it.name}</span>
                <span className="hidden lg:inline font-mono text-[11px] uppercase tracking-wider" style={{ color: '#6F6F6F' }}>
                  · {it.sub}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
