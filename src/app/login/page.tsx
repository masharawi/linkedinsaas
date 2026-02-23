import Link from "next/link";
import { Navbar } from "@/components/ui/mini-navbar";

export const metadata = {
  title: "Inloggen - LinkFlow",
  description: "Log in op je LinkFlow account.",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#0f0f14] text-white">
      <Navbar />
      <main className="pt-24 pb-16 px-6 flex items-center justify-center min-h-[60vh]">
        <div className="w-full max-w-md">
          <h1 className="text-2xl font-semibold mb-6">Inloggen</h1>
          <p className="text-gray-400 mb-8">
            Log in om je posts te beheren. Auth komt binnenkort.
          </p>
          <div className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
            <p className="text-gray-400 text-sm text-center">
              Inloggen met Supabase Auth wordt binnenkort toegevoegd.
            </p>
            <Link
              href="/"
              className="mt-6 block text-center text-[#1f3dbc]"
            >
              Terug naar home
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
