// Compliance / frameworks row that anchors the brand's trust position.

function StandardsBar() {
  const standards = ['ghg.png', 'cdp.png', 'tcfd.png', 'ifrs.png'];
  return (
    <section style={{ background: '#E4EBF0', padding: '24px 0 80px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
        <div style={{
          background: '#fff', borderRadius: 20,
          padding: '32px 40px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          gap: 32, flexWrap: 'wrap',
          boxShadow: '0 5px 28px rgba(0,0,0,0.06)',
        }}>
          <div style={{
            fontFamily: 'var(--climoo-font-heading)',
            fontSize: 14, fontWeight: 700, color: '#210856',
            lineHeight: 1.3, letterSpacing: '0.04em', textTransform: 'uppercase',
            maxWidth: 240,
          }}>
            Comply with national<br />and international standards
          </div>
          {standards.map(s => (
            <img key={s} src={`../../assets/standards/${s}`} alt=""
              style={{ height: 48, width: 'auto', maxWidth: 140, objectFit: 'contain' }} />
          ))}
        </div>
      </div>
    </section>
  );
}

window.StandardsBar = StandardsBar;
