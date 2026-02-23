import { NextResponse } from "next/server";

/**
 * Controleert of Supabase env vars geladen zijn.
 * GET /api/check-env - gebruikt na deploy om te verifiëren.
 * Geen waarden worden teruggegeven, alleen of ze bestaan.
 */
export async function GET() {
  const vars = {
    NEXT_PUBLIC_SUPABASE_URL: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    SUPABASE_SERVICE_ROLE_KEY: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
  };

  const allOk = Object.values(vars).every(Boolean);

  return NextResponse.json({
    ok: allOk,
    message: allOk ? "Alle env vars geladen" : "Sommige env vars ontbreken",
    vars,
  });
}
