/**
 * chartPng
 * --------
 * Baixa como PNG o conteúdo renderizado de um container de gráfico, de forma
 * robusta: se houver <canvas> (g2plot), exporta direto do canvas; senão, se
 * houver <svg> (MACC), rasteriza num canvas com fundo branco.
 */
export const downloadChartPng = (el, name) => {
    if (!el) return;
    const filename = name || 'grafico.png';

    const canvas = el.querySelector('canvas');
    if (canvas) {
        try {
            const a = document.createElement('a');
            a.href = canvas.toDataURL('image/png');
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            a.remove();
            return;
        } catch (e) {
            /* cai para o caminho de SVG abaixo */
        }
    }

    const svg = el.querySelector('svg');
    if (!svg) return;
    const vb = svg.viewBox?.baseVal;
    const w = vb && vb.width ? vb.width : svg.clientWidth || 880;
    const h = vb && vb.height ? vb.height : svg.clientHeight || 320;
    const xml = new XMLSerializer().serializeToString(svg);
    const src = `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(xml)))}`;
    const img = new Image();
    img.onload = () => {
        const scale = 2;
        const c = document.createElement('canvas');
        c.width = w * scale;
        c.height = h * scale;
        const ctx = c.getContext('2d');
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, c.width, c.height);
        ctx.drawImage(img, 0, 0, c.width, c.height);
        const a = document.createElement('a');
        a.href = c.toDataURL('image/png');
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
    };
    img.src = src;
};

export default { downloadChartPng };
