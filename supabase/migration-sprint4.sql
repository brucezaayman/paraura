-- ============================================================
-- Paraura — Sprint 4 Migration
-- Run in: Supabase Dashboard → SQL Editor
-- ============================================================

-- ── POSTS ───────────────────────────────────────────────────
create table if not exists posts (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  slug text not null unique,
  excerpt text,
  content text,
  cover_image text,
  category text default 'guide',
  tags text[],
  status text not null default 'draft',
  published_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists posts_slug_idx on posts(slug);
create index if not exists posts_status_idx on posts(status);
create index if not exists posts_published_at_idx on posts(published_at desc);

alter table posts enable row level security;

create policy "Public read published posts"
  on posts for select using (status = 'published');

create policy "Admin manage posts"
  on posts for all using (auth.role() = 'authenticated');

create trigger posts_updated_at
  before update on posts
  for each row execute procedure update_updated_at_column();

-- ── CAMPAIGNS ───────────────────────────────────────────────
create table if not exists campaigns (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  slug text not null unique,
  tagline text,
  description text,
  content text,
  cover_image text,
  product_ids uuid[],
  valid_from timestamptz,
  valid_until timestamptz,
  status text not null default 'draft',
  is_listed boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists campaigns_slug_idx on campaigns(slug);
create index if not exists campaigns_status_idx on campaigns(status);

alter table campaigns enable row level security;

create policy "Public read active campaigns"
  on campaigns for select using (status = 'active');

create policy "Admin manage campaigns"
  on campaigns for all using (auth.role() = 'authenticated');

create trigger campaigns_updated_at
  before update on campaigns
  for each row execute procedure update_updated_at_column();

-- ── CAMPAIGN INTERESTS ──────────────────────────────────────
create table if not exists campaign_interests (
  id uuid primary key default uuid_generate_v4(),
  campaign_id uuid references campaigns(id) on delete cascade,
  pilot_id uuid references pilots(id) on delete cascade,
  message text,
  created_at timestamptz default now()
);

create index if not exists campaign_interests_campaign_idx on campaign_interests(campaign_id);

alter table campaign_interests enable row level security;

create policy "Public insert campaign interest"
  on campaign_interests for insert with check (true);

create policy "Admin read campaign interests"
  on campaign_interests for select using (auth.role() = 'authenticated');

-- ============================================================
-- Done. Run migration-sprint4.sql after the original migration.sql
-- ============================================================
