import React, { useEffect, useState } from 'react';
import { useStripe, useElements, PaymentElement, CardElement } from '@stripe/react-stripe-js';
import { Button, Input } from '@nextui-org/react';
import { useStore } from '../../store/store';
import './styles.css';
import { returnUrl } from '../../../decideENV';
import { Navigate, useNavigate } from 'react-router-dom';
import { MailIcon } from '../../assets/MailIcon';
import { registerUser } from '../../api/register';
import { toast } from 'sonner';
import { generateUUID } from '../../helper';

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const { cart, totalBillingAmout } = useStore((store) => ({ cart: store.cart, totalBillingAmout: store.totalBillingAmout }));

    const [isLoading, setisLoading] = useState(false);

    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();
    const [email, setEmail] = useState('');

    const handleSubmit = async (event) => {
        // We don't want to let default form submission happen here,
        // which would refresh the page.
        event.preventDefault();

        if (!stripe || !elements || !email) {
            // Stripe.js hasn't yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.

            toast.error('Please fill all fields or make sure that stripe is loaded');
            return;
        }
        setisLoading(true);

        //Check if email exists

        const { paymentIntent, error } = await stripe.confirmPayment({
            //`Elements` instance that was used to create the Payment Element
            elements,
            confirmParams: {
                // return_url: `${returnUrl()}/thankyou`
                receipt_email: email
            },
            redirect: 'if_required'
        });

        if (error) {
            // This point will only be reached if there is an immediate error when
            // confirming the payment. Show error to your customer (for example, payment
            // details incomplete)
            setisLoading(false);
            // navigate('/wrong');

            setErrorMessage(error.message);
        } else if (paymentIntent?.status === 'succeeded') {
            //create mixed payload with payment intent
            // save payload
            const paymentId = crypto?.randomUUID?.() ?? generateUUID?.();
            const payLoad = {
                ticketDetails: cart?.map((item) => ({ ...item, email, order_id: paymentId }))
            };

            const register = await registerUser(payLoad);

            console.log(register);

            navigate('/thankyou');
        }
    };

    useEffect(() => {
        if (cart.length === 0) {
            navigate('/myeo');
        }
    }, [cart]);

    return (
        <div className="checkout">
            {/* <CheckoutSummary cart={cart} /> */}

            <form>
                <section className="order--summary">
                    <h1>Total </h1>
                    <p>₹{totalBillingAmout}</p>
                </section>
                <section className="flex justify-end">
                    <p style={{ color: 'red', fontSize: '12px' }}>*includes 18% GST</p>
                </section>
                <div className="mb-2 flex flex-col items-start email--section">
                    <label htmlFor="email--checkout" className="label--email">
                        Email
                    </label>
                    <input type="email" placeholder="Email" className="input--email" onChange={(e) => setEmail(e.target.value)} />
                </div>
                <PaymentElement />
                <Button type="submit" disabled={!stripe} color="success" className="mt-2" onClick={handleSubmit} isLoading={isLoading}>
                    Submit
                </Button>

                {errorMessage && <div>{errorMessage}</div>}
                <div className="disclaimer">
                    <strong style={{ fontSize: '10px' }}>
                        <i>*Amount is non-refundable</i>
                    </strong>
                </div>
            </form>
        </div>
    );
};

const CheckoutSummary = ({ cart }) => {
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
                                            {item?.registration_fee?.split?.(',').join?.('')}x{item?.count}
                                        </span>
                                        <p class="text-lg font-bold">{item?.registration_fee?.split?.(',').join?.('') * item?.count}</p>
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
