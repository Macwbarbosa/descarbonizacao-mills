/**
 * Credenciais do gate de acesso (login "fake", client-side).
 * -----------------------------------------------------------
 * ATENÇÃO: isto NÃO é segurança real — as credenciais ficam no bundle do
 * navegador e servem apenas para restringir o acesso casual à demonstração.
 * Para autenticação de verdade, use o Supabase Auth.
 *
 * Para alterar: edite o mapa de e-mail → senha abaixo (uma senha por usuário).
 */

/** Usuários autorizados: e-mail (em minúsculas) → senha. */
export const USERS = {
    'psleal@mills.com.br': 'M6N9n57Ea6Qw7U',
    'monique.cesila@mills.com.br': 'SnY6xZE3genivX',
    'mac@climoo.com.br': 'CCxxQB5pWQu9nN',
};

/** E-mails autorizados (derivado de USERS). */
export const ALLOWED_EMAILS = Object.keys(USERS);

/** Valida um par e-mail/senha. Retorna o e-mail normalizado se válido, senão null. */
export const checkCredentials = (email, password) => {
    const normalized = String(email || '').trim().toLowerCase();
    const expected = USERS[normalized];
    return expected && password === expected ? normalized : null;
};
