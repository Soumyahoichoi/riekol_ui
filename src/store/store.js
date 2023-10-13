import { create } from 'zustand';

export const useStore = create((set) => ({
    cart: [],
    isSelected: false,
    setCart: (cartData) => set(() => ({ cart: cartData })),
    totalBillingAmout: 0,
    setIsSelected: (value) => set((state) => ({ ...state, isSelected: value })),
    setTotalBilingAmount: (amount) => set((state) => ({ ...state, totalBillingAmout: amount }))
}));
