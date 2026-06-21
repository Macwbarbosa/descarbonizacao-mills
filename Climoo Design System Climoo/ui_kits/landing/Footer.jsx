// Dark multi-column footer with offices, nav links, and social icons.

function Footer() {
  const linkStyle = {
    color: '#fff', textDecoration: 'none',
    fontFamily: 'var(--climoo-font-body)', fontSize: 15,
  };
  const colLabel = {
    fontFamily: 'var(--climoo-font-heading)',
    fontSize: 14, fontWeight: 700, color: '#9354E0', marginBottom: 20,
  };

  return (
    <footer style={{ background: '#1b0753' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '64px 64px 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 80, alignItems: 'flex-start' }}>
          <div style={{ display: 'flex', gap: 64, alignItems: 'flex-start' }}>
            <img src="../../assets/logos/horizontal-logo.png" alt="Climoo" style={{ height: 26, width: 'auto' }} />
            <div>
              <p style={colLabel}>Offices</p>
              <div style={{ display: 'flex', gap: 48 }}>
                {[
                  { name: 'Novale', lines: ['Rua Cesare Valentini, 200','Jaraguá do Sul/SC — Brasil','89254-193'] },
                  { name: 'Ágora Tech Park', lines: ['Rua Dona Francisca, 8300','Joinville/SC — Brasil','89219-600'] },
                ].map(o => (
                  <div key={o.name}>
                    <p style={{ color: '#fff', fontFamily: 'var(--climoo-font-heading)', fontSize: 14, fontWeight: 600, margin: '0 0 8px' }}>{o.name}</p>
                    {o.lines.map(l => (
                      <p key={l} style={{ color: 'rgba(255,255,255,0.55)', fontFamily: 'var(--climoo-font-body)', fontSize: 13, margin: '0 0 3px' }}>{l}</p>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 80 }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <p style={colLabel}>Institutional</p>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
                <li><a href="#" style={linkStyle}>About</a></li>
                <li><a href="#" style={linkStyle}>Insights</a></li>
              </ul>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <p style={colLabel}>Solutions</p>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
                <li><a href="#" style={linkStyle}>Emissions Inventory</a></li>
                <li><a href="#" style={linkStyle}>ESG Indicators</a></li>
                <li><a href="#" style={linkStyle}>Decarbonization Plan</a></li>
                <li><a href="#" style={linkStyle}>SBTi Targets</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div style={{
        maxWidth: 1280, margin: '0 auto', padding: '20px 64px 40px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        borderTop: '1px solid rgba(255,255,255,0.1)', gap: 16,
      }}>
        <p style={{ fontFamily: 'var(--climoo-font-body)', fontSize: 13, color: '#fff', margin: 0 }}>
          ©2026 Climoo Consultoria e Tecnologia Ltda. All rights reserved. CNPJ: 44.271.875/0001-01
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          {['whatsapp','instagram','linkedin','youtube'].map(s => (
            <a key={s} href="#" aria-label={s} style={{
              width: 36, height: 36, borderRadius: '50%',
              border: '1.5px solid rgba(255,255,255,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'rgba(255,255,255,0.75)', textDecoration: 'none',
            }}>
              {s === 'whatsapp' && <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.413c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.886-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.983zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.149-.173.198-.297.297-.495.099-.198.05-.371-.025-.52-.075-.149-.669-1.611-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01a1.094 1.094 0 0 0-.792.372c-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.486.71.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/></svg>}
              {s === 'instagram' && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>}
              {s === 'linkedin' && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>}
              {s === 'youtube' && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

window.Footer = Footer;
