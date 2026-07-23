create table if not exists public.agent_runs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  department text not null,
  skill_id text not null,
  input jsonb not null,
  output text not null,
  input_tokens int not null default 0,
  output_tokens int not null default 0,
  cost_usd numeric(10,4) not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists agent_runs_user_created_idx
  on public.agent_runs (user_id, created_at desc);

create index if not exists agent_runs_skill_idx
  on public.agent_runs (skill_id);

alter table public.agent_runs enable row level security;

create policy "users can read own runs"
  on public.agent_runs for select
  using (auth.uid() = user_id);

create policy "service role inserts"
  on public.agent_runs for insert
  with check (auth.uid() = user_id or auth.role() = 'service_role');
