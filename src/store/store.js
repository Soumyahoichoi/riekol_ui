import { create } from 'zustand';

export const useStore = create((set) => ({
    cart: [],
    setCart: (cartData) => set(() => ({ cart: cartData }))
}));
