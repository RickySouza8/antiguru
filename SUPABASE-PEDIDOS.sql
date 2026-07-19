-- ============================================================
-- ANTIGURU · TABELA PEDIDOS
-- Rode isto no Supabase → SQL Editor → New query → Run
-- (uma vez só; é seguro rodar de novo, tudo é IF NOT EXISTS)
-- ============================================================

create table if not exists public.pedidos (
  id            uuid primary key default gen_random_uuid(),
  criado_em     timestamptz not null default now(),
  codigo        text not null,
  nome          text not null,
  canal         text not null,          -- 'whatsapp' | 'email'
  contato       text not null,
  oferta        text,
  valor         text,
  texto_oferta  text,
  cnpj          text,
  contexto      text,
  risco         int,
  faixa         text,
  status        text not null default 'aguardando_pagamento',
  pago          boolean not null default false,
  entregue      boolean not null default false
);

create index if not exists pedidos_criado_em_idx on public.pedidos (criado_em desc);
create index if not exists pedidos_codigo_idx    on public.pedidos (codigo);

-- ---------- RLS: mesmo padrão dos feedbacks ----------
alter table public.pedidos enable row level security;

-- faxina (evita policy duplicada conflitando — lição 3 do manual)
drop policy if exists "anon insere pedido"        on public.pedidos;
drop policy if exists "authenticated le pedidos"  on public.pedidos;
drop policy if exists "authenticated edita pedidos" on public.pedidos;
drop policy if exists "authenticated apaga pedidos" on public.pedidos;

-- qualquer visitante pode CRIAR um pedido
create policy "anon insere pedido"
  on public.pedidos for insert
  to anon, authenticated
  with check (true);

-- só Henrique logado LÊ, EDITA e APAGA
create policy "authenticated le pedidos"
  on public.pedidos for select
  to authenticated using (true);

create policy "authenticated edita pedidos"
  on public.pedidos for update
  to authenticated using (true) with check (true);

create policy "authenticated apaga pedidos"
  on public.pedidos for delete
  to authenticated using (true);

-- ---------- conferência ----------
-- select * from pg_policies where tablename = 'pedidos';
