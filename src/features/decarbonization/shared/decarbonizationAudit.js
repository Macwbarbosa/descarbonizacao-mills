/**
 * decarbonizationAudit
 * --------------------
 * Log de ALTERAÇÕES no Supabase. A cada salvamento (auto-save) compara o estado
 * anterior com o novo e registra QUEM, QUAL empresa, QUANDO e — o principal —
 * O QUE mudou, em frases legíveis (ex.: "Projeto X: Abrangência no tempo —
 * ano 2031 alterado para 60%"). Apenas leitura na UI (sem restaurar versões);
 * a consulta é liberada só para o ADMIN_EMAIL.
 */
import { supabase, hasSupabase } from '@/lib/supabaseClient';

const TABLE = 'decarbonization_audit';

/** E-mail autorizado a VISUALIZAR o log na interface. */
export const ADMIN_EMAIL = 'mac@climoo.com.br';

// ─── Diff semântico do JSON da empresa (buildCompanyExport) ──────────────────

const byId = (arr) => Object.fromEntries((arr || []).map((x) => [x.id, x]));
const byKey = (arr, key) => Object.fromEntries((arr || []).map((x) => [x[key], x]));
const num = (v) => Number(v) || 0;
const fmtPct = (v) => `${Math.round(num(v))}%`;
const fmtNum = (v) => num(v).toLocaleString('pt-BR', { maximumFractionDigits: 2 });
const setDiff = (a, b) => {
    const as = new Set(a || []);
    const bs = new Set(b || []);
    return {
        added: [...bs].filter((x) => !as.has(x)),
        removed: [...as].filter((x) => !bs.has(x)),
    };
};

const diffMetas = (prev, next, out) => {
    const aById = byId(prev?.metasPeriodo?.metas);
    const b = next?.metasPeriodo?.metas || [];
    const bById = byId(b);
    b.forEach((m) => { if (!aById[m.id]) out.push(`Meta "${m.name}" criada`); });
    (prev?.metasPeriodo?.metas || []).forEach((m) => { if (!bById[m.id]) out.push(`Meta "${m.name}" removida`); });
    b.forEach((nm) => {
        const om = aById[nm.id];
        if (!om) return;
        const name = nm.name || om.name;
        if (om.name !== nm.name) out.push(`Meta "${om.name}" renomeada para "${nm.name}"`);
        if (JSON.stringify(om.scopes) !== JSON.stringify(nm.scopes)) out.push(`Meta "${name}": escopos cobertos alterados`);
        if (om.type !== nm.type) out.push(`Meta "${name}": tipo alterado para ${nm.type}`);
        if (om.ambition !== nm.ambition) out.push(`Meta "${name}": ambição alterada para ${nm.ambition}`);
        if (om.nearTermYear !== nm.nearTermYear) out.push(`Meta "${name}": ano near-term alterado para ${nm.nearTermYear}`);
        if (om.netZeroYear !== nm.netZeroYear) out.push(`Meta "${name}": ano net-zero alterado para ${nm.netZeroYear ?? '—'}`);
        const cd = setDiff(om.excludedActivityIds, nm.excludedActivityIds);
        if (cd.added.length || cd.removed.length) out.push(`Meta "${name}": cobertura de atividades alterada`);
    });
    const pa = prev?.metasPeriodo?.params || {};
    const pb = next?.metasPeriodo?.params || {};
    if (pa.baseYear !== pb.baseYear) out.push(`Plano: ano-base alterado para ${pb.baseYear}`);
    if (pa.recentYear !== pb.recentYear) out.push(`Plano: ano mais recente alterado para ${pb.recentYear}`);
    if (pa.netZeroYear !== pb.netZeroYear) out.push(`Plano: horizonte net-zero alterado para ${pb.netZeroYear}`);
};

const diffInventory = (prev, next, out) => {
    const a = prev?.inventario?.atividades || [];
    const b = next?.inventario?.atividades || [];
    const aById = byId(a);
    const bById = byId(b);
    const added = b.filter((x) => !aById[x.id]).length;
    const removed = a.filter((x) => !bById[x.id]).length;
    if (added) out.push(`Inventário: ${added} atividade(s) adicionada(s)`);
    if (removed) out.push(`Inventário: ${removed} atividade(s) removida(s)`);
    b.forEach((nx) => {
        const ox = aById[nx.id];
        if (!ox) return;
        if (num(ox.emission) !== num(nx.emission)) out.push(`Inventário: "${nx.name}" — emissão alterada para ${fmtNum(nx.emission)} tCO2e`);
        if (ox.name !== nx.name) out.push(`Inventário: atividade renomeada para "${nx.name}"`);
        if (ox.scope !== nx.scope) out.push(`Inventário: "${nx.name}" — escopo alterado para ${nx.scope}`);
        if (ox.category !== nx.category) out.push(`Inventário: "${nx.name}" — categoria alterada para ${nx.category}`);
    });
};

