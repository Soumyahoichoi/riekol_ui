import { create } from 'zustand';

export const useStore = create((set) => ({
    cart: [],
    isSelected: false,
    totalBillingAmout: 0,
    myEo: [],
    setCart: (cartData) => set(() => ({ cart: cartData })),
    setIsSelected: (value) => set((state) => ({ ...state, isSelected: value })),
    setTotalBilingAmount: (amount) => set((state) => ({ ...state, totalBillingAmout: amount })),
    setMyEo: (cards) => set((state) => ({ ...state, myEo: cards }))
}));
