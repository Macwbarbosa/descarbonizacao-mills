// Two-column block on page bg. Title + body left, photo right.

function WhoWeAre() {
  return (
    <section style={{ background: '#E4EBF0', padding: '132px 0' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 80, alignItems: 'center' }}>
          <div>
            <h2 style={{
              fontFamily: 'var(--climoo-font-heading)',
              fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
              fontWeight: 700, color: '#111827',
              margin: '0 0 24px', lineHeight: 1.2,
            }}>Who we are</h2>
            <p style={{
              fontFamily: 'var(--climoo-font-body)',
              fontSize: 16, color: '#6b7280', margin: 0, lineHeight: 1.65,
            }}>
              Climoo is a Brazilian technology and consulting company specializing in corporate sustainability. We built our own platform covering emissions inventory, decarbonization plans, SBTi targets, and supply chain management for companies that need reliable data and credible reporting. Our certified professionals bring real consulting experience and auditable technology built for sustainability from day one.
            </p>
          </div>
          <div style={{
            borderRadius: 24, overflow: 'hidden', aspectRatio: '4 / 3',
            boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
          }}>
            <img src="../../assets/agora.png" alt=""
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </div>
        </div>
      </div>
    </section>
  );
}

window.WhoWeAre = WhoWeAre;
