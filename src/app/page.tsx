"use client";

import { useState } from "react";
import { HeroWave } from "@/components/ui/ai-input-hero";
import { useAuth } from "@/contexts/auth-context";
import { Modal } from "@/components/ui/modal";

export default function Home() {
  const { user, openAccountRequiredModal } = useAuth();
  const [result, setResult] = useState<{ content: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (value: string) => {
    if (!user) {
      openAccountRequiredModal();
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: value }),
      });
      const data = await res.json();
      if (res.ok && data.content) {
        setResult({ content: data.content });
      } else {
        setResult({ content: `Fout: ${data.error || "Generatie mislukt"}` });
      }
    } catch {
      setResult({ content: "Er ging iets mis. Probeer opnieuw." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <HeroWave
        title="De AI-tool voor consistente zichtbaarheid op LinkedIn."
        subtitle="Gebaseerd op patronen uit duizenden succesvolle LinkedIn-posts."
        placeholder="Waar wil je zichtbaar mee worden?"
        placeholder="Beschrijf je post-idee..."
        buttonText={loading ? "Bezig..." : "Genereer"}
        onPromptSubmit={handleSubmit}
      />
      <Modal
        isOpen={!!result}
        onClose={() => setResult(null)}
        title="Je gegenereerde post"
      >
        {result && (
          <div className="space-y-4">
            <pre className="whitespace-pre-wrap text-sm text-gray-300 bg-white/5 rounded-xl p-4 max-h-64 overflow-y-auto">
              {result.content}
            </pre>
            <button
              onClick={() => navigator.clipboard.writeText(result.content)}
              className="w-full rounded-xl bg-[#1f3dbc] py-2.5 text-sm text-white hover:bg-[#2a4fd4]"
            >
              Kopiëren
            </button>
            <button
              onClick={() => setResult(null)}
              className="w-full rounded-xl border border-white/20 py-2.5 text-sm text-gray-400 hover:bg-white/5"
            >
              Sluiten
            </button>
          </div>
        )}
      </Modal>
    </>
  );
}
