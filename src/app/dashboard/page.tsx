import Link from "next/link";
import { Navbar } from "@/components/ui/mini-navbar";
import { createAuthServerClient } from "@/lib/supabase/server-auth";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Dashboard - LinkFlow",
  description: "Jouw gegenereerde posts.",
};

export default async function DashboardPage() {
  const supabase = await createAuthServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/");

  const { data: posts } = await supabase
    .from("posts")
    .select("id, prompt, content, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(20);

  return (
    <div className="min-h-screen bg-[#0f0f14] text-white">
      <Navbar />
      <main className="pt-24 pb-16 px-6 max-w-3xl mx-auto">
        <h1 className="text-2xl font-semibold mb-6">Mijn posts</h1>
        <Link
          href="/"
          className="inline-block mb-6 text-sm text-[#1f3dbc]"
        >
          ← Nieuwe post genereren
        </Link>
        {!posts?.length ? (
          <p className="text-gray-500">Nog geen posts. Genereer er één op de homepage.</p>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <article
                key={post.id}
                className="p-4 rounded-xl border border-white/10 bg-white/5"
              >
                <p className="text-xs text-gray-500 mb-2">
                  {new Date(post.created_at).toLocaleDateString("nl-NL")} · {post.prompt.slice(0, 50)}…
                </p>
                <pre className="whitespace-pre-wrap text-sm text-gray-300">
                  {post.content}
                </pre>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
