/**
 * decarbonizationAudit
 * --------------------
 * Log simples de alterações no Supabase: a cada salvamento (auto-save) registra
 * QUEM (e-mail), QUAL empresa (CNPJ) e QUANDO. Apenas leitura/visualização —
 * sem restaurar versões. A consulta é liberada na UI só para o ADMIN_EMAIL.
 */
import { supabase, hasSupabase } from '@/lib/supabaseClient';

const TABLE = 'decarbonization_audit';

/** E-mail autorizado a VISUALIZAR o log na interface. */
export const ADMIN_EMAIL = 'mac@climoo.com.br';

/** Registra um evento de salvamento (fire-and-forget; nunca lança). */
export const logSave = async ({ cnpj, empresa, email }) => {
    if (!hasSupabase) return;
    try {
        await supabase.from(TABLE).insert({
            cnpj: cnpj || null,
            empresa: empresa || null,
            user_email: email || null,
            action: 'save',
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

export default { ADMIN_EMAIL, logSave, fetchAudit };
