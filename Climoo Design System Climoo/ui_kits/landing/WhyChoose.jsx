// Three feature cards on white surface. Stroked Lucide-style icons in purple.

function IconShield() {
  return (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      <path d="m9 12 2 2 4-4"/>
    </svg>
  );
}
function IconClipboard() {
  return (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="4" y="4" width="16" height="18" rx="2"/>
      <path d="M9 4V2h6v2"/>
      <path d="m9 14 2 2 4-4"/>
    </svg>
  );
}
function IconGlobe() {
  return (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="10"/><path d="M2 12h20"/>
      <path d="M12 2a15 15 0 0 1 0 20"/><path d="M12 2a15 15 0 0 0 0 20"/>
    </svg>
  );
}

const CARDS = [
  { Icon: IconShield, title: 'Certified\nprofessionals' },
  { Icon: IconClipboard, title: 'Auditable\ntechnology' },
  { Icon: IconGlobe, title: 'Global\ncompliance' },
];

function WhyChoose() {
  return (
    <section style={{ background: '#fff', padding: '132px 0' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
        <div style={{ marginBottom: 48, maxWidth: 600 }}>
          <h2 style={{
            fontFamily: 'var(--climoo-font-heading)',
            fontSize: 'clamp(1.75rem, 3vw, 2.75rem)',
            fontWeight: 700, color: '#111827', margin: '0 0 16px', lineHeight: 1.2,
          }}>Why choose Climoo?</h2>
          <p style={{
            fontFamily: 'var(--climoo-font-body)',
            fontSize: 16, color: '#6b7280', margin: 0, lineHeight: 1.65,
          }}>Our platform offers everything your company needs for efficient and compliant climate management.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {CARDS.map(({ Icon, title }) => (
            <div key={title} style={{
              background: '#f3f4f6', borderRadius: 20,
              padding: '40px 32px', minHeight: 280,
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
            }}>
              <Icon />
              <p style={{
                fontFamily: 'var(--climoo-font-heading)',
                fontSize: 20, fontWeight: 700, color: '#111827',
                lineHeight: 1.3, margin: 0, width: '70%',
                whiteSpace: 'pre-line',
              }}>{title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

window.WhyChoose = WhyChoose;
