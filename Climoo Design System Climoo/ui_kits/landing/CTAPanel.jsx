// Bottom CTA card. Sits in a half-and-half background (light → dark) so it
// straddles the page-to-footer boundary.

function CTAPanel({ onCTAClick }) {
  return (
    <section style={{ background: 'linear-gradient(to bottom, #E4EBF0 50%, #1b0753 50%)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
        <div style={{
          background: 'linear-gradient(120deg, #7c3aed 0%, #3b0764 100%)',
          borderRadius: 28, position: 'relative', overflow: 'hidden',
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          alignItems: 'stretch', minHeight: 320,
        }}>
          <div aria-hidden style={{
            position: 'absolute', right: '10%', bottom: -240,
            width: 420, height: 420, borderRadius: '50%',
            background: 'rgba(139, 92, 246, 0.45)', pointerEvents: 'none',
          }} />
          <div style={{
            padding: '56px 48px 56px 56px',
            position: 'relative', zIndex: 1,
            display: 'flex', flexDirection: 'column', justifyContent: 'center',
          }}>
            <h2 style={{
              fontFamily: 'var(--climoo-font-heading)',
              fontSize: 'clamp(1.75rem, 2.8vw, 2.5rem)',
              fontWeight: 600, color: '#fff',
              margin: '0 0 32px', lineHeight: 1.2, maxWidth: 420,
            }}>Ready to simplify your sustainability management?</h2>
            <div style={{ alignSelf: 'flex-start' }}>
              <Button variant="primary" onClick={onCTAClick}>Schedule a demo</Button>
            </div>
          </div>
          <div style={{
            position: 'relative', display: 'flex',
            alignItems: 'flex-end', justifyContent: 'center', zIndex: 1,
          }}>
            <img src="../../assets/cta-image.png" alt=""
              style={{ height: 360, maxHeight: '100%', objectFit: 'contain', objectPosition: 'bottom center', display: 'block' }} />
          </div>
        </div>
      </div>
    </section>
  );
}

window.CTAPanel = CTAPanel;
