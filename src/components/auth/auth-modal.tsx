"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/modal";
import { createClient } from "@/lib/supabase/client";

type AuthMode = "login" | "signup";

type AuthModalProps = {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: AuthMode;
};

export function AuthModal({ isOpen, onClose, initialMode = "signup" }: AuthModalProps) {
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "error" | "success"; text: string } | null>(null);

  React.useEffect(() => {
    if (isOpen) setMode(initialMode);
  }, [isOpen, initialMode]);

  const supabase = createClient();

  const handleGoogleSignIn = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) setMessage({ type: "error", text: error.message });
    else if (data.url) window.location.href = data.url;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        setMessage({
          type: "success",
          text: "Check je mailbox om je account te bevestigen.",
        });
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        setMessage({ type: "success", text: "Je bent ingelogd!" });
        setTimeout(onClose, 500);
      }
    } catch (err: unknown) {
      setMessage({
        type: "error",
        text: err instanceof Error ? err.message : "Er ging iets mis.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={mode === "login" ? "Inloggen" : "Gratis proberen"}
    >
      <button
        type="button"
        onClick={handleGoogleSignIn}
        className="w-full flex items-center justify-center gap-3 rounded-xl border border-white/20 bg-white/5 py-3 text-gray-200 hover:bg-white/10 transition-colors mb-4"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.18H12v4.16h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>
        Doorgaan met Google
      </button>
      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-white/10" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-[#0f0f14] text-gray-500">of met e-mail</span>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="mb-1 block text-sm text-gray-400">
            E-mail
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded-xl border border-white/10 bg-[rgba(15,15,20,0.8)] px-4 py-3 text-white placeholder:text-white/40 outline-none focus:ring-2 focus:ring-[#1f3dbc]/40"
            placeholder="jou@voorbeeld.nl"
          />
        </div>
        <div>
          <label htmlFor="password" className="mb-1 block text-sm text-gray-400">
            Wachtwoord
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            className="w-full rounded-xl border border-white/10 bg-[rgba(15,15,20,0.8)] px-4 py-3 text-white placeholder:text-white/40 outline-none focus:ring-2 focus:ring-[#1f3dbc]/40"
            placeholder="••••••••"
          />
        </div>
        {message && (
          <p
            className={`text-sm ${
              message.type === "error" ? "text-red-400" : "text-green-400"
            }`}
          >
            {message.text}
          </p>
        )}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-[#1f3dbc] py-3 font-medium text-white transition-colors hover:bg-[#2a4fd4] disabled:opacity-50"
        >
          {loading ? "Even geduld..." : mode === "login" ? "Inloggen" : "Account aanmaken"}
        </button>
      </form>
      <p className="mt-4 text-center text-sm text-gray-400">
        {mode === "login" ? (
          <>
            Nog geen account?{" "}
            <button
              type="button"
              onClick={() => setMode("signup")}
              className="text-[#1f3dbc]"
            >
              Gratis proberen
            </button>
          </>
        ) : (
          <>
            Al een account?{" "}
            <button
              type="button"
              onClick={() => setMode("login")}
              className="text-[#1f3dbc]"
            >
              Inloggen
            </button>
          </>
        )}
      </p>
    </Modal>
  );
}
