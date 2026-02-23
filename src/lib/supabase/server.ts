import { createClient } from "@supabase/supabase-js";

/**
 * Server-side Supabase client met service_role key.
 * Gebruik ALLEEN in: API routes, Server Actions, getServerSideProps.
 * NOOIT in client components - bypassed Row Level Security.
 */
export function createServerClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error(
      "Missing server Supabase vars. Add SUPABASE_SERVICE_ROLE_KEY to .env.local"
    );
  }

  return createClient(url, key);
}
