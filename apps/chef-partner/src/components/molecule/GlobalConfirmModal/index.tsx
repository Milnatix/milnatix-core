"use client";

import Button from "@/components/atom/Button";
import { useConfirmModalStore } from "@/shared/stores/confirm-modal.store";
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const GlobalConfirmModal: React.FC = () => {
  const { current, hideConfirmModal } = useConfirmModalStore();
  
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => setMounted(true), []);
  
  if (!mounted || !current) return null;

  const handleConfirmButton = async () => {
    setLoading(true);
    await current.onConfirm();
    hideConfirmModal();
    setLoading(false);
  }

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 px-2">
      <div className="bg-white rounded-lg shadow-lg max-w-sm w-full p-6 relative animate-in scale-in-50">
        {current.title && <h3 className="text-lg font-semibold mb-2">{current.title}</h3>}
        <p className="text-sm text-gray-700 mb-4">{current.message}</p>

        <div className="flex justify-end gap-2">
          <Button
            type="button"
            onClick={hideConfirmModal}
            className="px-4 py-2 text-sm bg-gray-200 rounded hover:bg-gray-300 transition"
            variant={current.cancelButtonVariant || "default"}
            disabled={loading}
          >
            {current.cancelText || "Cancelar"}
          </Button>
          <Button
            type="button"
            variant={current.confirmButtonVariant || "primary"}
            loading={loading}
            onClick={handleConfirmButton}
          >
            {current.confirmText || "Confirmar"}
          </Button>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default GlobalConfirmModal