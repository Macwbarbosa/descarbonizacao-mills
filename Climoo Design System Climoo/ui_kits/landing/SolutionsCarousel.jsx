// Four gradient solution cards with the concentric-ring decorator pattern.
// Hover swaps a dimmed overlay + description.

const SOLUTIONS = [
  { key: 'inventory', title: 'Emissions\nInventory',
    desc: 'Build and manage GHG emissions inventories in a simplified way, reduce calculation errors and create automated processes.',
    gradient: 'linear-gradient(145deg, #7c3aed 0%, #4c1d95 60%, #3b0764 100%)',
    deco: 'rgba(139, 92, 246, 0.4)' },
  { key: 'esg', title: 'ESG Indicators\nManagement',
    desc: 'Create and manage sustainability indicators and targets, making reporting and governance easier.',
    gradient: 'linear-gradient(145deg, #5b21b6 0%, #3b0764 50%, #1e1b4b 100%)',
    deco: 'rgba(167, 139, 250, 0.25)' },
  { key: 'decarb', title: 'Decarbonization\nPlan',
    desc: 'Simplify the development and management of your climate strategy following international requirements.',
    gradient: 'linear-gradient(145deg, #67e8f9 0%, #22d3ee 40%, #06b6d4 100%)',
    deco: 'rgba(255,255,255,0.25)' },
  { key: 'sbti', title: 'SBTi Targets',
    desc: 'Climoo is your partner throughout the entire submission, approval and target management process.',
    gradient: 'linear-gradient(145deg, #c084fc 0%, #a855f7 50%, #7c3aed 100%)',
    deco: 'rgba(255,255,255,0.2)' },
];

function SolutionCard({ sol }) {
  const [hover, setHover] = React.useState(false);
  return (
    <a href="#" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        background: sol.gradient,
        borderRadius: 20,
        aspectRatio: '3/4',
        position: 'relative',
        overflow: 'hidden',
        textDecoration: 'none',
        display: 'block',
        cursor: 'pointer',
      }}
    >
      {/* Decorator rings */}
      <div aria-hidden style={{
        position: 'absolute', top: '-30%', right: '-20%', width: '150%',
        aspectRatio: 1, borderRadius: '50%',
        border: `1px solid ${sol.deco}`, pointerEvents: 'none',
      }} />
      <div aria-hidden style={{
        position: 'absolute', top: '-10%', right: '-40%', width: '130%',
        aspectRatio: 1, borderRadius: '50%',
        border: `1px solid ${sol.deco}`, pointerEvents: 'none',
      }} />

      {/* Default title */}
      <div style={{
        position: 'absolute', bottom: 36, left: 36, right: 36,
        opacity: hover ? 0 : 1,
        transform: hover ? 'translateY(6px)' : 'translateY(0)',
        transition: 'opacity 0.4s, transform 0.4s',
      }}>
        <p style={{
          fontFamily: 'var(--climoo-font-heading)',
          fontSize: 18, fontWeight: 600, color: '#fff', lineHeight: 1.3,
          margin: 0, whiteSpace: 'pre-line', width: '75%',
        }}>{sol.title}</p>
      </div>

      {/* Hover overlay */}
      <div style={{
        position: 'absolute', inset: 0, padding: 24,
        display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
        borderRadius: 20,
        background: hover ? 'rgba(0,0,0,0.45)' : 'rgba(0,0,0,0)',
        backdropFilter: hover ? 'blur(4px)' : 'blur(0px)',
        WebkitBackdropFilter: hover ? 'blur(4px)' : 'blur(0px)',
        opacity: hover ? 1 : 0,
        transition: 'opacity 0.5s, background 0.5s, backdrop-filter 0.5s',
      }}>
        <p style={{
          fontFamily: 'var(--climoo-font-heading)',
          fontSize: 18, fontWeight: 600, color: '#fff', lineHeight: 1.3,
          margin: '0 0 12px', whiteSpace: 'pre-line',
          transform: hover ? 'translateY(0)' : 'translateY(10px)',
          transition: 'transform 0.5s',
        }}>{sol.title}</p>
        <p style={{
          fontFamily: 'var(--climoo-font-body)',
          fontSize: 14, color: 'rgba(255,255,255,0.85)',
          lineHeight: 1.55, margin: 0,
          transform: hover ? 'translateY(0)' : 'translateY(10px)',
          transition: 'transform 0.5s 0.07s',
        }}>{sol.desc}</p>
      </div>
    </a>
  );
}

function SolutionsCarousel() {
  return (
    <section style={{ background: '#E4EBF0', padding: '96px 0 32px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <h2 style={{
            fontFamily: 'var(--climoo-font-heading)',
            fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
            fontWeight: 700, color: '#111827', margin: '0 0 12px',
          }}>Solutions</h2>
          <p style={{
            fontFamily: 'var(--climoo-font-body)',
            fontSize: 16, color: '#6b7280', margin: 0, lineHeight: 1.65,
          }}>Everything you need to manage your climate strategy in a single platform</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
          {SOLUTIONS.map(s => <SolutionCard key={s.key} sol={s} />)}
        </div>
      </div>
    </section>
  );
}

window.SolutionsCarousel = SolutionsCarousel;
window.SolutionCard = SolutionCard;
