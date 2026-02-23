# Supabase setup

## 1. Run migration

Ga naar [Supabase Dashboard](https://supabase.com/dashboard) → jouw project → **SQL Editor**.

Kopieer de inhoud van `migrations/20250223000000_initial_schema.sql` en voer uit.

Dit maakt aan:
- `profiles` – per user, met trial_ends_at (3 dagen na signup)
- `posts` – gegenereerde posts per user
- RLS policies
- Trigger voor automatisch profiel bij signup

## 2. OpenRouter

Voeg `OPENROUTER_API_KEY` toe aan `.env.local` en Vercel.

Haal je key op: [openrouter.ai/keys](https://openrouter.ai/keys)
