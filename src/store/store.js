import dayjs from 'dayjs';
import { create } from 'zustand';

export const useStore = create((set, get) => ({
    cart: [],
    isSelected: false,
    totalBillingAmout: 0,
    myEo: [],
    schedule: {},
    setCart: (cartData) => set(() => ({ cart: cartData })),
    setIsSelected: (value) => set((state) => ({ ...state, isSelected: value })),
    setTotalBilingAmount: (amount) => set((state) => ({ ...state, totalBillingAmout: amount })),
    setMyEo: (cards) => set((state) => ({ ...state, myEo: cards })),
    setSchedule: (name, spec) => set((state) => ({ ...state, schedule: { ...state.schedule, [name]: spec } })),
    isOverlapping(item) {
        const schedule = get().schedule;
        const cart = get().cart;
        let isOverLappingWith = [];
        cart.forEach((element) => {
            const start_cart_compared = dayjs(element.event_date.split(' - ')[0] + '-2024 ' + element.start_time);
            const end_cart_compared = dayjs(element.event_date.split(' - ')[1] + '-2024 ' + element.end_time);

            if (element.name !== item.name) {
                if (!(end_cart_compared.isBefore(schedule[item.name].start) || start_cart_compared.isAfter(schedule[item.name].end))) {
                    isOverLappingWith.push(element.name);
                }
            }
        });

        return isOverLappingWith;
    }
}));
