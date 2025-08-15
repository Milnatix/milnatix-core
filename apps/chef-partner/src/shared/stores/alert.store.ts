"use client";

import { create } from "zustand";

export type AlertType = "error" | "success" | "warning" | "info";

export type AlertInput = {
  message: string;
  title?: string;
  type?: AlertType;
  /** em ms; default 4000 */
  duration?: number;
};

export type AlertItem = {
  id: string;
  message: string;
  title?: string;
  type: AlertType;
  duration: number;
};

type AlertState = {
  toasts: AlertItem[];
  showAlert: (input: AlertInput) => string;      
  hideAlert: (id: string) => void;
  clear: () => void;
};

function uid() {
  return Math.random().toString(36).slice(2, 9);
}

export const useAlertStore = create<AlertState>((set, get) => ({
  toasts: [],
  showAlert: ({ message, title, type = "error", duration = 4000 }) => {
    const id = uid();
    const toast: AlertItem = { id, message, title, type, duration };
    set((s) => ({ toasts: [toast, ...s.toasts] })); 

    
    if (duration > 0) {
      setTimeout(() => {
        const exists = get().toasts.some(t => t.id === id);
        if (exists) get().hideAlert(id);
      }, duration);
    }
    return id;
  },
  hideAlert: (id) => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
  clear: () => set({ toasts: [] }),
}));
