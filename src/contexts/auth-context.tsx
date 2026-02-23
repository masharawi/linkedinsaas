"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";
import { AuthModal } from "@/components/auth/auth-modal";
import { AccountRequiredModal } from "@/components/auth/account-required-modal";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  openAuthModal: (mode: "login" | "signup") => void;
  openAccountRequiredModal: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [authModal, setAuthModal] = useState<"login" | "signup" | null>(null);
  const [accountRequiredOpen, setAccountRequiredOpen] = useState(false);

  const supabase = createClient();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });
    return () => subscription.unsubscribe();
  }, [supabase.auth]);

  const openAuthModal = (mode: "login" | "signup") => {
    setAccountRequiredOpen(false);
    setAuthModal(mode);
  };

  const openAccountRequiredModal = () => {
    setAccountRequiredOpen(true);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        openAuthModal,
        openAccountRequiredModal,
      }}
    >
      {children}
      <AuthModal
        isOpen={authModal !== null}
        onClose={() => setAuthModal(null)}
        initialMode={authModal ?? "signup"}
      />
      <AccountRequiredModal
        isOpen={accountRequiredOpen}
        onClose={() => setAccountRequiredOpen(false)}
        onSignupClick={() => {
          setAccountRequiredOpen(false);
          setAuthModal("signup");
        }}
      />
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