const diffDrivers = (prev, next, out) => {
    const aById = byId(prev?.variaveisCrescimento?.drivers);
    const b = next?.variaveisCrescimento?.drivers || [];
    const bById = byId(b);
    b.forEach((d) => { if (!aById[d.id]) out.push(`Variável de crescimento "${d.name}" criada`); });
    (prev?.variaveisCrescimento?.drivers || []).forEach((d) => { if (!bById[d.id]) out.push(`Variável de crescimento "${d.name}" removida`); });
    b.forEach((nd) => {
        const od = aById[nd.id];
        if (!od) return;
        const name = nd.name || od.name;
        if (od.name !== nd.name) out.push(`Variável "${od.name}" renomeada para "${nd.name}"`);
        if (od.method !== nd.method) out.push(`Variável "${name}": método de projeção alterado`);
        if (num(od.baseValue) !== num(nd.baseValue)) out.push(`Variável "${name}": valor base alterado para ${fmtNum(nd.baseValue)}`);
        if (num(od.avgRate) !== num(nd.avgRate)) out.push(`Variável "${name}": taxa média alterada para ${fmtNum(nd.avgRate)}%`);
        if (JSON.stringify(od.yearly) !== JSON.stringify(nd.yearly)) out.push(`Variável "${name}": valores ano-a-ano alterados`);
        if (JSON.stringify(od.segments) !== JSON.stringify(nd.segments)) out.push(`Variável "${name}": segmentos de crescimento alterados`);
    });
};

const diffBau = (prev, next, out) => {
    const a = prev?.bau || {};
    const b = next?.bau || {};
    if (a.anoAlvo !== b.anoAlvo) out.push(`Projeção BAU: ano-alvo alterado para ${b.anoAlvo}`);
    const av = a.vinculos || {};
    const bv = b.vinculos || {};
    const keys = new Set([...Object.keys(av), ...Object.keys(bv)]);
    let changed = 0;
    keys.forEach((k) => { if (JSON.stringify(av[k]) !== JSON.stringify(bv[k])) changed += 1; });
    if (changed) out.push(`Projeção BAU: ${changed} vínculo(s) atividade↔driver alterado(s)`);
};

const FIN_LABELS = { capex: 'CAPEX', opex: 'OPEX (a.a.)', revenues: 'Receitas', savings: 'Economias', lifetimeYears: 'Vida útil (anos)', currency: 'Moeda' };

const diffCoverage = (a, b, projName, out) => {
    const aByYear = Object.fromEntries((a || []).map((p) => [p.year, p.pct]));
    const bByYear = Object.fromEntries((b || []).map((p) => [p.year, p.pct]));
    const years = new Set([...Object.keys(aByYear), ...Object.keys(bByYear)]);
    years.forEach((y) => {
        const av = aByYear[y];
        const bv = bByYear[y];
        if (av === undefined && bv !== undefined) out.push(`Projeto "${projName}": Abrangência no tempo — ano ${y} definido em ${fmtPct(bv)}`);
        else if (av !== undefined && bv === undefined) out.push(`Projeto "${projName}": Abrangência no tempo — ano ${y} removido`);
        else if (num(av) !== num(bv)) out.push(`Projeto "${projName}": Abrangência no tempo — ano ${y} alterado para ${fmtPct(bv)}`);
    });
};

const diffFinance = (a, b, projName, out) => {
    const af = a || {};
    const bf = b || {};
    Object.keys(FIN_LABELS).forEach((k) => {
        if (String(af[k] ?? '') !== String(bf[k] ?? '')) {
            const val = k === 'currency' ? bf[k] : fmtNum(bf[k]);
            out.push(`Projeto "${projName}": ${FIN_LABELS[k]} alterado para ${val}`);
        }
    });
};

