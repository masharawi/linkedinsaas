import Link from "next/link";
import { Navbar } from "@/components/ui/mini-navbar";

export const metadata = {
  title: "Gratis proberen - LinkFlow",
  description: "Start je gratis proefperiode van LinkFlow. Geen creditcard nodig.",
};

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-[#0f0f14] text-white">
      <Navbar />
      <main className="pt-24 pb-16 px-6 flex items-center justify-center min-h-[60vh]">
        <div className="w-full max-w-md">
          <h1 className="text-2xl font-semibold mb-6">Gratis proberen</h1>
          <p className="text-gray-400 mb-8">
            Start je proefperiode. Geen creditcard nodig.
          </p>
          <div className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
            <p className="text-gray-400 text-sm text-center">
              Registratie met Supabase Auth wordt binnenkort toegevoegd.
            </p>
            <Link
              href="/"
              className="mt-6 block text-center py-3 rounded-xl bg-[#1f3dbc] text-white font-medium hover:bg-[#2a4fd4] transition-colors"
            >
              Naar de generator
            </Link>
            <Link
              href="/login"
              className="mt-4 block text-center text-gray-400 hover:text-white text-sm"
            >
              Al een account? Log in
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
