-- Schema do módulo de Descarbonização (Climoo) para Supabase.
-- Rode este SQL no Supabase: Dashboard → SQL Editor → New query → Run.
--
-- Modelo: uma linha por empresa (CNPJ), com o estado completo em `data` (jsonb)
-- — exatamente o JSON que o app monta em buildCompanyExport().

create table if not exists public.decarbonization_companies (
  cnpj        text primary key,
  empresa     text,
  data        jsonb       not null default '{}'::jsonb,
  updated_at  timestamptz not null default now()
);

alter table public.decarbonization_companies enable row level security;

-- Ferramenta interna: a anon key (pública) pode ler/gravar.
-- Restrinja estas policies se o app passar a ter autenticação de usuários.
drop policy if exists "decarb anon select" on public.decarbonization_companies;
create policy "decarb anon select"
  on public.decarbonization_companies for select
  using (true);

drop policy if exists "decarb anon insert" on public.decarbonization_companies;
create policy "decarb anon insert"
  on public.decarbonization_companies for insert
  with check (true);

drop policy if exists "decarb anon update" on public.decarbonization_companies;
create policy "decarb anon update"
  on public.decarbonization_companies for update
  using (true)
  with check (true);

-- ──────────────────────────────────────────────────────────────────────
-- Log de alterações (auditoria) — quem salvou qual empresa e quando.
-- Somente leitura na interface (sem restaurar versões); a visualização é
-- liberada na UI apenas para o administrador.
-- ──────────────────────────────────────────────────────────────────────
create table if not exists public.decarbonization_audit (
  id          bigint generated always as identity primary key,
  cnpj        text,
  empresa     text,
  user_email  text,
  action      text default 'save',
  created_at  timestamptz not null default now()
);

create index if not exists decarbonization_audit_created_at_idx
  on public.decarbonization_audit (created_at desc);

alter table public.decarbonization_audit enable row level security;

-- Ferramenta interna: a anon key pode inserir (registrar) e ler o log.
drop policy if exists "audit anon insert" on public.decarbonization_audit;
create policy "audit anon insert"
  on public.decarbonization_audit for insert
  with check (true);

drop policy if exists "audit anon select" on public.decarbonization_audit;
create policy "audit anon select"
  on public.decarbonization_audit for select
  using (true);
