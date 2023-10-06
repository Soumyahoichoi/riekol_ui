import { create } from "zustand";

export const useStore = create((set) => ({
  cart: null,
  setCart: (cartData) => set(() => ({ cart: cartData })),
}));
