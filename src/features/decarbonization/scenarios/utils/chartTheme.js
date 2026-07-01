import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * chartTheme
 * ----------
 * Paleta de cores dos gráficos de Cenários. Padrão Climoo, mas o usuário pode
 * escolher as próprias cores (persistido no navegador). São 4 cores-chave das
 * quais cada gráfico deriva seus gradientes:
 *   primary   — roxo (BAU/base, MACC incluído, linha do cenário/BAU)
 *   secondary — ciano (resultado/meta nas barras, MACC oportunidade)
 *   meta      — coral (linha/alvo da meta)
 *   compare   — violeta claro (cenários comparados)
 */

export const DEFAULT_PALETTE = { primary: '#7C5CE0', secondary: '#38C6F4', meta: '#F88A7E', compare: '#C4B5FD' };

export const PALETTE_PRESETS = [
    { key: 'climoo', name: 'Climoo (padrão)', palette: DEFAULT_PALETTE },
    { key: 'oceano', name: 'Oceano', palette: { primary: '#2563EB', secondary: '#06B6D4', meta: '#F59E0B', compare: '#93C5FD' } },
    { key: 'floresta', name: 'Floresta', palette: { primary: '#0E7C66', secondary: '#84CC16', meta: '#EF4444', compare: '#A7F3D0' } },
    { key: 'ardosia', name: 'Ardósia', palette: { primary: '#475569', secondary: '#0EA5E9', meta: '#F97316', compare: '#CBD5E1' } },
    { key: 'vibrante', name: 'Vibrante', palette: { primary: '#7C3AED', secondary: '#EC4899', meta: '#F59E0B', compare: '#DDD6FE' } },
];

export const PALETTE_LABELS = {
    primary: 'Primária (BAU / base)',
    secondary: 'Secundária (resultado / cenário)',
    meta: 'Meta (alvo)',
    compare: 'Comparação',
};

// ─── Helpers de cor ──────────────────────────────────────────────────────────

const clamp = (v) => Math.max(0, Math.min(255, Math.round(v)));
export const hexToRgb = (hex) => {
    const h = String(hex || '#000000').replace('#', '');
    const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
    const n = parseInt(full, 16) || 0;
    return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
};
const rgbToHex = ({ r, g, b }) => `#${[r, g, b].map((x) => clamp(x).toString(16).padStart(2, '0')).join('')}`;
export const mix = (a, b, t) => {
    const A = hexToRgb(a);
    const B = hexToRgb(b);
    return rgbToHex({ r: A.r + (B.r - A.r) * t, g: A.g + (B.g - A.g) * t, b: A.b + (B.b - A.b) * t });
};
export const lighten = (hex, t) => mix(hex, '#ffffff', t);
export const darken = (hex, t) => mix(hex, '#000000', t);
/** Gradiente vertical g2plot (de baixo p/ cima) a partir de UMA cor. */
export const toGradient = (hex) => `l(90) 0:${darken(hex, 0.14)} 1:${lighten(hex, 0.08)}`;

const useChartTheme = create(
    persist(
        (set) => ({
            palette: { ...DEFAULT_PALETTE },
            setColor: (key, value) => set((s) => ({ palette: { ...s.palette, [key]: value } })),
            setPalette: (palette) => set({ palette: { ...DEFAULT_PALETTE, ...palette } }),
            reset: () => set({ palette: { ...DEFAULT_PALETTE } }),
        }),
        { name: 'climoo-chart-theme' }
    )
);

export default useChartTheme;
