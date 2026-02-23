"use client";

import { HeroWave } from "@/components/ui/ai-input-hero";

export default function Home() {
  return (
    <HeroWave
      title="Word zichtbaar op LinkedIn zonder elke dag na te denken."
      subtitle="AI-postgenerator voor bereik. Gratis proefperiode, daarna €29/maand onbeperkt."
      placeholder="Beschrijf je post-idee..."
      buttonText="Genereer"
      onPromptSubmit={(value) => {
        // TODO: Navigate to /generate or trigger API
        console.log(value);
      }}
    />
  );
}
