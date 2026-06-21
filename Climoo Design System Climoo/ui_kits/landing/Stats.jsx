// Big counters on dark backdrop. Count-up animates when the element is
// scrolled into view.

function parseStat(value) {
  const m = value.match(/^(\d+)(.*)$/);
  if (!m) return { target: 0, suffix: value };
  return { target: parseInt(m[1], 10), suffix: m[2] };
}

function StatItem({ value, label }) {
  const { target, suffix } = parseStat(value);
  const ref = React.useRef(null);
  const [active, setActive] = React.useState(false);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setActive(true); io.disconnect(); }
    }, { threshold: 0.3 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  React.useEffect(() => {
    if (!active) return;
    let start = null;
    const duration = 1800;
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [active, target]);

  return (
    <div ref={ref}>
      <p style={{
        fontFamily: 'var(--climoo-font-heading)',
        fontSize: 'clamp(3rem, 5.5vw, 5rem)',
        fontWeight: 700, color: '#a855f7',
        margin: '0 0 12px', lineHeight: 1,
      }}>{active ? `${count}${suffix}` : value}</p>
      <p style={{
        fontFamily: 'var(--climoo-font-body)',
        fontSize: 14, color: '#e2e8f0',
        margin: 0, lineHeight: 1.5,
      }}>{label}</p>
    </div>
  );
}

function Stats() {
  const stats = [
    { value: '200+', label: 'Companies Served' },
    { value: '500+', label: 'Emissions Inventory' },
    { value: '100%', label: 'SBTi approved' },
    { value: '15',  label: 'Countries in operation' },
  ];
  return (
    <section style={{ background: '#1b0753', padding: '138px 0' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 64 }}>
          {stats.map(s => <StatItem key={s.value} {...s} />)}
        </div>
      </div>
    </section>
  );
}

window.Stats = Stats;
