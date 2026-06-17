# Private comments setup (Supabase)

Comments left on memories are **insert-only**: visitors can send one, but nobody
(not even via the public key in the page source) can read them back. You read
them privately in your Supabase dashboard. ~10–15 minutes, free.

## 1. Create the project
1. Go to https://supabase.com → sign in → **New project** (free tier is fine).
2. Pick a name + database password, wait ~2 min for it to spin up.

## 2. Create the table + lock it down
Open **SQL Editor** (left sidebar) → **New query**, paste this, click **Run**:

```sql
-- Comments table
create table public.comments (
  id          bigint generated always as identity primary key,
  created_at  timestamptz not null default now(),
  memory      text,
  comment     text not null check (char_length(comment) <= 2000)
);

-- Turn on row-level security and allow ONLY inserts from the public (anon) key.
-- No select/update/delete policy exists, so the anon key cannot read, edit, or
-- delete anything — it can only add a comment.
alter table public.comments enable row level security;

create policy "anon can insert comments"
  on public.comments
  for insert
  to anon
  with check (true);
```

## 3. Get your keys
**Project Settings** (gear icon) → **API**:
- **Project URL** — looks like `https://abcdxyz.supabase.co`
- **Project API keys → `anon` `public`** — a long token

## 4. Paste them into the site
In `script.js`, near the top of the comments section, replace the placeholders:

```js
const SUPABASE_URL = 'https://abcdxyz.supabase.co'; // your Project URL
const SUPABASE_ANON_KEY = 'eyJhbGci...';            // your anon public key
```

The anon key is **safe to commit/publish** — RLS makes it insert-only.

## 5. Read the comments
Supabase dashboard → **Table Editor** → `comments`. Each row shows the `memory`
(e.g. "Day 47"), the `comment`, and `created_at`. The dashboard bypasses RLS, so
you can always read them; the website can't.

### Notes
- **Spam:** anyone reading your page source could POST junk with the anon key.
  For a quiet personal site this is negligible. If it ever happens, you can add a
  Supabase Edge Function or a length/rate check; ask and I'll wire it up.
- **Want her to see comments back later?** That's a separate, opt-in step — say
  the word and I'll add a read path (with its own policy).
