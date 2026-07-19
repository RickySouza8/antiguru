-- ============================================================
-- ANTIGURU · LAUDOS + BANCO DE FONTES
-- Supabase → SQL Editor → New query → Run
-- Pré-requisito: SUPABASE-PEDIDOS.sql já rodado.
-- Seguro rodar de novo.
-- ============================================================

-- ------------------------------------------------------------
-- 0. PEDIDOS ganha o link da oferta (análise por link)
-- ------------------------------------------------------------
alter table public.pedidos add column if not exists link_oferta text;

-- ------------------------------------------------------------
-- 1. LAUDOS — um campo por secção. O laudo nasce estruturado.
-- ------------------------------------------------------------
create table if not exists public.laudos (
  id                     uuid primary key default gen_random_uuid(),
  pedido_id              uuid references public.pedidos(id) on delete set null,
  codigo                 text not null,
  categoria_oferta       text,                    -- texto livre → vira taxonomia depois

  s1_o_que_vendem        text,
  s2_onde_existe_gratis  text,
  s3_o_que_o_preco_cobra text,
  s4_custo_real          text,
  s5_intencao            text,
  s6_outros_caminhos     text,
  s7_se_avancar          text,

  nao_verificado         text,                    -- "o que não consegui verificar" — a regra da casa
  notas_internas         text,                    -- nunca sai para o cliente

  texto_entregue         text,                    -- prova: exatamente o que foi enviado
  criado_em              timestamptz not null default now(),
  atualizado_em          timestamptz not null default now(),
  entregue_em            timestamptz
);

create unique index if not exists laudos_codigo_key   on public.laudos (codigo);
create index if not exists laudos_pedido_idx          on public.laudos (pedido_id);
create index if not exists laudos_categoria_idx       on public.laudos (categoria_oferta);

-- atualizado_em automático (rascunho salvo = carimbo novo)
create or replace function public.touch_atualizado_em()
returns trigger language plpgsql as $$
begin
  new.atualizado_em = now();
  return new;
end $$;

drop trigger if exists laudos_touch on public.laudos;
create trigger laudos_touch before update on public.laudos
  for each row execute function public.touch_atualizado_em();

-- ------------------------------------------------------------
-- 2. FONTES — o activo que cresce laudo a laudo.
--    Regra dura, no banco e não só na tela:
--    link só entra com data de verificação.
-- ------------------------------------------------------------
create table if not exists public.fontes (
  id             uuid primary key default gen_random_uuid(),
  categoria      text not null,          -- casa com laudos.categoria_oferta
  tipo_de_fonte  text not null,          -- doc oficial, academia da plataforma, instituição pública...
  descricao      text not null,
  link           text,
  verificado_em  date,
  criado_em      timestamptz not null default now(),

  -- "os links morrem, os tipos de fonte não" — mas link sem data é ferida grave.
  constraint fonte_link_exige_data check (link is null or verificado_em is not null)
);

create index if not exists fontes_categoria_idx on public.fontes (categoria);
create index if not exists fontes_verif_idx     on public.fontes (verificado_em desc);

-- ------------------------------------------------------------
-- 3. RLS — laudo e fonte são trabalho interno.
--    Nada de anon aqui. Só authenticated lê e escreve.
-- ------------------------------------------------------------
alter table public.laudos enable row level security;
alter table public.fontes enable row level security;

drop policy if exists "auth gere laudos" on public.laudos;
drop policy if exists "auth gere fontes" on public.fontes;

create policy "auth gere laudos" on public.laudos
  for all to authenticated using (true) with check (true);

create policy "auth gere fontes" on public.fontes
  for all to authenticated using (true) with check (true);

-- ------------------------------------------------------------
-- 4. SEMENTE do banco de fontes — os tipos do manual.
--    Sem link (logo, sem data): são categorias de busca, não endereços.
--    "Os links morrem, os tipos de fonte não."
-- ------------------------------------------------------------
insert into public.fontes (categoria, tipo_de_fonte, descricao)
select * from (values
  ('_geral','Documentação oficial','Quem construiu a ferramenta ensina a ferramenta. Grátis, completo, atualizado. Quase sempre superior ao curso do revendedor.'),
  ('_geral','Academia da plataforma','Plataformas de anúncios, e-commerce e software oferecem formação gratuita e certificação — exatamente o que o guru revende.'),
  ('_geral','Instituição pública','Cursos gratuitos de entidades de apoio a pequenos negócios e de universidades públicas, com material aberto.'),
  ('_geral','Canal de prática','Quem mostra o trabalho a acontecer, não só o resultado. Distinguir de canal que é isca do próprio curso.'),
  ('_geral','Comunidade técnica','Fóruns onde profissionais reais discutem problemas reais. A informação é corrigida por pares.'),
  ('_geral','Órgão regulador','Para investimento e finanças: material educativo oficial, gratuito e sem conflito de interesse.')
) as v(categoria, tipo_de_fonte, descricao)
where not exists (select 1 from public.fontes where categoria = '_geral');

-- conferência: select * from pg_policies where tablename in ('laudos','fontes');
