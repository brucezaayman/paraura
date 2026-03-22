-- ============================================================
-- Paraura Platform — Supabase Migration
-- Run this in: Supabase Dashboard → SQL Editor
-- ============================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ── PILOTS ──────────────────────────────────────────────────
create table if not exists pilots (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  email text not null unique,
  whatsapp text,
  pilot_level text, -- 'A', 'B', 'C', 'D'
  hours_flown int,
  years_flying int,
  weight int, -- all-up flying weight in kg
  location text,
  notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Index for email lookup (upsert on advice submit)
create index if not exists pilots_email_idx on pilots(email);

-- ── INQUIRIES ────────────────────────────────────────────────
create table if not exists inquiries (
  id uuid primary key default uuid_generate_v4(),
  pilot_id uuid references pilots(id) on delete cascade,
  source text not null default 'homepage', -- 'selector' | 'product' | 'homepage'
  message text,
  status text not null default 'new', -- 'new' | 'contacted' | 'closed'
  created_at timestamptz default now()
);

-- Index for pilot lookups
create index if not exists inquiries_pilot_id_idx on inquiries(pilot_id);
create index if not exists inquiries_status_idx on inquiries(status);

-- ── PRODUCTS ─────────────────────────────────────────────────
create table if not exists products (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text not null unique,
  category text not null default 'wing', -- 'wing' | 'harness' | 'reserve' | 'accessory'
  description text,
  specs jsonb default '{}',            -- { certification, cells, flat_area, glide_ratio, ... }
  images jsonb default '[]',           -- array of image URLs
  wing_level text,                     -- 'A' | 'B' | 'C' | 'D'
  weight_ranges jsonb default '[]',    -- [{ size, min_weight, max_weight }]
  is_lightweight boolean default false,
  created_at timestamptz default now()
);

-- Index for slug lookup
create index if not exists products_slug_idx on products(slug);
create index if not exists products_wing_level_idx on products(wing_level);

-- ── RECOMMENDATIONS (optional cache) ────────────────────────
create table if not exists recommendations (
  id uuid primary key default uuid_generate_v4(),
  pilot_id uuid references pilots(id) on delete cascade,
  result_json jsonb,
  created_at timestamptz default now()
);

-- ── ROW LEVEL SECURITY ───────────────────────────────────────

-- Pilots: only accessible to authenticated (admin) users
alter table pilots enable row level security;

create policy "Admin read pilots"
  on pilots for select
  using (auth.role() = 'authenticated');

create policy "Admin update pilots"
  on pilots for update
  using (auth.role() = 'authenticated');

-- Allow public insert for advice form (upsert by email)
create policy "Public insert pilot"
  on pilots for insert
  with check (true);

-- Inquiries: same pattern
alter table inquiries enable row level security;

create policy "Admin read inquiries"
  on inquiries for select
  using (auth.role() = 'authenticated');

create policy "Public insert inquiry"
  on inquiries for insert
  with check (true);

create policy "Admin update inquiry status"
  on inquiries for update
  using (auth.role() = 'authenticated');

-- Products: public read, admin write
alter table products enable row level security;

create policy "Public read products"
  on products for select
  using (true);

create policy "Admin manage products"
  on products for all
  using (auth.role() = 'authenticated');

-- Recommendations: admin only
alter table recommendations enable row level security;

create policy "Admin manage recommendations"
  on recommendations for all
  using (auth.role() = 'authenticated');

-- ── AUTO-UPDATE updated_at ───────────────────────────────────
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger pilots_updated_at
  before update on pilots
  for each row execute procedure update_updated_at_column();

-- ============================================================
-- Done. All tables created with RLS policies.
-- ============================================================
