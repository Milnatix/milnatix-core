"use client";

import { useAlertStore } from "@/shared/stores/alert.store";
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { FiAlertCircle, FiAlertTriangle, FiCheckCircle, FiInfo, FiX } from "react-icons/fi";

function TypeIcon({ type }: { type: "error" | "success" | "warning" | "info" }) {
  if (type === "error") return <FiAlertCircle className="shrink-0" />;
  if (type === "success") return <FiCheckCircle className="shrink-0" />;
  if (type === "warning") return <FiAlertTriangle className="shrink-0" />;
  return <FiInfo className="shrink-0" />;
}

function typeClasses(type: string) {
  // usa suas cores do tema (substitua se quiser)
  switch (type) {
    case "error":
      return "bg-[oklch(97%_0.05_30)] text-[oklch(40%_0.16_30)] border-[oklch(80%_0.12_30)]";
    case "success":
      return "bg-[oklch(97%_0.05_160)] text-[oklch(35%_0.12_160)] border-[oklch(80%_0.10_160)]";
    case "warning":
      return "bg-[oklch(97%_0.07_80)] text-[oklch(35%_0.13_80)] border-[oklch(80%_0.12_80)]";
    default:
      return "bg-white text-gray-800 border-gray-200";
  }
}

export default function GlobalAlert() {
  const { toasts, hide } = useAlertStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return createPortal(
    <div
      aria-live="assertive"
      className="fixed inset-x-0 bottom-4 z-[9999] flex justify-center px-4"
    >
      <div className="flex w-full max-w-md flex-col gap-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`
              group relative flex w-full items-start gap-3 rounded-lg border p-4 shadow-lg
              ${typeClasses(t.type)}
              transition
              animate-in fade-in slide-in-from-bottom-2
            `}
          >
            <div className="mt-0.5">
              <TypeIcon type={t.type} />
            </div>
            <div className="flex-1">
              {t.title && <p className="mb-0.5 font-semibold">{t.title}</p>}
              <p className="text-sm leading-5">{t.message}</p>
            </div>
            <button
              aria-label="Fechar alerta"
              onClick={() => hide(t.id)}
              className="opacity-70 hover:opacity-100 transition"
            >
              <FiX />
            </button>
          </div>
        ))}
      </div>
    </div>,
    document.body
  );
}
