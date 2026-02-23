import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "OpenRouter niet geconfigureerd" },
      { status: 500 }
    );
  }

  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        },
      },
    }
  );

  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    return NextResponse.json({ error: "Niet ingelogd" }, { status: 401 });
  }

  const body = await request.json();
  const prompt = (body.prompt as string)?.trim();
  if (!prompt) {
    return NextResponse.json({ error: "Prompt ontbreekt" }, { status: 400 });
  }

  // TODO: check subscription/trial status uit profiles

  const systemPrompt = `Je bent een expert LinkedIn copywriter. Schrijf een virale LinkedIn-post in het Nederlands op basis van het gegeven onderwerp.
Format: alleen de posttekst, geen uitleg of meta-commentaar. Gebruik hooks, storytelling en engagement-triggers waar passend. Max 1200 tekens.`;

  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.linkflow.nl",
    },
    body: JSON.stringify({
      model: "openai/gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: prompt },
      ],
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error("OpenRouter error:", err);
    return NextResponse.json(
      { error: "Generatie mislukt" },
      { status: 502 }
    );
  }

  const data = await res.json();
  const content = data.choices?.[0]?.message?.content ?? "";

  // Opslaan in Supabase
  const { error: insertError } = await supabase.from("posts").insert({
    user_id: user.id,
    prompt,
    content,
  });

  if (insertError) {
    console.error("Post save error:", insertError);
    // Content is gegenereerd, return die wel
  }

  return NextResponse.json({ content });
}
