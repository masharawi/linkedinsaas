import Link from "next/link";
import { Navbar } from "@/components/ui/mini-navbar";

export const metadata = {
  title: "Hoe werkt het - LinkFlow",
  description: "Ontdek wat LinkFlow voor je kan doen: AI-postgeneratie, virale content, onbeperkt genereren.",
};

const features = [
  {
    title: "Datagedreven",
    description: "1.000.000+ werkende LinkedIn-posts als basis. Jouw content wordt gegenereerd op bewezen formules die daadwerkelijk bereik halen.",
  },
  {
    title: "AI-postgenerator",
    description: "Beschrijf je idee en krijg direct virale LinkedIn-posts. Geen writers block meer.",
  },
  {
    title: "Onbeperkt genereren",
    description: "Geen limieten. Genereer zoveel posts als je nodig hebt voor €29/maand.",
  },
  {
    title: "Virale formaten",
    description: "Thought leadership, carousels, storytelling, engagement-posts – allemaal uit één tool.",
  },
  {
    title: "Nederlandse markt",
    description: "Geoptimaliseerd voor de Nederlandse LinkedIn community en tone of voice.",
  },
];

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-[#0f0f14] text-white">
      <Navbar />
      <main className="pt-24 pb-16 px-6 max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-semibold mb-2">Hoe werkt het</h1>
        <p className="text-gray-400 mb-12">
          Alles wat je nodig hebt om zichtbaar te worden op LinkedIn.
        </p>
        <div className="grid gap-8 sm:grid-cols-2">
          {features.map((f) => (
            <div
              key={f.title}
              className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm"
            >
              <h2 className="font-semibold text-lg mb-2">{f.title}</h2>
              <p className="text-gray-400 text-sm">{f.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 rounded-full bg-[#1f3dbc] text-white font-medium hover:bg-[#2a4fd4] transition-colors"
          >
            Probeer gratis
          </Link>
        </div>
      </main>
    </div>
  );
}
