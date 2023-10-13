import { create } from 'zustand';

export const useStore = create((set) => ({
    cart: [],
    setCart: (cartData) => set(() => ({ cart: cartData })),
    totalBillingAmout: 0,
    setTotalBilingAmount: (amount) => set((state) => ({ ...state, totalBillingAmout: amount }))
}));
