// Marquee-style trusted client logo strip.

function TrustedBy() {
  const logos = [
    'eurofarma.png', 'movida.png', 'mills.png', 'rd-saude.png', 'special-dog.png',
    'company-1.png', 'company-2.png', 'company-3.png', 'company-4.png',
  ];
  return (
    <section style={{ background: '#E4EBF0', padding: '64px 0 48px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
        <div style={{
          fontFamily: 'var(--climoo-font-heading)',
          fontSize: 14, fontWeight: 700, letterSpacing: '0.08em',
          textTransform: 'uppercase', color: '#210856',
          textAlign: 'center', marginBottom: 32,
        }}>
          Companies that trust Climoo
        </div>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          gap: 32, flexWrap: 'wrap',
        }}>
          {logos.map(l => (
            <img key={l} src={`../../assets/clients/${l}`} alt=""
              style={{ height: 36, width: 'auto', maxWidth: 130, objectFit: 'contain', opacity: 0.85 }} />
          ))}
        </div>
      </div>
    </section>
  );
}

window.TrustedBy = TrustedBy;
