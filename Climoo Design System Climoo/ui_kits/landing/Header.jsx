// Floating pill header. On hero pages the bg blob shows through and the pill
// is transparent; once the user scrolls past 50px it gains a translucent
// purple tint + backdrop blur + soft shadow.

function Header({ onCTAClick }) {
  const [scrolled, setScrolled] = React.useState(false);
  const [solutionsOpen, setSolutionsOpen] = React.useState(false);
  const [lang, setLang] = React.useState('EN');

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLink = {
    fontFamily: 'var(--climoo-font-body)',
    fontWeight: 500,
    fontSize: 16,
    color: '#fff',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: 0,
    display: 'inline-flex',
    alignItems: 'center',
    gap: 4,
    textDecoration: 'none',
  };

  const solutions = [
    { label: 'Emissions Inventory', desc: "Measure and manage all your company's GHG emissions" },
    { label: 'ESG Indicators Management', desc: 'Monitor and report your environmental and social indicators' },
    { label: 'Decarbonization Plan', desc: 'Set concrete goals and actions to reduce your emissions' },
    { label: 'SBTi Targets', desc: 'Science-aligned targets in line with the Paris Agreement' },
  ];

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0,
      padding: 16, display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 1000, pointerEvents: 'none',
    }}>
      <div style={{
        pointerEvents: 'auto',
        maxWidth: 1280, width: '100%', height: 72, borderRadius: 100,
        padding: '0 28px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: scrolled ? 'rgba(33, 8, 86, 0.6)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
        boxShadow: scrolled ? '0 4px 32px rgba(0, 0, 0, 0.3)' : 'none',
        transition: 'background-color 0.3s, box-shadow 0.3s, backdrop-filter 0.3s',
      }}>
        {/* Logo */}
        <a href="#" style={{ display: 'inline-flex', alignItems: 'center' }}>
          <img src="../../assets/logos/horizontal-logo.png" alt="Climoo"
               style={{ height: 28, width: 'auto' }} />
        </a>

        {/* Nav */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          <div
            style={{ position: 'relative' }}
            onMouseEnter={() => setSolutionsOpen(true)}
            onMouseLeave={() => setSolutionsOpen(false)}
          >
            <button style={navLink}>
              Solutions
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden><polyline points="6 9 12 15 18 9"/></svg>
            </button>
            {solutionsOpen && (
              <div style={{
                position: 'absolute', top: '100%', left: -24, marginTop: 8,
                minWidth: 320, padding: 16, borderRadius: 16,
                background: '#fff',
                boxShadow: '0 10px 40px rgba(0,0,0,0.18)',
                pointerEvents: 'auto',
              }}>
                {solutions.map((s) => (
                  <a key={s.label} href="#" style={{
                    display: 'block', padding: '14px 16px', borderRadius: 12,
                    textDecoration: 'none',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = '#f3f4f6'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    <div style={{ fontFamily: 'var(--climoo-font-heading)', fontSize: 15, fontWeight: 600, color: '#111827', lineHeight: 1.4 }}>{s.label}</div>
                    <div style={{ fontFamily: 'var(--climoo-font-body)', fontSize: 12, color: '#6b7280', marginTop: 3, lineHeight: 1.4 }}>{s.desc}</div>
                  </a>
                ))}
              </div>
            )}
          </div>
          <a href="#" style={navLink}>About</a>
          <a href="#" style={navLink}>Insights</a>
        </nav>

        {/* Right side: language + CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button
            onClick={() => setLang(lang === 'EN' ? 'PT' : lang === 'PT' ? 'ES' : 'EN')}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              background: 'none', border: 'none', cursor: 'pointer',
              color: '#fff', fontFamily: 'var(--climoo-font-body)',
              fontSize: 14, fontWeight: 500, opacity: 0.85,
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15 15 0 0 1 0 20"/><path d="M12 2a15 15 0 0 0 0 20"/>
            </svg>
            {lang}
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden><polyline points="6 9 12 15 18 9"/></svg>
          </button>
          <Button variant="primary" onClick={onCTAClick}>Schedule a demo</Button>
        </div>
      </div>
    </header>
  );
}

window.Header = Header;
