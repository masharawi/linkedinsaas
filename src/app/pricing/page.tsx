import Link from "next/link";
import { Navbar } from "@/components/ui/mini-navbar";

export const metadata = {
  title: "Prijzen - LinkFlow",
  description: "LinkFlow prijzen: 3 dagen gratis, daarna €29/maand onbeperkt genereren.",
};

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#0f0f14] text-white">
      <Navbar />
      <main className="pt-24 pb-16 px-6 max-w-2xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-semibold mb-2">Prijzen</h1>
        <p className="text-gray-400 mb-12">
          Datagedreven op 1.000.000+ werkende posts. Simpel en transparant.
        </p>
        <div className="p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-4xl font-bold">€29</span>
            <span className="text-gray-400">/maand</span>
          </div>
          <ul className="space-y-3 text-gray-300 mb-8">
            <li>✓ 3 dagen gratis proberen</li>
            <li>✓ Onbeperkt posts genereren</li>
            <li>✓ Alle virale formaten</li>
            <li>✓ Nederlandse focus</li>
          </ul>
          <Link
            href="/signup"
            className="block w-full text-center py-4 rounded-xl bg-[#1f3dbc] text-white font-semibold hover:bg-[#2a4fd4] transition-colors"
          >
            Gratis proberen
          </Link>
        </div>
        <p className="mt-6 text-center text-gray-500 text-sm">
          Geen creditcard nodig voor de proefperiode. Annuleer wanneer je wilt.
        </p>
      </main>
    </div>
  );
}
