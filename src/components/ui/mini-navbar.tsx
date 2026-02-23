"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/auth-context";
import { createClient } from "@/lib/supabase/client";

const AnimatedNavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  const defaultTextColor = "text-gray-300";
  const hoverTextColor = "text-white";
  const textSizeClass = "text-sm";

  return (
    <Link
      href={href}
      className={`group relative inline-block overflow-hidden h-5 flex items-center ${textSizeClass}`}
    >
      <div className="flex flex-col transition-transform duration-400 ease-out transform group-hover:-translate-y-1/2">
        <span className={defaultTextColor}>{children}</span>
        <span className={hoverTextColor}>{children}</span>
      </div>
    </Link>
  );
};

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, openAuthModal } = useAuth();

  const toggleMenu = () => setIsOpen(!isOpen);

  const logoElement = (
    <Link href="/" className="font-semibold text-white text-lg tracking-tight">
      LinkFlow
    </Link>
  );

  const navLinksData: { label: string; href: string; isLogin?: boolean }[] = [
    ...(user ? [{ label: "Mijn posts", href: "/dashboard" }] : []),
    { label: "Hoe werkt het", href: "/features" },
    { label: "Prijzen", href: "/pricing" },
    ...(!user ? [{ label: "Inloggen", href: "#", isLogin: true }] : []),
  ];

  return (
    <>
      {/* Farao-stijl: losse elementen zwevend op achtergrond, geen omhullende bar */}
      <header className="fixed top-0 left-0 right-0 z-20 px-6 sm:px-12 py-6 flex items-center justify-between w-full">
        <div className="flex-shrink-0">{logoElement}</div>

        <nav className="hidden sm:flex items-center gap-x-12 absolute left-1/2 -translate-x-1/2">
          {navLinksData.map((link) =>
            link.isLogin ? (
              <button
                key="login"
                onClick={() => openAuthModal("login")}
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                Inloggen
              </button>
            ) : (
              <AnimatedNavLink key={link.href} href={link.href}>
                {link.label}
              </AnimatedNavLink>
            )
          )}
        </nav>

        <div className="hidden sm:flex items-center gap-4 flex-shrink-0">
          {user ? (
            <div className="flex items-center gap-3">
              {(user.user_metadata?.avatar_url || user.user_metadata?.picture) && (
                <img
                  src={user.user_metadata.avatar_url || user.user_metadata.picture}
                  alt=""
                  className="w-9 h-9 rounded-full"
                />
              )}
              <span className="text-sm text-gray-300">{user.email?.split("@")[0]}</span>
              <button
                onClick={() => createClient().auth.signOut()}
                className="text-xs text-gray-500 hover:text-white transition-colors"
              >
                Uitloggen
              </button>
            </div>
          ) : (
            <button
              onClick={() => openAuthModal("signup")}
              className="px-5 py-2.5 text-sm font-semibold text-black bg-white rounded-full hover:bg-gray-100 transition-colors"
            >
              Gratis proberen
            </button>
          )}
        </div>

        <div className="sm:hidden flex-shrink-0">
        <button
          className="sm:hidden flex items-center justify-center w-10 h-10 text-gray-300 focus:outline-none"
          onClick={toggleMenu}
          aria-label={isOpen ? "Menu sluiten" : "Menu openen"}
        >
            {isOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <div
        className={`sm:hidden fixed inset-0 z-10 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />
      <div
        className={`sm:hidden fixed top-0 right-0 z-20 w-72 h-full bg-[#0f0f14] border-l border-white/10 shadow-xl transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="pt-20 px-6 flex flex-col gap-6">
          <nav className="flex flex-col gap-5 text-base">
            {navLinksData.map((link) =>
              link.isLogin ? (
                <button
                  key="login"
                  className="text-gray-300 hover:text-white transition-colors text-left"
                  onClick={() => { openAuthModal("login"); setIsOpen(false); }}
                >
                  Inloggen
                </button>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-300 hover:text-white transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>
          {!user && (
            <button
              onClick={() => { openAuthModal("signup"); setIsOpen(false); }}
              className="py-3 text-sm font-semibold text-black bg-white rounded-full hover:bg-gray-100 text-center"
            >
              Gratis proberen
            </button>
          )}
        </div>
      </div>
    </>
  );
}
