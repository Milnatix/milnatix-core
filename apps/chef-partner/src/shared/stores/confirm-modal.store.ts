"use client";

import { ButtonVariants } from "@/components/atom/Button";
import { create } from "zustand";

export type ConfirmModalInput = {
  title?: string;
  message: string;
  onConfirm: () => Promise<void>;
  confirmText?: string;
  cancelText?: string;
  confirmButtonVariant?: ButtonVariants
  cancelButtonVariant?: ButtonVariants
};

export type ConfirmModalState = {
  current?: ConfirmModalInput;
  showConfirmModal: (input: ConfirmModalInput) => void;
  hideConfirmModal: () => void;
};

export const useConfirmModalStore = create<ConfirmModalState>((set) => ({
  current: undefined,
  showConfirmModal: (input) => set({ current: input }),
  hideConfirmModal: () => set({ current: undefined }),
}));
