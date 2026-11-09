-- Run once in Supabase: SQL Editor -> New query -> paste -> Run.
create table if not exists public.cohort_registrations (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  cohort text not null,
  route text not null,
  full_name text not null,
  email text not null,
  whatsapp text not null,
  country text not null,
  experience text not null,
  goal text,
  source text,
  unique (cohort, route, email)
);

create index if not exists cohort_registrations_cohort_idx
  on public.cohort_registrations (cohort, created_at desc);

-- No policies on purpose: only the server, using the service role key, can read or write.
alter table public.cohort_registrations enable row level security;
