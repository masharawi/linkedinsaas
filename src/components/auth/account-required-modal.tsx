"use client";

import React from "react";
import { Modal } from "@/components/ui/modal";

type AccountRequiredModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSignupClick: () => void;
};

export function AccountRequiredModal({ isOpen, onClose, onSignupClick }: AccountRequiredModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="">
      <div className="text-center">
        <p className="text-gray-300 mb-6">
          Die post maak ik graag voor je! Je hebt wel een account nodig om te starten.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={onSignupClick}
            className="rounded-xl bg-[#1f3dbc] px-6 py-3 font-medium text-white hover:bg-[#2a4fd4] transition-colors"
          >
            Account aanmaken
          </button>
          <button
            onClick={onClose}
            className="rounded-xl border border-white/20 px-6 py-3 text-gray-300 hover:bg-white/5 transition-colors"
          >
            Later
          </button>
        </div>
      </div>
    </Modal>
  );
}
