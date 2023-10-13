import React, { useEffect, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { getClientSecret } from '../../api/checkout.js';
import { getResultFromData } from '../../helper.js';
import CheckoutForm from './index.jsx';
import { useStore } from '../../store/store.js';
import { Spinner } from '@nextui-org/react';
import './styles.css';
import { toast } from 'sonner';
import { useLocation, useNavigate } from 'react-router-dom';

export const StripeForm = () => {
    const [options, setOptions] = useState();
    const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
    const navigate = useNavigate();

    const { cart, setTotalBilingAmount, isSelected } = useStore((store) => ({ cart: store.cart, setTotalBilingAmount: store.setTotalBilingAmount, isSelected: store.isSelected }));
    const locaton = useLocation();
    const billingAmount = cart?.reduce((acc, item) => {
        if (!isSelected) {
            if (typeof item.registration_fee === 'string') {
                return acc + item.count * +item.registration_fee.split(',').join('');
            }

            return acc + item.count * item.registration_fee;
        } else {
            if (typeof item.priceInDollar === 'string') {
                return acc + item.count * +item.priceInDollar.split(',').join('');
            }

            return acc + item.count * item.priceInDollar;
        }
    }, 0);

    useEffect(() => {
        async function fetchClientSecret() {
            if (billingAmount) {
                const billingAmountWithGST = +billingAmount + 0.18 * billingAmount;
                setTotalBilingAmount(billingAmountWithGST);
                let secret = await getClientSecret(billingAmountWithGST * 100);
                const options = {
                    clientSecret: getResultFromData(secret),

                    // appearance: {/*...*/},
                    appearance: {
                        theme: 'stripe'
                    }
                };

                setOptions(options);
            } else {
                toast.error('Please provide a valid billing');

                navigate('/myeo');
            }
        }
        fetchClientSecret();
    }, []);
    return (
        <>
            {stripePromise && options ? (
                <Elements stripe={stripePromise} options={options}>
                    <CheckoutForm />
                </Elements>
            ) : (
                <section className="checkout">
                    <Spinner size="lg" />
                </section>
            )}
        </>
    );
};

export default StripeForm;
