import React, { useId, useMemo, useRef, useState, forwardRef, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';
import { Empty } from 'antd';
import { DEFAULT_PALETTE, lighten, darken } from '../utils/chartTheme';
import { downloadChartPng } from '../utils/chartPng';

const fmtTon = (v) => `${Number(v).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} tCO2e`;
const fmtCost = (v) => `R$ ${Number(v).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}/tCO2e`;
const fmtTick = (v) => Number(v).toLocaleString('pt-BR', { maximumFractionDigits: 0 });

/**
 * Curva de custo marginal de abatimento (MACC): projetos ordenados por custo
 * (R$/tCO₂e); largura = potencial de abatimento. Clicar liga/desliga o projeto
 * no cenário. Cores derivadas da paleta: incluído = primária, oportunidade =
 * secundária, degradê vertical.
 */
const MaccChart = forwardRef(({ rows, onToggle, palette }, downloadRef) => {
    const uid = useId().replace(/[:]/g, '');
    const purpleId = `maccPurple-${uid}`;
    const cyanId = `maccCyan-${uid}`;
    const shadowId = `maccShadow-${uid}`;

    const P = palette || DEFAULT_PALETTE;
    const PURPLE = P.primary;
    const CYAN = P.secondary;
    const purpleTop = lighten(P.primary, 0.14);
    const purpleBottom = darken(P.primary, 0.14);
    const cyanTop = lighten(P.secondary, 0.14);
    const cyanBottom = darken(P.secondary, 0.14);

    const containerRef = useRef(null);
    const [hover, setHover] = useState(null); // { bar, x, y }

    // Exporta o SVG do MACC como PNG (rasteriza num canvas com fundo branco).
    useImperativeHandle(downloadRef, () => ({
        downloadPNG: (name) => downloadChartPng(containerRef.current, name),
    }));

    const { bars, ticks, W, H, pad, zeroY } = useMemo(() => {
        const width = 880;
        const height = 320;
        const padding = { l: 70, r: 16, t: 34, b: 40 };
        const plotW = width - padding.l - padding.r;
        const plotH = height - padding.t - padding.b;

        const totalPot = rows.reduce((t, r) => t + Math.max(0, r.potential), 0);
        const maxPos = Math.max(10, ...rows.map((r) => r.costPerTon).filter((c) => c > 0), 0);
        const maxNeg = Math.max(10, ...rows.map((r) => -r.costPerTon).filter((c) => c > 0), 0);
        const span = maxPos + maxNeg || 1;
        const zero = padding.t + (maxPos / span) * plotH;
        const yOf = (cost) => zero - (cost / span) * plotH;

        let cx = padding.l;
        const computed = rows.map((r) => {
            const w = totalPot > 0 ? (Math.max(0, r.potential) / totalPot) * plotW : 0;
            const top = r.costPerTon >= 0 ? yOf(r.costPerTon) : zero;
            const h = Math.abs(yOf(r.costPerTon) - zero);
            const bar = { ...r, x: cx, w, top, h };
            cx += w;
            return bar;
        });

        const tickValues = [maxPos, maxPos / 2, 0, -maxNeg / 2, -maxNeg].map((v) => ({ v, y: yOf(v) }));

        return { bars: computed, ticks: tickValues, W: width, H: height, pad: padding, zeroY: zero };
    }, [rows]);

    if (!rows.length) return <Empty description="Sem projetos no cenário para o MACC." />;

    // Tooltip segue o mouse (coordenadas relativas ao container), desviando da borda direita.
    const handleMove = (bar) => (e) => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (!rect) return;
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setHover({ bar, x: x + 14 + 260 > rect.width ? x - 274 : x + 14, y: Math.max(4, y - 56) });
    };

    return (
        <div ref={containerRef} style={{ position: 'relative' }}>
            <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 'auto', display: 'block' }}>
                <defs>
                    <linearGradient id={purpleId} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0" stopColor={purpleTop} />
                        <stop offset="1" stopColor={purpleBottom} />
                    </linearGradient>
                    <linearGradient id={cyanId} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0" stopColor={cyanTop} />
                        <stop offset="1" stopColor={cyanBottom} />
                    </linearGradient>
                    <filter id={shadowId} x="-20%" y="-20%" width="140%" height="140%">
                        <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#4C1D95" floodOpacity="0.25" />
                    </filter>
                </defs>

                {/* Título do eixo */}
                <text x={pad.l - 56} y={pad.t - 14} fontSize={12} fontWeight={600} fill="#6B7280">
                    R$ / tCO₂e
                </text>

                {/* Gridlines + ticks */}
                {ticks.map((t) => (
                    <g key={`tick-${t.v}`}>
                        <line x1={pad.l} y1={t.y} x2={W - pad.r} y2={t.y} stroke="#D1D5DB" strokeDasharray="4 6" strokeWidth={t.v === 0 ? 0 : 1} />
                        <text x={pad.l - 8} y={t.y + 4} textAnchor="end" fontSize={11} fill="#6B7280">
                            {fmtTick(t.v)}
                        </text>
                    </g>
                ))}

                {/* Linha zero */}
                <line x1={pad.l} y1={zeroY} x2={W - pad.r} y2={zeroY} stroke="#6B7280" strokeWidth={1.5} />

                {/* Barras */}
                {bars.map((b) => (
                    <g key={b.projectId} style={{ cursor: 'pointer' }} onClick={() => onToggle(b.projectId)}>
                        <rect
                            x={b.x + 1}
                            y={Math.abs(b.h) < 2 ? zeroY - 2 : b.top}
                            width={Math.max(2, b.w - 2)}
                            height={Math.max(3, b.h)}
                            rx={3}
                            fill={b.included ? `url(#${purpleId})` : `url(#${cyanId})`}
                            filter={`url(#${shadowId})`}
                            opacity={hover && hover.bar.projectId !== b.projectId ? 0.55 : 1}
                            onMouseMove={handleMove(b)}
                            onMouseLeave={() => setHover(null)}
                        />
                    </g>
                ))}

                <text x={W - pad.r} y={H - 6} textAnchor="end" fontSize={10} fill="#9CA3AF">
                    largura = potencial de abatimento · ordenado por custo · clique para incluir/remover
                </text>
            </svg>

            {/* Tooltip (estilo g2plot) */}
            {hover && (
                <div
                    style={{
                        position: 'absolute',
                        left: hover.x,
                        top: hover.y,
                        width: 260,
                        pointerEvents: 'none',
                        background: '#FFFFFF',
                        borderRadius: 8,
                        boxShadow: '0 6px 16px rgba(31, 36, 48, 0.18)',
                        padding: '10px 12px',
                        fontSize: 12,
                        color: '#374151',
                        zIndex: 10,
                    }}
                >
                    <div style={{ fontWeight: 700, color: '#210856', marginBottom: 6 }}>{hover.bar.name}</div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                        <span>Custo marginal</span>
                        <b>{fmtCost(hover.bar.costPerTon)}</b>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                        <span>Potencial de abatimento</span>
                        <b>{fmtTon(hover.bar.potential)}</b>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#6B7280' }}>
                        <span
                            style={{
                                width: 9,
                                height: 9,
                                borderRadius: '50%',
                                background: hover.bar.included ? PURPLE : CYAN,
                                display: 'inline-block',
                            }}
                        />
                        {hover.bar.included ? 'No portfólio · clique para remover' : 'Oportunidade · clique para incluir'}
                    </div>
                </div>
            )}
        </div>
    );
});

MaccChart.displayName = 'MaccChart';

MaccChart.propTypes = {
    rows: PropTypes.arrayOf(PropTypes.object).isRequired, // eslint-disable-line react/forbid-prop-types
    onToggle: PropTypes.func.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    palette: PropTypes.object,
};

MaccChart.defaultProps = { palette: null };

export default MaccChart;
