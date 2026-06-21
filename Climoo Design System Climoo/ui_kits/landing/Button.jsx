// Pill button — Climoo's single most-used component.
// Variants: primary (deep purple), violet (hero accent), secondary (white
// outline on light), ghost (outline on dark).

function Button({ variant = "primary", children, onClick, style, ...rest }) {
  const [hover, setHover] = React.useState(false);
  const base = {
    fontFamily: 'var(--climoo-font-body)',
    fontWeight: 500,
    fontSize: 16,
    height: 50,
    padding: '0 36px',
    borderRadius: 99,
    border: 'none',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    whiteSpace: 'nowrap',
    transition: 'background-color 0.2s, color 0.2s, transform 0.2s, box-shadow 0.2s',
  };
  const variants = {
    primary: {
      background: hover ? '#9354E0' : '#210856',
      color: '#fff',
    },
    violet: {
      background: hover ? '#fff' : '#9354E0',
      color: hover ? '#210856' : '#fff',
    },
    secondary: {
      background: hover ? '#210856' : 'transparent',
      color: hover ? '#fff' : '#210856',
      boxShadow: 'inset 0 0 0 1.5px #210856',
    },
    ghost: {
      background: hover ? 'rgba(255,255,255,0.12)' : 'transparent',
      color: '#fff',
      border: '2px solid rgba(255,255,255,0.6)',
    },
  };
  return (
    <button
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onClick}
      style={{ ...base, ...variants[variant], ...style }}
      {...rest}
    >
      {children}
    </button>
  );
}

window.Button = Button;
