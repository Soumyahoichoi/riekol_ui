import React from 'react';
import { useStore } from '../../store/store';

const Cart = () => {
    const cart = useStore((state) => state.cart);

    return <div>{JSON.stringify(cart || {})}</div>;
};

export default Cart;
