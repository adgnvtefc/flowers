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

---

## 6. Reading + replying on the site (private key)

The site can now **show** the comments and let you **reply** — but only after a
passphrase is entered. The passphrase lives in the database (not in the public
repo), and is checked **server-side**, so the page source never reveals it.
Share the passphrase with anyone you want to be able to read/reply (e.g. her).

Open **SQL Editor → New query**, paste this, **change the passphrase**, and Run:

```sql
-- 1. Replies hang off each comment.
alter table public.comments add column if not exists reply text;

-- 2. The secret passphrase, in a table the public (anon) key can NEVER read
--    (RLS on, no select policy). Only the SECURITY DEFINER functions below see it.
create table if not exists public.app_secret (k text primary key, v text);
insert into public.app_secret (k, v) values ('comments_key', 'CHANGE-ME-to-a-long-passphrase')
  on conflict (k) do update set v = excluded.v;
alter table public.app_secret enable row level security;

-- 3. Read the thread for a memory — only if the key matches.
create or replace function public.get_comments(p_key text, p_memory text)
returns setof public.comments
language plpgsql security definer set search_path = public as $$
begin
  if p_key is distinct from (select v from public.app_secret where k = 'comments_key') then
    raise exception 'unauthorized';
  end if;
  return query
    select * from public.comments where memory = p_memory order by created_at asc;
end; $$;

-- 4. Save your reply to a comment — only if the key matches.
create or replace function public.add_reply(p_key text, p_id bigint, p_reply text)
returns void
language plpgsql security definer set search_path = public as $$
begin
  if p_key is distinct from (select v from public.app_secret where k = 'comments_key') then
    raise exception 'unauthorized';
  end if;
  update public.comments set reply = p_reply where id = p_id;
end; $$;

-- 5. Let the anon key CALL these functions (the key check inside still guards them).
grant execute on function public.get_comments(text, text) to anon;
grant execute on function public.add_reply(text, bigint, text) to anon;
```

That's it — no code changes needed for the passphrase. On the site, open a memory →
the comments button → type the passphrase once (remembered for the browser tab) →
read her comments and reply inline.

### To change the passphrase later
```sql
update public.app_secret set v = 'a-new-long-passphrase' where k = 'comments_key';
```

### Notes on this part
- The passphrase travels over HTTPS and is verified inside Postgres — it's never
  stored in the repo or exposed by the anon key. Pick something long; a short one
  could in theory be brute-forced by hammering the RPC.
- **One shared key** does both reading and replying. Anyone you give it to can
  read the thread *and* post replies (which show as yours). For just the two of
  you that's fine; if you ever want a read-only key for her + a separate reply
  key for you, say the word and I'll split it.
