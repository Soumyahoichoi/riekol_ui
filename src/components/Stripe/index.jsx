import React, { useState, useEffect } from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { Button } from '@nextui-org/react';
import { useStore } from '../../store/store';
import './styles.css';
import { returnUrl } from '../../../decideENV';

const CheckoutForm = () => {
    // const stripe = useStripe();
    // const elements = useElements();
    const { cart } = useStore((store) => ({ cart: store.cart }));

    const [isLoading, setisLoading] = useState(false);

    const [errorMessage, setErrorMessage] = useState(null);

    // const handleSubmit = async (event) => {
    //     // We don't want to let default form submission happen here,
    //     // which would refresh the page.
    //     event.preventDefault();

    //     if (!stripe || !elements) {
    //         // Stripe.js hasn't yet loaded.
    //         // Make sure to disable form submission until Stripe.js has loaded.
    //         return;
    //     }
    //     setisLoading(true);
    //     const { error } = await stripe.confirmPayment({
    //         //`Elements` instance that was used to create the Payment Element
    //         elements,
    //         confirmParams: {
    //             return_url: `${returnUrl()}/thankyou`
    //         }
    //     });

    //     if (error) {
    //         // This point will only be reached if there is an immediate error when
    //         // confirming the payment. Show error to your customer (for example, payment
    //         // details incomplete)
    //         setisLoading(false);
    //         setErrorMessage(error.message);
    //     } else {
    //         setisLoading(false);

    //         // Your customer will be redirected to your `return_url`. For some payment
    //         // methods like iDEAL, your customer will be redirected to an intermediate
    //         // site first to authorize the payment, then redirected to the `return_url`.
    //     }
    // };

    const billingAmount = cart?.reduce((acc, item) => {
        if (typeof item.registration_fee === 'string') {
            return acc + item.count * +item.registration_fee.split(',').join('');
        }

        return acc + item.count * item.registration_fee;
    }, 0);
    console.log(billingAmount, 'data');
    console.log(cart, 'data');
    return (
        <div className="checkout">
            <CheckoutSummary cart={cart} total={billingAmount} />

            {/* <form>
                <PaymentElement />
                <Button type="submit" disabled={!stripe} color="success" className="mt-2" onClick={handleSubmit} isLoading={isLoading}>
                    Submit
                </Button>
               
                {errorMessage && <div>{errorMessage}</div>}
            </form> */}
        </div>
    );
};

const CheckoutSummary = ({ cart, total }) => {
    return (
        <>
            <div class="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
                <div class="px-4 pt-8">
                    <p class="text-xl font-medium">Order Summary</p>

                    <div class="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6 stripe_width">
                        {cart?.map((item) => (
                            <div class="flex flex-col rounded-lg bg-white sm:flex-row">
                                <div class="flex w-full px-4 py-4 justify-content-between" style={{ justifyContent: 'space-between' }}>
                                    <span class="font-semibold">{item.name}</span>
                                    <section>
                                        <span class="float-right text-gray-400">
                                            {item.registration_fee.split(',').join('')}x{item.count}
                                        </span>
                                        <p class="text-lg font-bold">{item.registration_fee.split(',').join('') * item.count}</p>
                                    </section>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div class="mt-10 rounded-lg border bg-gray-50 px-4 pt-8 lg:mt-0">
                        <div class="">
                            <div class="mt-6 flex items-center justify-between">
                                <p class="text-sm font-medium text-gray-900">Total</p>
                                <p class="text-2xl font-semibold text-gray-900">INR {total}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CheckoutForm;
