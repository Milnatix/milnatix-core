"use client";

import { create } from "zustand";

export type ConfirmModalInput = {
  title?: string;
  message: string;
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
};

export type ConfirmModalState = {
  current?: ConfirmModalInput;
  show: (input: ConfirmModalInput) => void;
  hide: () => void;
};

export const useConfirmModalStore = create<ConfirmModalState>((set) => ({
  current: undefined,
  show: (input) => set({ current: input }),
  hide: () => set({ current: undefined }),
}));