const diffProjects = (prev, next, out) => {
    const a = prev?.projetos?.projetos || [];
    const b = next?.projetos?.projetos || [];
    const aById = byId(a);
    const bById = byId(b);
    b.forEach((p) => { if (!aById[p.id]) out.push(`Projeto "${p.name}" criado`); });
    a.forEach((p) => { if (!bById[p.id]) out.push(`Projeto "${p.name}" removido`); });
    b.forEach((np) => {
        const op = aById[np.id];
        if (!op) return;
        const name = np.name || op.name || 'sem nome';
        if (op.name !== np.name) out.push(`Projeto "${op.name}" renomeado para "${np.name}"`);
        if (op.initiativeId !== np.initiativeId) out.push(`Projeto "${name}": iniciativa alterada`);
        if (op.startYear !== np.startYear || op.endYear !== np.endYear) out.push(`Projeto "${name}": período alterado para ${np.startYear}–${np.endYear}`);
        const md = setDiff(op.metaIds, np.metaIds);
        if (md.added.length || md.removed.length) out.push(`Projeto "${name}": metas vinculadas alteradas`);
        const ad = setDiff(op.memberActivityIds, np.memberActivityIds);
        if (ad.added.length) out.push(`Projeto "${name}": ${ad.added.length} atividade(s) adicionada(s) ao grupo`);
        if (ad.removed.length) out.push(`Projeto "${name}": ${ad.removed.length} atividade(s) removida(s) do grupo`);
        diffCoverage(op.coveragePoints, np.coveragePoints, name, out);
        diffFinance(op.finance, np.finance, name, out);
    });
};

const diffScenarios = (prev, next, out) => {
    const a = prev?.cenarios?.cenarios || [];
    const b = next?.cenarios?.cenarios || [];
    const aById = byId(a);
    const bById = byId(b);
    b.forEach((s) => { if (!aById[s.id]) out.push(`Cenário "${s.name}" criado`); });
    a.forEach((s) => { if (!bById[s.id]) out.push(`Cenário "${s.name}" removido`); });
    b.forEach((ns) => {
        const os = aById[ns.id];
        if (!os) return;
        const name = ns.name || os.name;
        if (os.name !== ns.name) out.push(`Cenário "${os.name}" renomeado para "${ns.name}"`);
        const oItems = byKey(os.items, 'projetoId');
        const nItems = byKey(ns.items, 'projetoId');
        Object.keys(nItems).forEach((pid) => { if (!oItems[pid]) out.push(`Cenário "${name}": projeto adicionado`); });
        Object.keys(oItems).forEach((pid) => { if (!nItems[pid]) out.push(`Cenário "${name}": projeto removido`); });
        Object.keys(nItems).forEach((pid) => {
            if (oItems[pid] && oItems[pid].included !== nItems[pid].included) {
                out.push(`Cenário "${name}": projeto ${nItems[pid].included ? 'ativado' : 'desativado'}`);
            }
        });
    });
};

/**
 * Lista de frases legíveis descrevendo o que mudou entre dois snapshots da
 * empresa (objetos de buildCompanyExport, sem timestamps). Limitado para não
 * gerar registros gigantes.
 * @returns {string[]}
 */
export const describeChanges = (prev, next) => {
    if (!prev || !next) return [];
    const out = [];
    try {
        diffMetas(prev, next, out);
        diffInventory(prev, next, out);
        diffDrivers(prev, next, out);
        diffBau(prev, next, out);
        diffProjects(prev, next, out);
        diffScenarios(prev, next, out);
    } catch (e) {
        /* diff best-effort — nunca quebra o salvamento */
    }
    const MAX = 60;
    if (out.length > MAX) return [...out.slice(0, MAX), `… e mais ${out.length - MAX} alteração(ões)`];
    return out;
};

// ─── Persistência do log ─────────────────────────────────────────────────────

/** Registra um evento de salvamento com a lista de alterações (fire-and-forget). */
export const logSave = async ({ cnpj, empresa, email, changes }) => {
    if (!hasSupabase) return;
    try {
        await supabase.from(TABLE).insert({
            cnpj: cnpj || null,
            empresa: empresa || null,
            user_email: email || null,
            action: 'save',
            changes: Array.isArray(changes) ? changes : [],
        });
    } catch (e) {
        /* silencioso — o log não pode atrapalhar o salvamento */
    }
};

/** Lê os eventos mais recentes (opcionalmente filtrando por CNPJ). */
export const fetchAudit = async ({ cnpj, limit = 300 } = {}) => {
    if (!hasSupabase) return [];
    try {
        let q = supabase.from(TABLE).select('*').order('created_at', { ascending: false }).limit(limit);
        if (cnpj) q = q.eq('cnpj', cnpj);
        const { data, error } = await q;
        if (error) return [];
        return data || [];
    } catch (e) {
        return [];
    }
};

export default { ADMIN_EMAIL, describeChanges, logSave, fetchAudit };
