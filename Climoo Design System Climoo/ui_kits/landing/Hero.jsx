// Home hero: the signature top-left purple blob, headline, subtitle, CTA, and
// the product image floating on a soft gradient card. Mirrors
// climoo-landing-page-main/app/home/components/HeroSection.tsx.

function Hero({ onCTAClick }) {
  const [loaded, setLoaded] = React.useState(false);
  React.useEffect(() => {
    const raf = requestAnimationFrame(() => setLoaded(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section style={{
      position: 'relative',
      minHeight: '100svh',
      overflow: 'hidden',
      paddingTop: 120,
      paddingBottom: 80,
    }}>
      {/* Hero blob — huge ellipse bleeding off the top-left */}
      <div aria-hidden style={{
        position: 'absolute',
        top: '-28vw', left: 'calc(-53vw + 12%)',
        width: 'calc(50vw + 64%)', height: 'calc(86vh + 40vw)',
        borderRadius: '50%',
        background: '#210856',
        zIndex: 0,
        opacity: loaded ? 1 : 0,
        transform: loaded ? 'translateY(0)' : 'translateY(-30px)',
        transition: 'opacity 1s ease-out, transform 1s ease-out',
      }} />

      <div style={{
        position: 'relative', zIndex: 1, maxWidth: 1280, margin: '0 auto',
        padding: '0 32px',
        display: 'grid', gridTemplateColumns: '48fr 52fr',
        gap: 64, alignItems: 'center',
      }}>
        {/* Left column — text */}
        <div style={{ padding: '0 16px' }}>
          <h1 style={{
            fontFamily: 'var(--climoo-font-heading)',
            fontWeight: 700,
            fontSize: 'clamp(2.25rem, 4vw, 3.75rem)',
            lineHeight: 1.1, color: '#fff', margin: '0 0 24px',
            opacity: loaded ? 1 : 0, transform: loaded ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 0.6s ease-out 0.1s, transform 0.6s ease-out 0.1s',
          }}>
            Create and manage<br />sustainability<br />indicators
          </h1>
          <p style={{
            fontFamily: 'var(--climoo-font-body)',
            fontSize: 17, lineHeight: 1.6,
            color: 'rgba(255,255,255,0.92)', maxWidth: 480, margin: '0 0 32px',
            opacity: loaded ? 1 : 0, transform: loaded ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.6s ease-out 0.25s, transform 0.6s ease-out 0.25s',
          }}>
            Simplify sustainability management with our integrated solutions for emissions inventory, ESG indicators, and decarbonization planning.
          </p>
          <div style={{
            opacity: loaded ? 1 : 0, transform: loaded ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.6s ease-out 0.4s, transform 0.6s ease-out 0.4s',
          }}>
            <Button variant="violet" onClick={onCTAClick}>Schedule a demo</Button>
          </div>
        </div>

        {/* Right column — product image on gradient card */}
        <div style={{
          position: 'relative',
          display: 'flex', justifyContent: 'center', alignItems: 'flex-end',
          minHeight: 520,
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.7s ease-out 0.2s',
        }}>
          <div style={{ position: 'relative' }}>
            {/* Gradient wash card behind the image */}
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              height: 'clamp(260px, 46vh, 420px)',
              borderRadius: 24,
              background: 'linear-gradient(to bottom left, rgba(147,84,224,0.5) 0%, #fff 50%)',
              boxShadow: '0 4px 16px rgba(0,0,0,0.07)',
              zIndex: 0,
            }} />
            {/* Product image */}
            <img src="../../assets/hero-image.png" alt="Climoo platform"
              style={{
                position: 'relative',
                height: 'clamp(310px, 52vh, 580px)',
                width: 'auto',
                display: 'block',
                filter: 'drop-shadow(0 12px 32px rgba(0,0,0,0.10))',
                zIndex: 1,
              }} />
            {/* Floating ring decoration */}
            <img src="../../assets/ring.png" alt="" aria-hidden
              style={{
                position: 'absolute', top: '80%', left: '-22%',
                width: '45%', height: 'auto', zIndex: 2, pointerEvents: 'none',
              }} />
            {/* Floating gauge + distribution */}
            <img src="../../assets/scope-3-gauge.png" alt="" aria-hidden
              style={{ position: 'absolute', top: '30%', right: '-40%', width: '70%', zIndex: 2, pointerEvents: 'none' }} />
            <img src="../../assets/emission-distribution.png" alt="" aria-hidden
              style={{ position: 'absolute', top: '50%', right: '-50%', width: '75%', zIndex: 2, pointerEvents: 'none' }} />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute', bottom: 32, left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
        opacity: loaded ? 1 : 0,
        transition: 'opacity 0.6s ease-out 1.5s',
      }}>
        <span style={{
          fontFamily: 'var(--climoo-font-body)', fontSize: 12, color: '#fff',
        }}>Scroll down</span>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden style={{ animation: 'climoo-bounce 2s infinite' }}>
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </div>
      <style>{`
        @keyframes climoo-bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-8px); }
          60% { transform: translateY(-4px); }
        }
      `}</style>
    </section>
  );
}

window.Hero = Hero;
