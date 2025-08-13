"use client";

import { useConfirmModalStore } from "@/shared/stores/confirm-modal.store";
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const GlobalConfirmModal: React.FC = () => {
  const { current, hide } = useConfirmModalStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted || !current) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 px-2">
      <div className="bg-white rounded-lg shadow-lg max-w-sm w-full p-6 relative animate-in scale-in-50">
        {current.title && <h3 className="text-lg font-semibold mb-2">{current.title}</h3>}
        <p className="text-sm text-gray-700 mb-4">{current.message}</p>

        <div className="flex justify-end gap-2">
          <button
            onClick={hide}
            className="px-4 py-2 text-sm bg-gray-200 rounded hover:bg-gray-300 transition"
          >
            {current.cancelText || "Cancelar"}
          </button>
          <button
            onClick={() => {
              current.onConfirm();
              hide();
            }}
            className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            {current.confirmText || "Confirmar"}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default GlobalConfirmModal